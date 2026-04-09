import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingActive, setVotingActive] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  // MetaMask bağlantısı
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setError('MetaMask bulunamadı! Lütfen MetaMask eklentisini yükleyin.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const userSigner = await browserProvider.getSigner();
      const votingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        userSigner
      );

      setAccount(accounts[0]);
      setProvider(browserProvider);
      setSigner(userSigner);
      setContract(votingContract);

      // Admin kontrolü
      const admin = await votingContract.admin();
      setIsAdmin(admin.toLowerCase() === accounts[0].toLowerCase());

      // Oy kullanma durumu
      const voted = await votingContract.checkIfVoted(accounts[0]);
      setHasVoted(voted);

      // Oylama durumu
      const status = await votingContract.getVotingStatus();
      setVotingActive(status);

      // Adayları yükle
      await loadCandidates(votingContract);
    } catch (err) {
      console.error('Cüzdan bağlantı hatası:', err);
      if (err.code === 4001) {
        setError('Cüzdan bağlantısı reddedildi.');
      } else {
        setError('Cüzdan bağlanırken bir hata oluştu.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Adayları yükle
  const loadCandidates = useCallback(async (contractInstance) => {
    const c = contractInstance || contract;
    if (!c) return;

    try {
      const result = await c.getCandidates();
      const parsed = result.map((candidate) => ({
        id: Number(candidate.id),
        name: candidate.name,
        voteCount: Number(candidate.voteCount),
      }));
      setCandidates(parsed);
    } catch (err) {
      console.error('Adaylar yüklenirken hata:', err);
    }
  }, [contract]);

  // Oy ver
  const vote = useCallback(async (candidateId) => {
    if (!contract) throw new Error('Kontrata bağlanılamadı.');
    
    const tx = await contract.vote(candidateId);
    await tx.wait();
    
    setHasVoted(true);
    await loadCandidates();
  }, [contract, loadCandidates]);

  // Aday ekle
  const addCandidate = useCallback(async (name) => {
    if (!contract) throw new Error('Kontrata bağlanılamadı.');
    
    const tx = await contract.addCandidate(name);
    await tx.wait();
    
    await loadCandidates();
  }, [contract, loadCandidates]);

  // Oylama durumunu değiştir
  const toggleVoting = useCallback(async (status) => {
    if (!contract) throw new Error('Kontrata bağlanılamadı.');
    
    const tx = await contract.setVotingStatus(status);
    await tx.wait();
    
    setVotingActive(status);
  }, [contract]);

  // Hesap değişikliklerini dinle
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setContract(null);
        setSigner(null);
        setIsAdmin(false);
        setHasVoted(false);
      } else {
        // Yeniden bağlan
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [connectWallet]);

  const value = {
    account,
    provider,
    signer,
    contract,
    isAdmin,
    isConnecting,
    hasVoted,
    votingActive,
    candidates,
    error,
    setError,
    connectWallet,
    loadCandidates,
    vote,
    addCandidate,
    toggleVoting,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

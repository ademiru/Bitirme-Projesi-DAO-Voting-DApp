// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Voting - Blokzincir Tabanlı Şeffaf Oylama Akıllı Kontratı
/// @author DAO Oylama Bitirme Projesi
/// @notice Bu kontrat, şeffaf ve güvenilir bir elektronik oylama sistemi sağlar.
/// @dev Mükerrer oy engelleme, admin yetkilendirme ve oylama durumu yönetimi içerir.
contract Voting {
    // ========================
    // Yapılar (Structs)
    // ========================

    /// @notice Bir adayı temsil eden yapı
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // ========================
    // Durum Değişkenleri
    // ========================

    /// @notice Kontratı deploy eden adres (admin)
    address public admin;

    /// @notice Oylamanın aktif olup olmadığını belirler
    bool public votingActive;

    /// @notice Toplam aday sayısı (aday ID'leri için sayaç)
    uint256 public candidateCount;

    /// @notice Aday ID'sine göre aday bilgileri
    mapping(uint256 => Candidate) public candidates;

    /// @notice Bir adresin oy kullanıp kullanmadığını takip eder
    mapping(address => bool) public hasVoted;

    // ========================
    // Olaylar (Events)
    // ========================

    /// @notice Yeni bir aday eklendiğinde tetiklenir
    event CandidateAdded(uint256 indexed candidateId, string name);

    /// @notice Bir oy kullanıldığında tetiklenir
    event Voted(address indexed voter, uint256 indexed candidateId);

    /// @notice Oylama durumu değiştiğinde tetiklenir
    event VotingStatusChanged(bool newStatus);

    // ========================
    // Modifier'lar
    // ========================

    /// @notice Sadece admin'in çağırabileceği fonksiyonlar için
    modifier onlyAdmin() {
        require(msg.sender == admin, unicode"Sadece admin bu işlemi yapabilir.");
        _;
    }

    // ========================
    // Constructor
    // ========================

    /// @notice Kontratı deploy eden adresi admin olarak atar ve oylamayı aktif eder
    constructor() {
        admin = msg.sender;
        votingActive = true;
    }

    // ========================
    // Fonksiyonlar
    // ========================

    /// @notice Yeni bir aday ekler (sadece admin)
    /// @param _name Adayın ismi
    function addCandidate(string memory _name) public onlyAdmin {
        require(bytes(_name).length > 0, unicode"Aday ismi boş olamaz.");
        
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            name: _name,
            voteCount: 0
        });

        emit CandidateAdded(candidateCount, _name);
    }

    /// @notice Belirtilen adaya oy verir
    /// @param _candidateId Oy verilecek adayın ID'si
    function vote(uint256 _candidateId) public {
        require(votingActive, unicode"Oylama şu anda aktif değil.");
        require(!hasVoted[msg.sender], unicode"Bu adresten daha önce oy kullanılmış.");
        require(_candidateId > 0 && _candidateId <= candidateCount, unicode"Geçersiz aday ID'si.");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    /// @notice Tüm adayların listesini döndürür
    /// @return Candidate[] Aday dizisi
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        for (uint256 i = 1; i <= candidateCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    /// @notice Oylamanın aktif olup olmadığını döndürür
    /// @return bool Oylama durumu
    function getVotingStatus() public view returns (bool) {
        return votingActive;
    }

    /// @notice Oylamayı başlatır veya durdurur (sadece admin)
    /// @param _status Yeni oylama durumu
    function setVotingStatus(bool _status) public onlyAdmin {
        votingActive = _status;
        emit VotingStatusChanged(_status);
    }

    /// @notice Belirli bir adresin oy kullanıp kullanmadığını kontrol eder
    /// @param _voter Kontrol edilecek adres
    /// @return bool Oy kullanma durumu
    function checkIfVoted(address _voter) public view returns (bool) {
        return hasVoted[_voter];
    }
}

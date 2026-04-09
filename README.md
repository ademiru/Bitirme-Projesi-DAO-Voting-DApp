# Blokzincir Tabanlı Şeffaf Elektronik Oylama Sistemi (E-Voting DApp)

## 📋 Proje Hakkında

Bu proje, **Ethereum blokzinciri** üzerinde çalışan merkeziyetsiz bir elektronik oylama uygulamasıdır. Geleneksel oylama sistemlerindeki güvenlik, şeffaflık ve güvenilirlik sorunlarına çözüm olarak tasarlanmıştır.

### 🎯 Projenin Amacı

- Oy verme sürecinin **değiştirilemez (immutable)** ve **şeffaf** olmasını sağlamak.
- Akıllı kontrat (Smart Contract) aracılığıyla **mükerrer oyu engellemek**.
- Tüm oyların blokzincir üzerinde **herkes tarafından doğrulanabilir** olmasını sağlamak.
- Merkezi bir otoriteye ihtiyaç duymadan güvenli oylama gerçekleştirmek.

---

## 🛠️ Kullanılan Teknolojiler

| Katman              | Teknoloji                                       |
| ------------------- | ----------------------------------------------- |
| Akıllı Kontrat      | Solidity (^0.8.0)                               |
| Geliştirme Ortamı   | Hardhat (Derleme, Test, Deploy)                 |
| Yerel Blokzincir    | Hardhat Local Node (JSON-RPC: localhost:8545)   |
| Frontend            | React.js (Vite ile oluşturulmuş)                |
| Stil Kütüphanesi    | Tailwind CSS v4                                 |
| Web3 Entegrasyonu   | Ethers.js v6                                    |
| Cüzdan              | MetaMask                                        |

---

## 📁 Proje Yapısı

```
DAO Oylama/
├── web3/                           # Akıllı Kontrat Katmanı
│   ├── contracts/
│   │   └── Voting.sol              # Oylama akıllı kontratı
│   ├── scripts/
│   │   └── deploy.js               # Deploy script'i
│   ├── test/
│   │   └── Voting.test.js          # 17 adet birim testi
│   ├── hardhat.config.js           # Hardhat yapılandırması
│   └── package.json
├── client/                         # Frontend Katmanı
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigasyon çubuğu
│   │   │   ├── AdminPanel.jsx      # Admin yönetim paneli
│   │   │   ├── CandidateCard.jsx   # Aday kartı bileşeni
│   │   │   ├── VotingArea.jsx      # Oylama alanı
│   │   │   └── Toast.jsx           # Bildirim bileşeni
│   │   ├── context/
│   │   │   └── Web3Context.jsx     # Web3 durum yönetimi
│   │   ├── utils/
│   │   │   └── contract.js         # ABI & kontrat adresi
│   │   ├── App.jsx                 # Ana uygulama
│   │   ├── main.jsx                # Giriş noktası
│   │   └── index.css               # Tailwind & global stiller
│   ├── index.html
│   └── package.json
└── README.md                       # Bu dosya
```

---

## 🧩 Akıllı Kontrat Özellikleri (Voting.sol)

| Fonksiyon           | Erişim | Açıklama                                      |
| ------------------- | ------ | --------------------------------------------- |
| `addCandidate()`    | Admin  | Sisteme yeni aday ekler                       |
| `vote()`            | Herkes | Seçmen, seçtiği adaya oy verir (tek seferlik)  |
| `getCandidates()`   | Herkes | Tüm adayların bilgilerini döndürür            |
| `getVotingStatus()` | Herkes | Oylamanın aktif olup olmadığını döndürür       |
| `setVotingStatus()` | Admin  | Oylamayı başlatır veya durdurur               |
| `checkIfVoted()`    | Herkes | Bir adresin daha önce oy verip vermediğini kontrol eder |

### Güvenlik Mekanizmaları

- **onlyAdmin Modifier:** Sadece kontrat sahibi aday ekleyebilir ve oylama durumunu değiştirebilir.
- **Mükerrer Oy Engelleme:** `mapping(address => bool)` ile her adres sadece bir kez oy kullanabilir.
- **Input Doğrulama:** Geçersiz aday ID'si ve boş isim girilmesi engellenir.
- **Event Logging:** Tüm işlemler blockchain'e olay (event) olarak kaydedilir.

---

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler

1. **Node.js** (v18 veya üzeri) — [nodejs.org](https://nodejs.org)
2. **MetaMask** tarayıcı eklentisi — [metamask.io](https://metamask.io)

### Adım 1: Bağımlılıkları Yükleyin

```bash
# Web3 (Hardhat) bağımlılıkları
cd web3
npm install

# Frontend (React) bağımlılıkları
cd ../client
npm install
```

### Adım 2: Yerel Blokzincir Ağını Başlatın

**Yeni bir terminal açın** ve aşağıdaki komutu çalıştırın (bu terminal açık kalmalı):

```bash
cd web3
npx hardhat node
```

Bu komut, **10.000 ETH** yüklü 20 test hesabı ile yerel bir Ethereum ağı başlatacaktır.

### Adım 3: MetaMask'ı Yapılandırın

1. MetaMask'ı açın → **Ağlar** → **Ağ Ekle** → **Manuel olarak ekle**
2. Şu bilgileri girin:
   - **Ağ Adı:** Hardhat Localhost
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Zincir ID:** `31337`
   - **Para Birimi:** ETH
3. Hardhat node çıktısındaki **Account #0** özel anahtarını MetaMask'a import edin. (Bu hesap Admin/Owner olacaktır.)

### Adım 4: Akıllı Kontratı Deploy Edin

**Yeni bir terminal açın:**

```bash
cd web3
npx hardhat run scripts/deploy.js --network localhost
```

Bu komut:
- Kontratı yerel ağa deploy eder.
- Kontrat adresini ve ABI'yi otomatik olarak `client/src/utils/contract.js` dosyasına yazar.

### Adım 5: Frontend'i Başlatın

```bash
cd client
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

### Adım 6: Kullanmaya Başlayın

1. **"MetaMask'a Bağlan"** butonuna tıklayın.
2. Admin olarak bağlandıysanız, **Admin Paneli** görünecektir.
3. Admin panelinden aday ekleyin.
4. Farklı bir MetaMask hesabıyla **"Oy Ver"** butonuna tıklayarak oy kullanın.

---

## 🧪 Testler

Akıllı kontrat 17 birim testi ile test edilmiştir:

```bash
cd web3
npx hardhat test
```

Test kategorileri:
- ✅ Deployment doğruluğu
- ✅ Aday ekleme (admin yetkilendirme, boş isim kontrolü)
- ✅ Oy verme (mükerrer oy engelleme, geçersiz ID kontrolü)
- ✅ Oylama durumu yönetimi
- ✅ Yardımcı fonksiyonlar

---

## 📐 Mimari Diyagram

```
┌─────────────────────┐     Ethers.js (v6)     ┌──────────────────────┐
│   React Frontend    │ ◄──────────────────────►│   Ethereum Network   │
│   (Vite + Tailwind) │      JSON-RPC            │  (Hardhat Local Node)│
│                     │                          │                      │
│  ┌──────────────┐   │     MetaMask             │  ┌────────────────┐ │
│  │  Web3Context │◄──┼─────(Wallet)─────────────┼─►│  Voting.sol    │ │
│  └──────────────┘   │                          │  │  Smart Contract│ │
│  ┌──────────────┐   │                          │  └────────────────┘ │
│  │  Components  │   │                          │                      │
│  │  - Navbar    │   │                          │  Events:             │
│  │  - Admin     │   │                          │  - CandidateAdded    │
│  │  - Voting    │   │                          │  - Voted             │
│  │  - Toast     │   │                          │  - VotingStatusChanged│
│  └──────────────┘   │                          │                      │
└─────────────────────┘                          └──────────────────────┘
```

---

## 📝 Lisans

Bu proje akademik amaçlı geliştirilmiştir. MIT Lisansı ile lisanslanmıştır.

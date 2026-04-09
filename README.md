# DAO Voting DApp

**Blockchain tabanlı şeffaf oylama uygulaması.** Bu proje, Ethereum akıllı kontratları ve React tabanlı frontend ile merkeziyetsiz ve güvenli oy kullanma deneyimi sunar.

---

## 🚀 Projenin Özeti

- `web3/` dizini: Hardhat ile akıllı kontrat geliştirme, test ve deploy
- `client/` dizini: Vite + React + Tailwind tabanlı kullanıcı arayüzü
- `vercel.json`: Vercel deploy ayarları

---

## 📁 Dosya Yapısı

- `/client`
  - `src/components`: Arayüz bileşenleri
  - `src/context`: Web3 durum yönetimi
  - `src/utils`: Kontrat adresi ve ABI
- `/web3`
  - `contracts/Voting.sol`: Oylama sözleşmesi
  - `scripts/deploy.js`: Kontrat deploy scripti
  - `test/Voting.test.js`: Akıllı kontrat testleri
- `vercel.json`: Vercel için tek kök yapılandırma

---

## 🧰 Kurulum

```powershell
git clone https://github.com/ademiru/Bitirme-Projesi-DAO-Voting-DApp.git
cd "DAO Oylama"
```

### 1. `web3` bağımlılıklarını yükle

```powershell
cd web3
npm install
```

### 2. `client` bağımlılıklarını yükle

```powershell
cd ../client
npm install
```

### 3. Hardhat yerel ağını başlat

```powershell
cd ../web3
npx hardhat node
```

### 4. Kontratı deploy et

```powershell
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Frontend’i başlat

```powershell
cd ../client
npm run dev
```

---

## 📌 GitHub Görünümü İçin Öneriler

- Root dizinde `README.md` bulunduğu için GitHub proje sayfasında otomatik olarak gösterilir.
- Sağdaki `About` bölümüne şu kısa açıklamayı ekleyin:
  - `Blockchain teknolojisi altyapısı ile oy vermeyi birleştiren şeffaf ve güvenli bir proje.`
- `Topics` alanına şu etiketleri ekleyin:
  - `DAO`, `Voting`, `Solidity`, `React`, `Vite`, `Hardhat`
- Dosyalar sol/üstte listelenir; README içeriği dosya listesinin altında görünür.

---

## 💡 Dikkat Edilmesi Gerekenler

- GitHub’da uygulama dosyaları otomatik olarak gösterilir; ekstra bir ayar gerekmez.
- Repository kökünde `client/` ve `web3/` klasörleri olması, projenin hem frontend hem backend tarafını net gösterir.
- `client/src/utils/contract.js` dosyasındaki adresi, canlı deploy sonrası güncelleyin.

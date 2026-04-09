# Client Uygulaması

Bu klasör, DApp’in React tabanlı frontend uygulamasını içerir.

## İçerik

- `src/App.jsx`: Ana uygulama bileşeni
- `src/main.jsx`: Uygulama giriş noktası
- `src/components`: Arayüz kartları, oylama alanı, yönetici paneli ve yardımcı bileşenler
- `src/context/Web3Context.jsx`: Web3 bağlantısı ve durum yönetimi
- `src/utils/contract.js`: Akıllı kontrat adresi ve ABI
- `vite.config.js`: Vite yapılandırması

## Çalıştırma

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notlar

- `src/utils/contract.js` dosyasında yerel `Voting` kontrat adresi kullanımda.
- Canlı bir ağ için bu adresi güncelleyin.

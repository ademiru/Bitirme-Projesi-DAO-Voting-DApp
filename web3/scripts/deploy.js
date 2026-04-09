const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🗳️  Voting kontratı deploy ediliyor...\n");

  // Kontratı deploy et
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();
  console.log(`✅ Voting kontratı deploy edildi!`);
  console.log(`📍 Kontrat Adresi: ${contractAddress}`);

  // Admin adresini göster
  const [admin] = await hre.ethers.getSigners();
  console.log(`👤 Admin Adresi: ${admin.address}\n`);

  // ABI dosyasını client klasörüne kopyala
  const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "Voting.sol", "Voting.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Client utils klasörüne kontrat bilgilerini yaz
  const clientUtilsDir = path.join(__dirname, "..", "..", "client", "src", "utils");
  
  // Klasörü oluştur (yoksa)
  if (!fs.existsSync(clientUtilsDir)) {
    fs.mkdirSync(clientUtilsDir, { recursive: true });
  }

  // contract.js dosyasını oluştur
  const contractConfig = `// Bu dosya deploy script'i tarafından otomatik oluşturulmuştur.
// Deploy tarihi: ${new Date().toLocaleString("tr-TR")}

export const CONTRACT_ADDRESS = "${contractAddress}";

export const CONTRACT_ABI = ${JSON.stringify(artifact.abi, null, 2)};
`;

  const contractFilePath = path.join(clientUtilsDir, "contract.js");
  fs.writeFileSync(contractFilePath, contractConfig);
  
  console.log(`📄 ABI ve kontrat adresi client/src/utils/contract.js dosyasına yazıldı.`);
  console.log(`\n🎉 Deploy işlemi tamamlandı! Frontend'i başlatabilirsiniz.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deploy hatası:", error);
    process.exit(1);
  });

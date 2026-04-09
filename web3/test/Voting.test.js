const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Kontratı", function () {
  let voting;
  let admin;
  let voter1;
  let voter2;

  beforeEach(async function () {
    [admin, voter1, voter2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Admin doğru atanmalı", async function () {
      expect(await voting.admin()).to.equal(admin.address);
    });

    it("Oylama başlangıçta aktif olmalı", async function () {
      expect(await voting.getVotingStatus()).to.equal(true);
    });

    it("Başlangıçta aday sayısı 0 olmalı", async function () {
      expect(await voting.candidateCount()).to.equal(0);
    });
  });

  describe("Aday Ekleme", function () {
    it("Admin aday ekleyebilmeli", async function () {
      await voting.addCandidate("Aday 1");
      const candidates = await voting.getCandidates();
      expect(candidates.length).to.equal(1);
      expect(candidates[0].name).to.equal("Aday 1");
    });

    it("Admin olmayan aday ekleyememeli", async function () {
      await expect(
        voting.connect(voter1).addCandidate("Aday 1")
      ).to.be.revertedWith("Sadece admin bu işlemi yapabilir.");
    });

    it("Boş isimle aday eklenememeli", async function () {
      await expect(voting.addCandidate("")).to.be.revertedWith(
        "Aday ismi boş olamaz."
      );
    });

    it("Birden fazla aday eklenebilmeli", async function () {
      await voting.addCandidate("Aday 1");
      await voting.addCandidate("Aday 2");
      await voting.addCandidate("Aday 3");
      const candidates = await voting.getCandidates();
      expect(candidates.length).to.equal(3);
    });

    it("CandidateAdded olayı tetiklenmeli", async function () {
      await expect(voting.addCandidate("Aday 1"))
        .to.emit(voting, "CandidateAdded")
        .withArgs(1, "Aday 1");
    });
  });

  describe("Oy Verme", function () {
    beforeEach(async function () {
      await voting.addCandidate("Aday 1");
      await voting.addCandidate("Aday 2");
    });

    it("Seçmen oy verebilmeli", async function () {
      await voting.connect(voter1).vote(1);
      const candidates = await voting.getCandidates();
      expect(candidates[0].voteCount).to.equal(1);
    });

    it("Aynı seçmen ikinci kez oy verememeli", async function () {
      await voting.connect(voter1).vote(1);
      await expect(voting.connect(voter1).vote(2)).to.be.revertedWith(
        "Bu adresten daha önce oy kullanılmış."
      );
    });

    it("Geçersiz aday ID'si ile oy verilememeli", async function () {
      await expect(voting.connect(voter1).vote(0)).to.be.revertedWith(
        "Geçersiz aday ID'si."
      );
      await expect(voting.connect(voter1).vote(99)).to.be.revertedWith(
        "Geçersiz aday ID'si."
      );
    });

    it("Voted olayı tetiklenmeli", async function () {
      await expect(voting.connect(voter1).vote(1))
        .to.emit(voting, "Voted")
        .withArgs(voter1.address, 1);
    });

    it("Birden fazla seçmen oy verebilmeli", async function () {
      await voting.connect(voter1).vote(1);
      await voting.connect(voter2).vote(1);
      const candidates = await voting.getCandidates();
      expect(candidates[0].voteCount).to.equal(2);
    });
  });

  describe("Oylama Durumu", function () {
    beforeEach(async function () {
      await voting.addCandidate("Aday 1");
    });

    it("Admin oylama durumunu değiştirebilmeli", async function () {
      await voting.setVotingStatus(false);
      expect(await voting.getVotingStatus()).to.equal(false);
    });

    it("Oylama pasifken oy verilememeli", async function () {
      await voting.setVotingStatus(false);
      await expect(voting.connect(voter1).vote(1)).to.be.revertedWith(
        "Oylama şu anda aktif değil."
      );
    });

    it("Admin olmayan durum değiştiremeli", async function () {
      await expect(
        voting.connect(voter1).setVotingStatus(false)
      ).to.be.revertedWith("Sadece admin bu işlemi yapabilir.");
    });
  });

  describe("Yardımcı Fonksiyonlar", function () {
    it("checkIfVoted doğru sonuç döndürmeli", async function () {
      await voting.addCandidate("Aday 1");
      expect(await voting.checkIfVoted(voter1.address)).to.equal(false);
      await voting.connect(voter1).vote(1);
      expect(await voting.checkIfVoted(voter1.address)).to.equal(true);
    });
  });
});

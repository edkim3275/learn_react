import { ethers } from "ethers";
import Web3 from "web3";

interface EncryptedKeystoreV3JSON {
  version: number;
  id: string;
  address: string;
  crypto: {
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    cipher: string;
    kdf: string;
    kdfparams: {
      dklen: number;
      salt: string;
      n: number;
      r: number;
      p: number;
    };
    mac: string;
  };
}

const ethWeb3 = new Web3(
  `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}}`
);

export const generateKeys = (seedPhrase?: string) => {
  let wallet: ethers.HDNodeWallet;

  if (seedPhrase) {
    wallet = ethers.Wallet.fromPhrase(seedPhrase);
  } else {
    wallet = ethers.Wallet.createRandom();
    seedPhrase = wallet.mnemonic?.phrase;
  }

  const privateKey = wallet.privateKey;
  const address = wallet.address;

  // seedPhrase: 니모닉 문구, privateKey: 개인키, address: 지갑주소
  return { seedPhrase, privateKey, address };
};

export const generateSecretRecoveryPhrase = () => {
  const wallet = ethers.Wallet.createRandom();
  const seedPhrase = wallet.mnemonic?.phrase;
  return { wallet, seedPhrase };
};

export const getKeystoreName = (wallet: ethers.HDNodeWallet): string => {
  return `UTC--${new Date().toISOString().replace(/[:]/g, "-")}--${
    wallet.address
  }`;
};

export const generateKeystore = async (
  password: string,
  seedPhrase: string
) => {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  const keystoreName = getKeystoreName(wallet);
  const encryptJSON = await ethWeb3.eth.accounts.encrypt(
    wallet.privateKey,
    password
  );
  const keystore = JSON.stringify(encryptJSON);
  return { keystoreName, keystore };
};

export const exportKeystore = (keystore: string, keystoreName: string) => {
  const element = document.createElement("a");
  const file = new File([keystore], keystoreName, {
    type: "application/json",
    lastModified: Date.now(),
  });
  element.href = URL.createObjectURL(file);
  element.download = keystoreName ? keystoreName : "keystore.json";
  element.click();
  URL.revokeObjectURL(element.href);
};

export const readKeystore = async (file: File) => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    // 파일 읽기 작업 완료
    fileReader.onload = async () => {
      const encryptJSON = await JSON.parse(fileReader.result as string);
      resolve(encryptJSON);
    };
    // 파일 읽기 작업 실패
    fileReader.onerror = (error) => {
      reject(error);
    };
    // 파일 읽기 작업 시작
    fileReader.readAsText(file);
  });
};

export const decryptKeystore = async (
  file: EncryptedKeystoreV3JSON,
  password: string
) => {
  try {
    const fileJSON = JSON.stringify(file);
    const wallet = await ethWeb3.eth.accounts.decrypt(fileJSON, password);
    return wallet;
  } catch {
    return null;
  }
};

export const recoverWallet = (seedPhrase: string) => {
  try {
    const wallet = ethers.Wallet.fromPhrase(seedPhrase);
    return wallet;
  } catch (error) {
    return null;
  }
};

// 마스터키 기반 새로운 지갑 생성
export const createWallet = (network: string, seedPhrase: string) => {
  let wallet;
  switch (network) {
    case "ethereum":
      wallet = ethers.Wallet.fromPhrase(seedPhrase);
      console.log("ether wallet", wallet);
      return wallet;
    case "polygon":
      const endpointUrl = `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_QUICK_NODE_KEY}/`;
      const polygonProvider = new ethers.InfuraProvider("polygon", endpointUrl);
      wallet = new ethers.Wallet(seedPhrase, polygonProvider);
      return wallet;
  }
};

export const createChildWallet = (
  network: string,
  recoverPhrase: string,
  idx: number
) => {
  switch (network) {
    case "ethereum":
      const wallet = ethers.HDNodeWallet.fromPhrase(recoverPhrase);
      const childWallet = ethers.HDNodeWallet.fromMnemonic(
        wallet.mnemonic!,
        `m/44'/60'/0'/0/${idx + 1}`
      );
      return childWallet;
  }
};

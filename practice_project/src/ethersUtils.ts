import { ethers } from "ethers";
import Web3 from "web3";
import * as SolanaWeb3 from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import BIP32Factory, { BIP32Interface } from "bip32";
import ecc from "@bitcoinerlab/secp256k1";
import axios from "axios";
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
      const ethereumWallet = {
        network: "ethereum",
        name: "",
        address: wallet.address,
        balance: 0,
      };
      getEthereumBalance(ethereumWallet.address);
      return ethereumWallet;
    case "polygon":
      const endpointUrl = `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_QUICK_NODE_KEY}/`;
      const polygonProvider = new ethers.InfuraProvider("polygon", endpointUrl);
      wallet = new ethers.Wallet(seedPhrase, polygonProvider);
      return wallet;
    case "solana":
      const mnemonic = seedPhrase;
      // 니모닉을 시드로 변환
      const seed = bip39.mnemonicToSeedSync(mnemonic, "");

      // seed를 사용하여 키쌍 생성
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      // 공개키를 Base58 형식의 문자열로 인코딩
      const walletAddress = keypair.publicKey.toBase58();
      // console.log("keypair", keypair.publicKey, keypair.publicKey.toBase58());
      // const pubKey = new SolanaWeb3.PublicKey(keypair.publicKey);
      // console.log("pubKey", pubKey);
      const solanaWallet = {
        network: "solana",
        name: "",
        pubKey: keypair.publicKey,
        address: walletAddress,
        balance: 0,
      };

      return solanaWallet;
    case "bitcoin":
      // mnemonic generation for deterministic keys
      // const bitcoinSeed = bip39.mnemonicToSeedSync(seedPhrase);
      let words = bip39.generateMnemonic();
      const sed = bip39.mnemonicToSeedSync(words);
      let bip32 = BIP32Factory(ecc);
      // let root = bip32.fromSeed(bitcoinSeed);
      let root = bip32.fromSeed(sed, bitcoin.networks.testnet);
      let account = root.derivePath("m/44'/0'/0'/0/0");

      let node = account.derive(0).derive(0);

      let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: bitcoin.networks.testnet,
      }).address;

      const bitcoinWallet = {
        network: "bitcoin",
        name: "",
        address: btcAddress,
        balance: 0,
      };

      getBitcoinBalance("moigp5SXJZoTDd7PTZ7kquNYkPQHY4vEVH");
      getBitcoinBalance(btcAddress!);
      // console.log(`

      // Wallet generated:

      // - Address : ${btcAddress},
      // - Key : ${node.toWIF()},
      // - Mnemonic : ${seedPhrase}

      // // `);

      return bitcoinWallet;
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

export const getEthereumBalance = async (address?: string) => {
  const provider = ethers.getDefaultProvider("sepolia");
  const balance = await provider.getBalance(
    "0x087b7A9645cc78873b11A40aDe7Bb5EDF3dAFb8d"
  );

  const 잔액 = ethers.formatEther(balance);
  console.log("이더리움 잔액", balance, "wei", 잔액, "ETH");
  return balance;
};

export const getBitcoinBalance = (address: string) => {
  // Base58Check 형식의 문자열(주소)을 해석(디코딩)
  // Base58Check : 주소와 체크섬을 사용하여 오류 검출을 수행하는 인코딩 방식
  const decodedAddress = bitcoin.address.fromBase58Check(address);
  console.log(
    "P2PKH 유효성 확인해보자",
    decodedAddress,
    decodedAddress.version,
    bitcoin.networks.testnet
  );
  // 주소가 네트워크(테스트넷)의 주소인지 확인
  // P2PKH 유효성 확인
  if (decodedAddress.version === bitcoin.networks.testnet.pubKeyHash) {
    console.log("유효함");
  }

  axios
    .get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`)
    .then((response) => {
      console.log("response", response);
      // const utxos = response.data;
      // const balance = utxos.reduce(
      //   (total: any, utxo: any) => total + utxo.value,
      //   0
      // );
      // console.log("잔액:", balance);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSolanaBalance = async (pubKey: SolanaWeb3.PublicKey) => {
  console.log("솔라나 잔액조회", pubKey);
  const solanaWeb3 = new SolanaWeb3.Connection('https://api.testnet.solana.com');
  const lamports = await solanaWeb3.getBalance(pubKey);
  console.log(lamports);
  console.log(`${lamports / SolanaWeb3.LAMPORTS_PER_SOL} SOL`);
  // return lamports;
};
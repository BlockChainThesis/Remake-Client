import { ethers } from 'ethers';

const { ethereum } = window;

export const getUserAddress = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const account = await signer.getAddress();

  return account;
};

export const isMyAddress = async (address) => {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    return account === address;
  } else return alert('Ethereum missing');
};

export const isValidAddress = (address) => {
  return ethers.utils.isAddress(address);
};

export const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

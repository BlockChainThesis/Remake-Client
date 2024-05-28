import { ethers } from 'ethers';

const { ethereum } = window;

export const getUserAddress = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const account = await signer.getAddress();

  return account;
};

export const isMyAddress = async (address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const account = await signer.getAddress();

  return account === address;
};

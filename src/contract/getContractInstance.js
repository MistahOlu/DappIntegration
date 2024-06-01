

import { ethers } from "ethers";
import contractABI from "../constant/abi.json";

const getContractInstance = () => {
    const contractAddress = "0xb2d49E0CbaeFe817ec080001996628667b040FAd";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
    );
    return contract;
}

export default getContractInstance;
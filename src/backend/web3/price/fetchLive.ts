import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

export const fetchPrice = async (key?:string) => {
    if(!Moralis.Core.isStarted){
         await Moralis.start({
    apiKey: !key?process.env.MORALESKEY : key ,
  });
    }
 

  const address = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });
return response.toJSON().usdPrice
};
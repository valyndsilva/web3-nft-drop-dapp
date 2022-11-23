import { useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React from "react";
interface Props {
  loading: boolean;
  claimedSupply: number;
  totalSupply: BigNumber;
  priceInEth: string;
  mintNft: () => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
}
function MintBtn({
  loading,
  claimedSupply,
  totalSupply,
  priceInEth,
  mintNft,
  quantity,
  setQuantity,
}: Props) {
  // Authentication
  const address = useAddress();
  //   console.log(address);

  return (
    <form  className="pt-5">
      {address && (
        <div className="flex items-center justify-center space-x-2">
          <p className="text-sm  font-light text-gray-400">
            Number of NFTs you wish to claim:
          </p>
          <input
            className="border text-center items-center p-1 ml-3 text-sm"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      )}

      <button onClick={mintNft}
        type="submit"
        disabled={
          loading || claimedSupply === totalSupply?.toNumber() || !address
        }
        className="h-16 w-full mt-10 rounded-full bg-rose-500 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base disabled:bg-gray-400"
      >
        {loading ? (
          <>Loading</>
        ) : claimedSupply === totalSupply?.toNumber() ? (
          <>SOLD OUT</>
        ) : !address ? (
          <>Sign in to Mint</>
        ) : (
          <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
        )}
      </button>
    </form>
  );
}

export default MintBtn;

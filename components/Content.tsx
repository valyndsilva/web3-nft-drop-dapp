import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "../sanity";
import { Collection } from "../typings";
import { BigNumber } from "ethers";
import { useAddress, useContract } from "@thirdweb-dev/react";
import MintBtn from "./MintBtn";
import toast from "react-hot-toast";
interface Props {
  collection: Collection;
}

function Content({ collection }: Props) {
  const address = useAddress();
  //   console.log(address);
  const [loading, setLoading] = useState<boolean>(true);
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [priceInEth, setPriceInEth] = useState<string>();
  const [quantity, setQuantity] = useState<string>("");

  const nftDrop = useContract(collection.address, "nft-drop").contract;
  // console.log(nftDrop);

  useEffect(() => {
    if (!nftDrop) return;
    // To make an async call inside useEffect Hook you need to do it in an inner function
    const fetchNFTDropData = async () => {
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();
      setClaimedSupply(claimed.length);
      setTotalSupply(total);
      setLoading(false);
    };
    fetchNFTDropData();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      console.log(claimConditions);
      
      setPriceInEth(claimConditions?.[0]?.currencyMetadata.displayValue);
    };
    fetchPrice();
  }, [nftDrop]);

  const mintNft = () => {
    if (!nftDrop || !address) return;
    // const quantity = 1; // how many unique NFTs you want to claim
    setLoading(true);
    const notification = toast.loading("Minting NFT...", {
      style: {
        background: "white",
        color: "green",
        fontWeight: "bolder",
        fontSize: "17px",
        padding: "20px",
      },
    });
    nftDrop
      ?.claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // the transaction receipt
        const claimedTokenId = tx[0].id; // the id of NFT claimed
        const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
        console.log(receipt);
        console.log(claimedTokenId);
        console.log(claimedNFT);
        toast("NFT Successfully Minted!", {
          duration: 8000,
          style: {
            background: "green",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast("Whoops... Something went wrong!", {
          duration: 8000,
          style: {
            background: "red",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      })
      .finally(() => {
        setLoading(false);
        setQuantity("");
        toast.dismiss(notification);
      });
  };
  return (
    <>
      <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
        <Image
          className="w-80 rounded-xl object-cover pb-10 lg:h-80 lg:w-80"
          src={urlFor(collection.mainImage).url()}
          alt="Profile Picture"
          width={600}
          height={600}
        />
        <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
          {collection.title}
        </h1>
        {loading ? (
          <p className="pt-2 text-xl text-green-500 animate-pulse">
            Loading Supply Count...
          </p>
        ) : (
          <p className="pt-2 text-xl text-green-500">
            {claimedSupply} / {totalSupply?.toString()} NFT's claimed
          </p>
        )}
        {loading && (
          <Image
            src="/assets/loader.gif"
            width={320}
            height={200}
            className="object-contain"
            alt="loader"
          />
        )}
      </div>
      <MintBtn
        loading={loading}
        claimedSupply={claimedSupply}
        totalSupply={totalSupply!}
        priceInEth={priceInEth!}
        mintNft={mintNft}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </>
  );
}

export default Content;

"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Content, Header } from "../../components";
import { useAddress } from "@thirdweb-dev/react";
import { client } from "@/sanity/lib/client";
import { collectionIdQuery } from "@/utils/queries";
import { urlForImage } from "@/sanity/lib/image";

type Props = {
  params: {
    id: string;
  }
};

export default function page({ params }: Props) {
  // Authentication
  const address = useAddress();
  //   console.log(address);
  const [collection, setCollection] = useState<any>();
  // console.log(collection);
  const collectionId = params?.id!;

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(collectionIdQuery(), {
        id: collectionId,
      });
      // console.log(data);
      setCollection(data);
    };
    fetchData();
  }, [collectionId]);

if(!collection) return null
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-10 min-h-screen relative mb-20">
      <Toaster position="bottom-center" />
      {/* Left */}
        <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
          <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
            <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
              <Image
                className="w-44 rounded-xl object-cover lg:h-96 lg:w-96"
                src={urlForImage(collection?.previewImage).url()}
                alt="Profile Picture"
                width={600}
                height={600}
                priority
              />
            </div>
            <div className="text-center p-5 space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {collection?.nftCollectionName}
              </h1>
              <h2 className="text-xl text-gray-300">
                {collection?.description}
              </h2>
            </div>
          </div>
        </div>
      
      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <Header />
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address?.length - 5)}
          </p>
        )}
         <Content collection={collection} />
      </div>
    </div>
  );
}

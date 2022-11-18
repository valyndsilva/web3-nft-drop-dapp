import Image from "next/image";
import React from "react";
import { urlFor } from "../sanity";
import { Collection } from "../typings";
interface Props {
  collection: Collection;
}

function Content({collection}:Props) {
  return (
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
      <p className="pt-2 text-xl text-green-500"> 16 / 21 NFT's claimed</p>
    </div>
  );
}

export default Content;

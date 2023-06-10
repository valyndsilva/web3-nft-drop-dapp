import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Footer, Navbar } from "@/app/(user)/components";
import { client } from "@/sanity/lib/client";
import { collectionQuery } from "@/utils/queries";
import { urlForImage } from "@/sanity/lib/image";

type Props = {};

export default async function page({}: Props) {
  const data = await client.fetch(collectionQuery());
  const collections: Collection[] = data;
  // console.log(collections);

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex-col py-20 px-10 items-center">
      <Navbar />
      <main className="flex  flex-col items-center justify-center border-2 border-gray-200 rounded-md  px-10 py-20 mb-10">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 space-y-12 md:space-y-0">
          {collections.map((collection: Collection) => (
            <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
              <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
                <div className="relative w-[384px] h-[240px]">
                  <Image
                    src={urlForImage(collection.mainImage).url()}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-2xl object-contain w-auto h-auto"
                    priority
                  />
                </div>
                <div className="click-link">
                  <h2 className="text-2xl">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
    </div>
  );
}

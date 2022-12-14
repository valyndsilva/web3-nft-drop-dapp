import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";
interface Props {
  collections: Collection[];
}
const Home = ({ collections }: Props) => {
  console.log({ collections });
  return (
    <div className="max-w-7xl mx-auto flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>The SILVA NFT Market Place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-4xl w-full cursor-pointer font-extralight">
        {" "}
        The{" "}
        <span className="uppercase font-extrabold underline decoration-pink-600/50">
          Silva
        </span>{" "}
        NFT Market Place
      </h1>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection._id} href={`/nft/${collection.slug.current}`}>
              <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
                <Image
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                  height={384}
                  width={240}
                  className="rounded-2xl object-cover"
                />
                <div className="p-5">
                  <h2 className="text-3xl">{collection.title}</h2>
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
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage{asset},
  previewImage{asset},
  slug{current},
  creator->{
  _id,
  name,
  address,
  bio,
  slug{current},
  }
}`;
  const collections = await sanityClient.fetch(query);
  console.log(collections);
  return {
    props: {
      collections,
    },
  };
};

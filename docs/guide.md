# Web3 NFT Drop Dapp:

```
npx create-next-app -e with-tailwindcss web3-nft-drop-dapp
cd web3-nft-drop-dapp
git init
git remote add origin https://github.com/valyndsilva/web3-nft-drop-dapp.git
git branch -M main
git push -u origin main
npm run dev
```

## Build the NFT Drop Page:

### In pages/index.tsx:

```
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home

```

### In pages/nft/[id].tsx:

```
import Image from "next/image";
import React from "react";
import { Content, Header } from "../../components";

function NFTDrop() {
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <Image
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-96"
              src="/assets/1.png"
              alt="Profile Picture"
              width={600}
              height={600}
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">Corgis</h1>
            <h2 className="text-xl text-gray-300">
              A collection of Corgis who live & breathe cuteness!
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <Header/>
        <hr className="my-2 border"/>
        <Content/>
      </div>
    </div>
  );
}

export default NFTDrop;

```

### Create a components folder in the root:

#### Create components/Header.tsx:

```
import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
        {" "}
        The{" "}
        <span className="uppercase font-extrabold underline decoration-pink-600/50">
          Corgis
        </span>{" "}
        NFT Market Place
      </h1>
      <button className="rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base">
        Sign In
      </button>
    </header>
  );
}

export default Header;

```

#### Create components/Content.tsx:

```
import React from "react";
import Image from "next/image";
import MintBtn from "./MintBtn";

function Content() {
  return (
    <>
    <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
      <Image
        className="w-80 rounded-xl object-cover pb-10 lg:h-80 lg:w-80"
        src="/assets/banner.png"
        alt="Profile Picture"
        width={600}
        height={600}
      />
      <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
        The CORGIS Coding Club | NFT Drop
      </h1>
      <p className="pt-2 text-xl text-green-500"> 16 / 21 NFT's claimed</p>
    </div>
    <MinBtn/>
    </MinBtn>
  );
}

export default Content;

```

#### Create components/MintBtn.tsx:

```
import React from "react";

function MintBtn() {
  return (
    <button className="h-16 w-full mt-10 rounded-full bg-rose-500 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base">
      Mint NFT (0.01 ETH)
    </button>
  );
}

export default MintBtn;

```

#### Create components/index.tsx:

```
export { default as Header } from "./Header";
export { default as Content } from "./Content";
export { default as MintBtn } from "./MintBtn";

```

## Go to thirdweb React SDK:

This is the SDK used to connect to thirdweb and all of it's services.
Go to thirdweb [docs](https://portal.thirdweb.com/react):

Install dependencies for thirdweb

```
npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers
```

Add third web provider in pages/\_app.tsx:
Goerli is a test network provider.

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;


```

## Building the Login Functionality with Thirdweb:

### In components/Header.tsx:

When you click on Sign In button in the Header.tsx MetaMask asks you to Login.
Select Networks and Enable "show test networks" Select "Goerli Test Network". Next select your account and click on Next button > Connect button And you should be connected.

Check in Dev Console to check if you can see the address.
You can use the address to determine if a User is logged in or not.

```
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React from "react";

function Header() {
  // Authentication
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  //   console.log(address);

  return (
    <header className="flex items-center justify-between">
      <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
        {" "}
        The{" "}
        <span className="uppercase font-extrabold underline decoration-pink-600/50">
          Corgis
        </span>{" "}
        NFT Market Place
      </h1>
      <button
        onClick={() => (address ? disconnect() : connectWithMetamask())}
        className="rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base"
      >
        {address ? "Sign Out" : "Sign In"}
      </button>
    </header>
  );
}

export default Header;


```

### In pages/nft/[id].tsx:

```
import Image from "next/image";
import React from "react";
import { Content, Header } from "../../components";
import { useAddress } from "@thirdweb-dev/react";

function NFTDrop() {
  // Authentication
  const address = useAddress();
  console.log(address);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <Image
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-96"
              src="/assets/1.png"
              alt="Profile Picture"
              width={600}
              height={600}
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">Corgis</h1>
            <h2 className="text-xl text-gray-300">
              A collection of Corgis who live & breathe cuteness!
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
            {address.substring(address.length - 5)}
          </p>
        )}
        <Content />
      </div>
    </div>
  );
}

export default NFTDrop;


```

## Settting up Sanity CMS:

```
sudo npm install -g @sanity/cli
sanity login
sanity init --coupon sonny2022
Project name: web3-nft-drop-dapp
Use the default dataset configuration? Yes
Project output path: sanity-studio
Select project template Blog (schema)
```

Login to https://www.sanity.io/ > API > Tokens > Add API Token > Name:web3-nft-drop-dapp > Permissions:Editor > Save > Copy Token

### Create a .env.local in the root directory:

Paste the sanity token in here. Also add the projectId and dataset

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_TOKEN=......
```

### Update .gitignore:

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# sanity-studio
/sanity-studio/node_modules

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

### Create sanity.js in the root directory:

Install dependencies

```
npm install next-sanity @sanity/image-url
```

In sanity.js:

```
import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-11-17",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

```

### Launch Sanity Studio:

```
cd sanity-studio
sanity start
Go to http://localhost:3333
```

## Modify Sanity Schemas:

In sanity-studio/schemas delete blockContent.js and caregory.js. Rename author.js to creator.js and post.js to collection.js.

### In sanity-studio/schemas/creator.js:

```
export default {
  name: "creator",
  title: "Creator",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};

```

### In sanity-studio/schemas/collection.js:

```
export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Enter the title of the NFT Drop",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "nftCollectionName",
      title: "Name of NFT Collection",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "creator",
      title: "Creator",
      type: "reference",
      to: { type: "creator" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "previewImage",
      title: "Preview image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};

```

### In sanity-studio/schemas/schema.js:

```
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import creator from './creator'
import collection from './collection'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    creator,
    collection,
  ]),
})

```

Got to http://localhost:3333

### Testnets:

Go through https://blog.thirdweb.com/guides/which-network-should-you-use/ to understand how to setup a fake testnet.
Testnets typically act the same as a main network, and come with "fake" currencies you can get for free via a faucet. For example, a popular testnet that mocks the Ethereum blockchain is the Goerli Ethereum testnet.

You can receive free test Ether on the Goerli network from the [Goerli Faucet](https://goerlifaucet.com/). This allows you to cover the gas costs for deploying smart contracts, and perform any other operation that you would normally
be able to do on the main Ethereum network; like mint NFTs or transfer Ether.

Go to https://goerlifaucet.com/

You will need to signup or login with Alchemy to request ETH.

Copy your MetaMask Address and paste it in > Send Me ETH
You will receive 0.2 Goerli ETH.

You can also go to https://faucets.chain.link/ or https://goerli-faucet.pk910.de/
Connect Wallet > Choose Metamask > Your Account
In solana, you can use Solana's devnet to test your contracts, you can get funds from [Solana devnet faucet](https://thirdweb.com/faucet/solana)

### Create and Deploy the NFTs in Thirdweb (NFT drop):

Go to https://thirdweb.com/dashboard
Connect Wallet > MetaMask > Continue
I want to get started with a prebuilt contract > Get Started > NFT Drop > Deploy Now
Select Image:...
Name: Corgis
Symbol: CG
Description: A collection of Corgis who live & breathe cuteness!
Recipient Address: Your metamask address
Recipient Address: Your metamask address
Percentage: 1.00
Choose Network/Chain: Test Network: Goerli (GOR)
Deploy Now
Click on MetaMask > Under Activity tab > you will see a "Contract interaction (Unapproved)"
Select a Low Gas Fee > Confirm
Next, you will see "Deploy Proxy By Implementation" (Pending) > It will deploy in sometime.
You will be re-directed to your "Contract Explorer".
Copy your "Smart Contract Address"

## Batch Uploading NFTs using Thirdweb:

- Create your custom NFT image assets
- Next create a .csv file add "name","description" and a few trait columns like "spolight color", "position", "background_color".
- Save the .csv and images in a folder.
- Click on NFTs tab in your thirdweb explorer > + Batch Upload > Drag the images and .csv into the batch uploader
- Upload NFTs (This uploads the files to IPFS - Inter Planetary File System)
- Open MetaMask Popup > Contract Interaction (Unapproved) > Choose Low Gas Fees > Confirm > Lazy Mint(Pending)
- Once Lazy Minting is completed it has created NFTs onto the NFT Drop Collection.

## Adding a Claim Phase using Thirdweb:

- Go to the Thirdweb "NFTs" tab Dashboard - You should see the newly created NFTs.
- Unclaimed Supply means the NFTs have not yet been claimed or minted.
- Next, Click on "Claim Conditions" tab > + Add Initial Claim Phase (If no Claim Phase is defined no-one will be able to claim this drop.)
- Name: Phase 1
- When will this phase start?: Choose a start date
- How much do you want to charge to claim each NFT?: 0.01
- Who can claim NFTs during this phase?: Any Wallet
- How many NFTs can be claimed per wallet?: Unlimited
- How many NFTs will you drop in this phase?: Unlimited
- What currency do you want to use?: Ethereum
- Save Claim Phase
- Open MetaMask Popup > Contract Interaction (Unapproved) > Choose Low Gas Fees > Confirm > Multicall (Pending) (let it complete)

## Update Sanity Studio:

### Create a new Creator:

Name:Valyn DSilva
Address: This will be your metamask wallet address
Bio:Blockchain Developer
Slug:valyn-dsilva
Image:some image
Publish

### Create a collection.

Title:The CORGIS Coding Club | NFT Drop
Description:A collection of Corgis who live & breathe cuteness!
Name of NFT Collection:Corgis
Address: This will be the smart contract address you copied earlier
Slug:corgis
Creator:Choose a creator
Main Image:some image
Preview Image:some image
Publish

## Create typings.d.ts in the root directory:

In typings.d.ts:

```
interface Image {
  asset: {
    url: string;
  };
}

export interface Creator{
    _id:string;
    name:string;
    address:string;
    bio:string;
    slug:{
        current:string;
    },
    image:Image;
}

export interface Collection {
  _id: string;
  title:string;
  description:string;
  nftCollectionName:string;
  address: string;
  slug: {
    current: string;
  };
  creator:Creator;
  mainImage:Image
  previewImage: Image;
}
```

## Server-Side Rendering using NextJS:

### Update pages/index.tsx:

```
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
  return (
    <div className="max-w-7xl mx-auto flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-4xl w-52 cursor-pointer font-extralight sm:w-80">
        {" "}
        The{" "}
        <span className="uppercase font-extrabold underline decoration-pink-600/50">
          Silva
        </span>{" "}
        NFT Market Place
      </h1>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div
                className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105"
                key={collection._id}
              >
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

```

### Update pages/nft/[id].tsx:

```
import Image from "next/image";
import React from "react";
import { Content, Header } from "../../components";
import { useAddress } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";

interface Props {
  collection: Collection;
}

function NFTDrop({ collection }: Props) {
  // Authentication
  const address = useAddress();
//   console.log(address);
//   console.log(collection);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <Image
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-96"
              src={urlFor(collection.previewImage).url()}
              alt="Profile Picture"
              width={600}
              height={600}
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <Header collection={collection} />
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        <Content collection={collection} />
      </div>
    </div>
  );
}

export default NFTDrop;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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

  const collection = await sanityClient.fetch(query, { id: params?.id });
  if (!collection) {
    return {
      notFound: true, // return 404 page
    };
  }
  return {
    props: { collection },
  };
};

```

### Update components/Header.tsx:

```
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { Collection } from "../typings";
interface Props {
  collection: Collection;
}

function Header({ collection }: Props) {
  // Authentication
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  //   console.log(address);

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
          {" "}
          The{" "}
          <span className="uppercase font-extrabold underline decoration-pink-600/50">
            {collection.nftCollectionName}
          </span>{" "}
          NFT Market Place
        </h1>
      </Link>
      <button
        onClick={() => (address ? disconnect() : connectWithMetamask())}
        className="rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base"
      >
        {address ? "Sign Out" : "Sign In"}
      </button>
    </header>
  );
}

export default Header;

```

### Update components/Content.tsx:

```
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

```

## Deploy Sanity:

In Terminal:

```
cd sanity-studio
sanity deploy
Give it a Studio hostname (<value>.sanity.studio): web3-nft-drop-dapp
You can access to Sanity Studio here: https://web3-nft-drop-dapp.sanity.studio/
```

## Update Vercel Environment Variables:

- Select your project
- Settings > Environment Variables
  Paste in the following from .env.local file into Vercel:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_TOKEN=...
```

## Fetch Total Number of NFTs Claimed, Loading Animation and Fetch Price In Eth:

### Update component/Content.tsx:

```
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "../sanity";
import { Collection } from "../typings";
import { BigNumber } from "ethers";
import { useAddress, useContract } from "@thirdweb-dev/react";
import MintBtn from "./MintBtn";
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
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
    };
    fetchPrice();
  }, [nftDrop]);

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
        priceInEth ={priceInEth!}
      />
    </>
  );
}

export default Content;

```

### Update component/MintBtn.tsx:

```
import { useAddress } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React from "react";
interface Props {
  loading: boolean;
  claimedSupply: number;
  totalSupply: BigNumber;
  priceInEth: string;
}
function MintBtn({ loading, claimedSupply, totalSupply, priceInEth }: Props) {
  // Authentication
  const address = useAddress();
  //   console.log(address);

  return (
    <button
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
  );
}

export default MintBtn;


```

## Minting Functionality:

### Update components/Content.tsx:

```
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "../sanity";
import { Collection } from "../typings";
import { BigNumber } from "ethers";
import { useAddress, useContract } from "@thirdweb-dev/react";
import MintBtn from "./MintBtn";
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
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
    };
    fetchPrice();
  }, [nftDrop]);

  const mintNft = () => {
    if (!nftDrop || !address) return;
    // const quantity = 1; // how many unique NFTs you want to claim
    setLoading(true);
    nftDrop
      ?.claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // the transaction receipt
        const claimedTokenId = tx[0].id; // the id of NFT claimed
        const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata
        console.log(receipt);
        console.log(claimedTokenId);
        console.log(claimedNFT);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setQuantity("");
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

```

### Update components/Content.tsx:

```
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
    <form onSubmit={mintNft} className="pt-5">
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

      <button
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

```

## Test MintBtn Functionality:

## Login to OpenSea:

Connect your Wallet (MetaMask) with OpenSea

## Implementing Toaster Notifications:

Install dependencies:

```
npm install react-hot-toast
```

### In pages/nft/[id].tsx:

```
import Image from "next/image";
import React from "react";
import { Content, Header } from "../../components";
import { useAddress } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import { Toaster } from "react-hot-toast";
interface Props {
  collection: Collection;
}

function NFTDrop({ collection }: Props) {
  // Authentication
  const address = useAddress();
  //   console.log(address);
  //   console.log(collection);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center"/>
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <Image
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-96"
              src={urlFor(collection.previewImage).url()}
              alt="Profile Picture"
              width={600}
              height={600}
            />
          </div>
          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <Header collection={collection} />
        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        <Content collection={collection} />
      </div>
    </div>
  );
}

export default NFTDrop;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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

  const collection = await sanityClient.fetch(query, { id: params?.id });
  if (!collection) {
    return {
      notFound: true, // return 404 page
    };
  }
  return {
    props: { collection },
  };
};

```

### Update components/Content.tsx:

```
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
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
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

```

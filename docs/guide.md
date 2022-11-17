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
import { Content, Header, MintBtn } from "../../components";

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
        <MintBtn/>
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
import Image from "next/image";
import React from "react";

function Content() {
  return (
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

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

```

We change the <ThirdwebProvider desiredChainId={ChainId.Mainnet}> to <ThirdwebProvider desiredChainId={ChainId.Rinkeby}> where Rinkeby is the test network for etherium. You can use fake etherium to test your transactions.

## Building the Login Functionality with Thirdweb:
In components/Header.tsx:
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

In pages/nft/[id].tsx:
```
import Image from "next/image";
import React from "react";
import { Content, Header, MintBtn } from "../../components";
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
        <MintBtn />
      </div>
    </div>
  );
}

export default NFTDrop;


```

When you click on Sign In button in the Header.tsx MetaMask asks you to Login. Select your account and click on Next button > Connect button And you should be connected.

Check in Dev Console to check if you can see the address.
You can use the address to determine if a User is logged in or not.







useNFTDrop() was deprecated so you must use useContract() and instead of "const nftDrop = useNFTDrop(collection.address)" use "const nftDrop = useContract(collection.address, "nft-drop").contract;"

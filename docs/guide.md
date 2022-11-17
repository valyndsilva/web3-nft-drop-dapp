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

## thirdweb React SDK:
This is the SDK used to connect to thirdweb and all of it's services.
Go to thirdweb [docs](https://portal.thirdweb.com/react):



## Build the NFT Drop Page:
In pages/index.tsx:
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

In pages/nft/[id].tsx:
```

```

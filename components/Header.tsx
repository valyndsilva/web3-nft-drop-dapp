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

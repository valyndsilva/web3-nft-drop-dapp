"use client";
import Link from "next/link";
import React from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";


function Header() {
  // Authentication
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  //   console.log(address);

  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-5 mr-2 font-extrabold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <h1 className="w-full cursor-pointer text-xl font-extralight">
          {" "}
          The{" "}
          <span className="uppercase font-extrabold underline decoration-pink-600/50">
            SILVA
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

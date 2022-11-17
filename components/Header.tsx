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

import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav>
      {" "}
      <h1 className="mb-10 text-4xl w-full cursor-pointer font-extralight">
        {" "}
        The{" "}
        <span className="uppercase font-extrabold underline decoration-pink-600/50">
          Silva
        </span>{" "}
        NFT Market Place
      </h1>
    </nav>
  );
}

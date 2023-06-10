"use client";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="absolute bottom-0 flex items-center text-center justify-center w-full z-30 bg-black text-white h-20 overflow-x-hidden">
        <span className="text-md">
          © {currentYear} The SILVA NFT Market Place.
        </span>
      </div>
    </>
  );
}

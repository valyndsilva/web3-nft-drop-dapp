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

"use client";
import React, { useEffect, useState } from "react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      {children}
    </ThirdwebProvider>
  );
}

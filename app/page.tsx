"use client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { mintclub, wei } from "mint.club-v2-sdk";
import { base } from "viem/chains";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: 8453,
  });
  const { disconnect } = useDisconnect();
  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-20">
      {address ? (
        <>
          <div>Connected: {address}</div>
          <div
            className="text-red-500 cursor-pointer"
            onClick={() => disconnect?.()}
          >
            Disconnect
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <button
              className="border border-white"
              onClick={() => {
                mintclub
                  .withWalletClient({
                    ...walletClient,
                    // there are cases when the chain is not set in the wallet client
                    chain: base,
                  } as any)
                  .network("base")
                  .token("CHICKEN")
                  .buy({
                    amount: wei(1),
                  });
              }}
            >
              Buy 1 CHICKEN token on BASE
            </button>
            <a
              href="https://mint.club/token/base/CHICKEN"
              target="_blank"
              className="text-green-500"
            >
              https://mint.club/token/base/CHICKEN
            </a>
          </div>
        </>
      ) : (
        <button
          onClick={() => {
            openConnectModal?.();
          }}
        >
          Connect wallet
        </button>
      )}
    </main>
  );
}

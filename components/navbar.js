import { Button, Heading, HStack, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import ConnectWalletButton from "./wallet/connectWalletButton";
import { DappContext } from "../contexts/dAppContext";
import { useContext, useEffect, useState } from "react";
import DisconnectWalletButton from "./wallet/disconnectWalletButton";

export default function Navbar() {
  const { accountConnected, accountAddress } = useContext(DappContext);
  return (
    <HStack spacing="5" margin="5">
      <NextLink href="/" passHref>
        <Heading as="a">Sook</Heading>
      </NextLink>

      {!accountConnected ? (
        <>
          <Spacer />
          <ConnectWalletButton />
        </>
      ) : (
        <>
          <NextLink href={"/creator/" + accountAddress} passHref>
            <Button as="a">🧑‍🎨 Creator</Button>
          </NextLink>
          <NextLink href={"/collector/" + accountAddress} passHref>
            <Button as="a">🧑‍🌾 Collector</Button>
          </NextLink>
          <Spacer />
          <DisconnectWalletButton />
        </>
      )}
    </HStack>
  );
}

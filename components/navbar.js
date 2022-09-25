import { Button, Heading, HStack, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import ConnectWalletButton from "./wallet/connectWalletButton";
import { DappContext } from "../contexts/dAppContext";
import { useContext, useEffect, useState } from "react";
import DisconnectWalletButton from "./wallet/disconnectWalletButton";

export default function Navbar() {
  const { accountConnected } = useContext(DappContext);
  return (
    <HStack spacing="5" margin="5">
      <Heading>Sook</Heading>
      <NextLink href="/creator/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" passHref>
        <Button as="a">🧑‍🎨 Creator</Button>
      </NextLink>
      <NextLink href="/collector/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" passHref>
        <Button as="a">🧑‍🌾 Collector</Button>
      </NextLink>
      <Spacer />
      {!accountConnected ? <ConnectWalletButton /> : <DisconnectWalletButton />}
    </HStack>
  );
}

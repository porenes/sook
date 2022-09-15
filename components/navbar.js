import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <HStack spacing="5" margin="5">
      <Heading>Sook</Heading>
      <NextLink href="/creator/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" passHref>
        <Button as="a">Creator</Button>
      </NextLink>
      <NextLink href="/collector/tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" passHref>
        <Button as="a">Collector</Button>
      </NextLink>
    </HStack>
  );
}

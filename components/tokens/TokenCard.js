import { Box, Image, Flex, Badge, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import PlatformTokenLink from "./PlatformTokenLink";

const THUMB_PLACEHOLDERS = [
  "ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc",
  "ipfs://QmY7npznSASiN61trocXBbYe43iRKKicx2ZtZgQZNJRjtA",
];

export default function TokenCard({ nft }) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      margin="1%"
      key={nft.fa2_address + nft.token_id}
      // p="1"
      maxW="320px"
      h="400px"
      borderWidth="1px"
    >
      {nft.token.thumbnail_uri && (
        <Flex flex={1}>
          <Image
            src={(!THUMB_PLACEHOLDERS.includes(nft.token.thumbnail_uri)
              ? nft.token.thumbnail_uri
              : nft.token.display_uri
            )?.replace(
              "ipfs://",
              process.env.NEXT_PUBLIC_IPFS_HTTP_GATEWAY_BASE_URI
            )}
            alt={nft.token.name}
            placeholder="blur"
            objectFit="contain"
            // boxSize="100%"

            h={"250px"}
            w={"full"}
          />
        </Flex>
      )}

      <Flex align="baseline" mt={2}>
        {nft.token.platform && (
          <Badge colorScheme="teal" fontSize="xs">
            {nft.token.platform}
          </Badge>
        )}
        <Text ml={2} fontSize="md" fontWeight="bold">
          by{" "}
          <Link href={"/creator/" + nft.token.artist_address} color="teal">
            {nft.token.artist_profile?.alias || "anon"}
          </Link>{" "}
          <Link href={"https://tzkt.io/" + nft.token.artist_address} isExternal>
            <ExternalLinkIcon />
          </Link>
        </Text>
      </Flex>
      <Text mt={2} fontSize="md" fontWeight="semibold" lineHeight="short">
        {nft.token.name?.length < 25
          ? nft.token.name
          : nft.token.name?.slice(0, 25) + "..."}
      </Text>
      <Flex mt={2} align="center">
        <Text ml={1} fontSize="sm">
          <PlatformTokenLink token={nft.token}>
            {nft.token_id.length < 5
              ? nft.token_id
              : nft.token_id.slice(0, 7) + "..."}
          </PlatformTokenLink>
        </Text>
      </Flex>
    </Box>
  );
}

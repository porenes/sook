import { ExternalLinkIcon } from "@chakra-ui/icons";
import { TextEllipse } from "../utils/TextEllipse";
import {
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Image,
  Link,
} from "@chakra-ui/react";

export default function HoldingTableView({ nfts }) {
  return (
    <TableContainer>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Thumb</Th>
            <Th>Token</Th>
            <Th>Name</Th>
            <Th>#</Th>
            <Th>🔥</Th>
            <Th>Author</Th>
            <Th>Lowest</Th>
            <Th>Highest</Th>
            <Th>Last</Th>
          </Tr>
        </Thead>
        <Tbody>
          {nfts.map((nft) => {
            let platformURL = "#";
            switch (nft.token.platform) {
              case "OBJKT":
                platformURL =
                  "https://objkt.com/asset/" +
                  nft.fa2_address +
                  "/" +
                  nft.token_id;
                break;
              case "VERSUM":
                platformURL =
                  "https://www.versum.xyz/token/versum/" + nft.token_id;
                break;
              case "FXHASH":
                platformURL = "https://www.fxhash.xyz/gentk/" + nft.token_id;
                break;
              case "HEN":
                platformURL = "https://hic.af/o/" + nft.token_id;
                break;

              default:
                platformURL =
                  "https://objkt.com/asset/" +
                  nft.fa2_address +
                  "/" +
                  nft.token_id;
                break;
            }
            return (
              <Tr key={nft.fa2_address + nft.token_id}>
                <Td padding="0" textAlign="center">
                  {nft.token.thumbnail_uri && (
                    <Image
                      src={nft.token.thumbnail_uri.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )}
                      width="50"
                      height="50"
                      alt={nft.token.name}
                      placeholder="blur"
                    ></Image>
                  )}
                </Td>
                <Td>
                  <Link href={platformURL} isExternal>
                    {nft.token_id.length < 5
                      ? nft.token_id
                      : nft.token_id.slice(0, 5) + "..."}
                    <ExternalLinkIcon />
                  </Link>
                </Td>
                <Td>
                  {" "}
                  {nft.token.name?.length < 25
                    ? nft.token.name
                    : nft.token.name?.slice(0, 25) + "..."}
                </Td>
                <Td>{nft.amount + "/" + nft.token.editions}</Td>
                <Td>{nft.token.burned_editions}</Td>
                <Td>
                  <Link
                    href={"https://tzkt.io/" + nft.token.artist_address}
                    isExternal
                  >
                    {nft.token.artist_profile?.alias || "anon"}
                    <ExternalLinkIcon />
                  </Link>
                </Td>
                <Td isNumeric>
                  {(nft.token.lowest_sales_price / 1000000).toFixed(4)}
                </Td>
                <Td isNumeric>
                  {(nft.token.highest_sales_price / 1000000).toFixed(4)}
                </Td>
                <Td isNumeric>
                  {(nft.token.last_sales_price / 1000000).toFixed(4)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

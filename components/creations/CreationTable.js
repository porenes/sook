import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import PlatformTokenLink from "../../components/tokens/PlatformTokenLink";
import TokenCard from "../tokens/TokenCard";

export default function CreationTable({
  creations,
  creations_fxhash,
  holdings,
}) {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Platform</Th>
          <Th>Owned</Th>
          <Th>Ed.</Th>
          <Th>🔥</Th>
          <Th>🏷</Th>
          <Th>1st 🏷</Th>
          <Th>🔝 💰</Th>
          <Th>🔝 💁🏻‍♂️</Th>
          <Th>Last 🏷</Th>
        </Tr>
      </Thead>
      <Tbody>
        {creations.map((token) => {
          return (
            <Tr key={token.platform + token.token_id}>
              <Td>{token.name}</Td>
              <Td>
                <PlatformTokenLink token={token}>
                  {token.platform}
                </PlatformTokenLink>
              </Td>
              <Td isNumeric>
                {holdings
                  .filter((h) => {
                    return (
                      h.fa2_address == token.fa2_address &&
                      h.token_id == token.token_id
                    );
                  })
                  .reduce((ed, h) => (ed += h.amount), 0)}
              </Td>
              <Td isNumeric>{token.editions}</Td>
              <Td isNumeric>{token.burned_editions || ""}</Td>
              <Td isNumeric>{token?.price / 10 ** 6} tz</Td>
              <Td isNumeric>{token?.first_sales_price / 10 ** 6} tz</Td>
              <Td isNumeric>{token?.highest_sales_price / 10 ** 6} tz</Td>
              <Td isNumeric>{token?.highest_offer_price / 10 ** 6} tz</Td>
              <Td isNumeric>{token?.last_sales_price / 10 ** 6} tz</Td>
            </Tr>
          );
        })}
        {creations_fxhash.map((token) => {
          return (
            <Tr key={token.fx_issuer_id}>
              <Td>{token.fx_collection_name}</Td>
              <Td>
                {" "}
                <PlatformTokenLink token={token} fxhashUseGenerator>
                  {token.platform}
                </PlatformTokenLink>
              </Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>{token.fx_collection_editions}</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

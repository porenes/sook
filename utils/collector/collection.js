import { gql } from "@apollo/client";

export function getCollectionQuery(id) {
  const QUERY = gql`
query GetHoldings {
  holdings(
    where: {
      holder_address: { _eq: "${id}" }
      amount: { _gt: 0 }
      fa2_address: { _neq: "KT1VBe538e2ucXhdWdoaFnLpyCiTkvsPkyZm" }
    }
    order_by: { last_received_at: desc }
  ) {
    amount
    fa2_address
    token_id
    token {
      artist_address
      name
      platform
      thumbnail_uri
      artist_profile {
        alias
      }
      sales_count
      sales_volume
      highest_sales_price
      lowest_sales_price
      last_sales_price
      burned_editions
      editions
      first_sales_price
      lowest_price_listing(path: "price")
      price
      fa2_address
      token_id
      display_uri
    }
  }
  tzprofiles_by_pk(account: "${id}") {
    alias
    description
    discord
    domain_name
    ethereum
    github
    logo
    twitter
    website
  }
}
`;
  return QUERY;
}

import { gql } from "@apollo/client";

export function getCreatorHoldingsQuery(creatorId, collectorId) {
  const QUERY = gql`
  query CreatorHoldings {
    holdings_aggregate(where: {holder_address: {_eq: "${collectorId}"}, token: {artist_address: {_eq: "${creatorId}"}}, amount: {_neq: "0"}}) {
      aggregate {
        count
        sum {
          amount
        }
      }
      nodes {
        token_id
        fa2_address
        amount
      }
    }
  }
  
  `;

  return QUERY;
}

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

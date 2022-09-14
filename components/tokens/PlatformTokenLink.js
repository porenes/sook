import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function PlatformTokenLink({ children, token }) {
  let platformURL = "#";
  switch (token.platform) {
    case "OBJKT":
      platformURL =
        "https://objkt.com/asset/" + token.fa2_address + "/" + token.token_id;
      break;
    case "VERSUM":
      platformURL = "https://www.versum.xyz/token/versum/" + token.token_id;
      break;
    case "FXHASH":
      platformURL = "https://www.fxhash.xyz/gentk/" + token.token_id;
      break;
    case "HEN":
      platformURL = "https://teia.art/objkt/" + token.token_id;
      break;
    case "8BIDOU":
      platformURL = "https://www.8bidou.com/item/?id=" + token.token_id;
      break;
    case "TYPED":
      platformURL = "https://typed.art/" + token.token_id;
      break;

    default:
      platformURL =
        "https://objkt.com/asset/" + token.fa2_address + "/" + token.token_id;
      break;
  }
  return (
    <Link href={platformURL} isExternal>
      {children}
      <ExternalLinkIcon />
    </Link>
  );
}

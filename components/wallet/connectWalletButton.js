import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { DappContext } from "../../contexts/dAppContext";

const ConnectWalletButton = () => {
  const { connectAccount } = useContext(DappContext);

  return <Button onClick={connectAccount}>Connect</Button>;
};

export default ConnectWalletButton;

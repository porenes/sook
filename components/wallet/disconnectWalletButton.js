import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { DappContext } from "../../contexts/dAppContext";

const DisconnectWalletButton = () => {
  const { disconnectAccount } = useContext(DappContext);

  return <Button onClick={disconnectAccount}>Disconnect</Button>;
};

export default DisconnectWalletButton;

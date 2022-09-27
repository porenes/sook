import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { ColorMode } from "@airgap/beacon-sdk";
import { Tzip16Module } from "@taquito/tzip16";

const defaultState = {
  accountConnected: false,
  accountLoading: false,
  accountAddress: "",
  accountAddressPreview: "",
  accountTezBalance: "",
  error: "",
  connectAccount: undefined,
  disconnectAccount: undefined,
};

export const DappContext = createContext(defaultState);

export const DappProvider = ({ children }) => {
  // STATE
  // tezos
  const [tezos, setTezos] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);

  // account
  const [accountConnected, setAccountConnected] = useState(
    defaultState.accountConnected
  );
  const [accountLoading, setAccountLoading] = useState(
    defaultState.accountLoading
  );
  const [accountAddress, setAccountAddress] = useState(
    defaultState.accountAddress
  );
  const [accountAddressPreview, setAccountAddressPreview] = useState(
    defaultState.accountAddressPreview
  );
  const [accountTezBalance, setAccountTezBalance] = useState(
    defaultState.accountTezBalance
  );

  // misc
  const [error, setError] = useState(defaultState.error);

  // FUNCTIONS
  const setColorMode = async () => {
    // wallet should always be initialized before calling this function
    const mode = localStorage.getItem("chakra-ui-color-mode");
    const colMode = mode
      ? mode === "dark"
        ? ColorMode.DARK
        : ColorMode.LIGHT
      : ColorMode.DARK;

    wallet
      ? await wallet.client.setColorMode(colMode)
      : log({ label: "setColorMode", message: "Wallet not initialized" });
  };

  const checkActiveAccount = async () => {
    // wallet should always be initialized before calling this function
    if (accountConnected) {
      console.log({
        label: "checkActiveAccount",
        message: "Account already initialized",
      });
      return true;
    }

    if (wallet) {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        setAccountConnected(true);
        setAccountAddress(activeAccount.address);
        console.log({
          label: "checkActiveAccount",
          message: "Active account initialized",
        });
        return true;
      } else {
        setAccountConnected(false);
        console.log({
          label: "checkActiveAccount",
          message: "No active account found",
        });
        return false;
      }
    } else {
      console.log({
        label: "checkActiveAccount",
        message: "Wallet not initialized",
      });
      return false;
    }
  };

  const connectAccount = async () => {
    if (!wallet) {
      console.log({
        label: "connectAccount",
        message: "Wallet not initialized",
      });
      return;
    }
    const isActive = await checkActiveAccount();
    if (isActive) {
      return;
    }

    setAccountLoading(true);
    try {
      const permissions = await wallet.client
        .requestPermissions()
        .catch((err) => {
          console.log({ label: "connectAccount", message: `Error: ${err}` });
        })
        .then((res) => {
          return res;
        });
      setAccountConnected(true);
      setAccountAddress(permissions.address);
      console.log({
        label: "connectAccount",
        message: "Active account initialized",
      });
    } catch (err) {
      console.log({ label: "connectAccount", message: `Error: ${err}` });
      setError(err);
    } finally {
      setAccountLoading(false);
    }
  };

  const disconnectAccount = async () => {
    if (!wallet) {
      log({
        label: "disconnectAccount",
        message: "Wallet not initialized",
      });
      return;
    }
    await wallet.clearActiveAccount();
    await wallet.disconnect();
    window.location.assign("/");
  };

  const getTezBalance = useCallback(async () => {
    if (tezos && accountAddress) {
      const bal = await tezos.tz.getBalance(accountAddress).then((res) => {
        return tezos.format("mutez", "tz", res).toString();
      });
      console.log({
        label: "getTezBalance",
        message: `Current balance: ${bal} XTZ`,
      });
      setAccountTezBalance(bal);
    } else {
      console.log({
        label: "getTezBalance",
        message: "tezos or account not initialized",
      });
    }
  }, [tezos, accountAddress, setAccountTezBalance]);

  // SIDE-EFFECT FUNCTIONS

  // init tezos/beacon-wallet
  useEffect(() => {
    const t = new TezosToolkit("https://mainnet.api.tez.ie");
    const w = new BeaconWallet({ name: "tezos-dapp-testing" });

    t.setWalletProvider(w);
    t.setPackerProvider(new MichelCodecPacker());
    t.addExtension(new Tzip16Module());

    setTezos(t);
    setWallet(w);
  }, []);

  // account setup
  useEffect(() => {
    if (!wallet) return;

    setColorMode();
    checkActiveAccount();
    getTezBalance();
  }, [wallet]);

  // update TEZ balance on each block update
  const blockHashRef = useRef("");
  useEffect(() => {
    if (!tezos) return;
    let sub;
    spawnSub();
    return () => sub.close();

    function spawnSub() {
      if (!tezos) return;
      sub = tezos.stream.subscribe("head");
      sub.on("data", (hash) => {
        if (blockHashRef.current && blockHashRef.current !== hash) {
          getTezBalance();
        }
        blockHashRef.current = hash;
      });
      sub.on("error", (err) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        sub.close();
        spawnSub();
      });
    }
  }, [tezos, getTezBalance]);

  // when userAddress is changed, update userAddressPreview
  useEffect(() => {
    if (accountAddress !== "") {
      const len = accountAddress.length;
      setAccountAddressPreview(
        `${accountAddress.slice(0, 6)}...${accountAddress.slice(len - 4, len)}`
      );
    } else {
      setAccountAddressPreview("");
    }
  }, [accountAddress]);

  return (
    <DappContext.Provider
      value={{
        accountConnected,
        accountLoading,
        accountAddress,
        accountAddressPreview,
        accountTezBalance,
        error,
        connectAccount,
        disconnectAccount,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

import { useEffect } from "react";

type HeaderProps = {
  accounts: string;
  setAccounts: any;
};

const Header = ({ accounts, setAccounts }: HeaderProps) => {
  const isConnected = Boolean(accounts);
  console.log(accounts);

  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  });

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* Metamask is Installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      /* Metamask is not installed */
      console.log("Please install Metamask");
    }
  };

  //function to keep the same account when reloading the page
  const getCurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccounts(accounts[0]);
          console.log(accounts[0]); //For test
        } else {
          console.log("Connect to Metamask using the Connect Button ");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Function so that when disconnecting from the wallet, change the state of the button on the page
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        setAccounts(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* Metamask is not installed */
      console.log("Please connect to wallet address");
    }
  };

  return (
    <div className="fixed flex w-full items-center justify-between bg-zinc-800 p-10 text-white shadow-neon">
      <div>
        <h1 className="text-2xl tracking-wider">Welcome To my Dapp</h1>
      </div>

      <div className="text-2xl">
        {isConnected ? (
          <div>
            {accounts && accounts.length > 0} Connected:{" "}
            {accounts.substring(0, 6)}...{accounts.substring(38)}
          </div>
        ) : (
          <button
            className="rounded-md bg-pink-700 px-12 py-2 tracking-wider transition ease-in-out hover:scale-105"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

import { useState, useEffect } from "react";

import chaiABI from "../../app/utils/ABI.json";

import { ethers } from "ethers";

const contractAddress = "0x3108de98c81fc56a4cf126fd1360a5fed97b70f5";

type MemosProps = {
  accounts: string;
};

const Memos = ({ accounts }: MemosProps) => {
  const [memos, setMemos] = useState([]);
  const isConnected = Boolean(accounts);

  useEffect(() => {
    memosMessage();
  }, [memos]);

  const memosMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, chaiABI.abi, signer);
    const memos = await contract.getMemos();
    // console.log(memos);
    setMemos(memos);
  };

  return (
    <div className="flex h-screen flex-col pb-6 pt-6">
      {isConnected ? (
        <div>
          {memos
            .map((memo: any) => {
              return (
                <div className="flex flex-col items-center pt-5" key={memo}>
                  <div className="rounded-md p-2 text-zinc-400 shadow-neon">
                    <span className="flex gap-2 text-lg font-semibold">
                      Name : <p>{memo.name}</p>
                    </span>
                    <span className="flex gap-2 text-lg font-semibold">
                      Message : <p>{memo.message}</p>
                    </span>
                    <span className="flex gap-2 text-sm font-semibold">
                      Date :{" "}
                      <p>
                        {new Date(
                          memo.timestamp.toString() * 1000,
                        ).toLocaleTimeString("pt-br", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                    </span>
                    <span className="flex gap-2 text-lg font-semibold">
                      Address : <p>{memo.from}</p>
                    </span>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Memos;

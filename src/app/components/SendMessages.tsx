"use client";
import { useState } from "react";

import contractABI from "../../app/utils/ABI.json";

import { ethers } from "ethers";

type Props = {
  accounts: string;
};

const contractAddress = "0x3108de98c81fc56a4cf126fd1360a5fed97b70f5";

const SendComments = ({ accounts }: Props) => {
  const isConnected = Boolean(accounts);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  console.log(accounts);

  const sendMessage = async (evt: any) => {
    evt.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer,
        );

        setLoading("Enviando mensagem, aguarde um momento...");
        console.log("Enviando mensagem");
        const sendTxn = await contract.messages(name, message);

        await sendTxn.wait();
        setLoading("Mensagem enviada");
        console.log("Mensagem enviada");
      }
    } catch (error) {
      setLoading("Ops, ocorreu algum erro !!");
    }
  };

  return (
    <div className="flex flex-col ">
      {isConnected ? (
        <div className="flex items-center justify-center pt-24">
          <div className="h-auto w-[320px] rounded-lg border-pink-800 bg-zinc-600 p-4 shadow-neon">
            <form
              onSubmit={sendMessage}
              className="flex w-full flex-col gap-4 px-2"
            >
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Your Name is Optional"
                className="rounded-md border border-purple-400 bg-zinc-600 p-2 text-zinc-400 outline-none"
              />
              <input
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                type="text"
                placeholder="Your Message"
                className="rounded-md border border-purple-400 bg-zinc-600 p-2 text-zinc-400 outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-pink-700 p-2 text-white hover:bg-pink-800"
              >
                Send Message
              </button>
              <span className="text-left text-sm font-light uppercase tracking-widest text-purple-400 ">
                {loading}
              </span>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex h-[86vh] items-center justify-center pt-20">
          <span className="text-3xl text-white">Not Connected</span>
        </div>
      )}
    </div>
  );
};

export default SendComments;

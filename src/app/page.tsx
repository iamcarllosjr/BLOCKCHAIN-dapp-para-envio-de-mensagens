"use client";
import { useState } from "react";

import { Header, Memos, SendMessages } from "../app/components";

export default function Home() {
  const [accounts, setAccounts] = useState("");

  return (
    <div className="h-full bg-zinc-800">
      <Header accounts={accounts} setAccounts={setAccounts} />
      <div className="flex h-full flex-col pt-20">
        <SendMessages accounts={accounts} />
        <Memos accounts={accounts} />
      </div>
    </div>
  );
}

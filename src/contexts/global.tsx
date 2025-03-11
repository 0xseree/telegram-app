import * as React from "react";
import { useState } from "react";

export const GlobalContext = React.createContext<any>(null);

export function useGlobal() {
  return React.useContext(GlobalContext);
}

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  bio?: string;
}

export function GlobalProvider({ children }: React.PropsWithChildren) {
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [processing, setProcessing] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        receiver,
        setReceiver,
        amount,
        setAmount,
        balance,
        setBalance,
        processing,
        setProcessing,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
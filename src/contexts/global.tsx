import * as React from "react";
import { useState } from "react";

interface GlobalContextType {
  receiver: string;
  setReceiver: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  processing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const GlobalContext = React.createContext<GlobalContextType | null>(null);

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
  const [balance, setBalance] = useState<string>("0.00");
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

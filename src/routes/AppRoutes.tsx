import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Receive from "../pages/Receive/Receive";
import Transfer from "../pages/Transfer/Transfer";
import { PayWithQRCode } from "../pages/Transfer/PayWithQRCode";
import { TransactionHistory } from "../pages/History/TransactionHistory";
import { useEffect, useState } from "react";
import { useGlobal } from "../contexts/global";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Define the Telegram WebApp global object
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

const AppRoutes = () => {
  const globalContext = useGlobal();
  const [loading, setLoading] = useState<boolean>(false);
  const setUserData = globalContext?.setUserData;
  const setBalance = globalContext?.setBalance;
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AppRoutes useEffect called");

    const fetchBalance = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(process.env.SCROLL_RPC_URL);
        console.log("Provider:", provider);
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
          throw new Error("Private key is not defined");
        }
        const wallet = new ethers.Wallet(privateKey, provider);
        const contractAddress = process.env.SETB_CONTRACT_ADDRESS;

        if (!contractAddress) {
          throw new Error("Contract address is not defined");
        }

        const abi = [
          "function balanceOf(address owner) view returns (uint256)"
        ];

        const contract = new ethers.Contract(contractAddress, abi, wallet);
        const balance = await contract.balanceOf(wallet.address);

        if (setBalance) {
          setBalance(ethers.formatUnits(balance, 18).toString());
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    // const authenticateUser = async () => {
    //   if (window.Telegram && window.Telegram.WebApp) {
    //     const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
    //     console.log("Telegram user:", telegramUser);

    //     if (telegramUser) {
    //       setUserData(telegramUser);
    //     } else {
    //       setError("Failed to get Telegram user data");
    //     }
    //   } else {
    //     setError("Telegram WebApp is not available");
    //   }
    // };

    // authenticateUser();
    fetchBalance();
  }, [setUserData, setBalance]);

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  // if (error) {
  //   return <div className="error">Error: {error}</div>;
  // }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/pay-with-qr-code" element={<PayWithQRCode />} />
          <Route path="/transactions" element={<TransactionHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Receive from "../pages/Receive/Receive";
import Transfer from "../pages/Transfer/Transfer";
import { PayWithQRCode } from "../pages/Transfer/PayWithQRCode";
import { TransactionHistory } from "../pages/History/TransactionHistory";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobal } from "../contexts/global";

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
  const { setUserData, setBalance } = useGlobal();
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("https://511a-89-116-154-84.ngrok-free.app/api/getBalance");
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Error fetching balance");
      }
    };

    fetchBalance();
  }, [setUserData, setBalance]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

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
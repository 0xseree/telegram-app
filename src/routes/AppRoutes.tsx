import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Receive from "../pages/Receive/Receive";
import Transfer from "../pages/Transfer/Transfer";
import { PayWithQRCode } from "../pages/Transfer/PayWithQRCode";
import { TransactionHistory } from "../pages/History/TransactionHistory";
import { initData, init } from '@telegram-apps/sdk-react';

import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobal } from "../contexts/global";


const AppRoutes = () => {
  const { setUserData } = useGlobal();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    init();
    initData.restore();
    console.log("AppRoutes useEffect called");
    const authenticateUser = async () => {
      console.log("authenticateUser function called");
      console.log("initData restored:", initData.raw());
      console.log("user:", initData.user);

      try {
        const response = await axios.post(
          "https://511a-89-116-154-84.ngrok-free.app/api/auth",
          {
            initData: initData.raw(),
          }
        );

        if (response.data.authenticated) {
          // Set user data in global state
          setUserData(response.data.user);
          setLoading(false);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err: any) {
        console.error("Error authenticating user:", err.message || err);
        setError(err.message || "An unknown error occurred");
        setLoading(false);
      }
    };

    authenticateUser();
  }, [setUserData]);

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/pay-with-qr-code" element={<PayWithQRCode />} />
        <Route path="/transactions" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
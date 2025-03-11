import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Receive from "../pages/Receive/Receive";
import Transfer from "../pages/Transfer/Transfer";
import { PayWithQRCode } from "../pages/Transfer/PayWithQRCode";
import { TransactionHistory } from "../pages/History/TransactionHistory";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AppRoutes useEffect called");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Loading user data...</div>;
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
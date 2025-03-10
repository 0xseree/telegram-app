import { FaArrowLeft } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { useState } from "react";
import { TransactionComponent } from "../../components/UI/TransactionComponent";
import { Link } from "react-router-dom";

export default function Receive() {
  const [userData, setUserData] = useState<string>("collinsadi");

  function goBack() {
    window.history.back();
  }

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between p-5 fixed top-0 left-0 right-0 z-10 bg-white">
        <span onClick={goBack} className="text-2xl">
          <FaArrowLeft />
        </span>

        <h3 className="text-xl font-bold">Receive with QR Code</h3>

        <div></div>
      </div>

      <div className="w-full mt-20 flex flex-col items-center justify-center">
        <div className="my-10 w-full text-center">
          <h3>Scan this QR Code to receive Cash</h3>
        </div>

        <div className="w-[300px] max-w-[95%] bg-white shadow-md p-5 rounded-xl flex items-center justify-center">
          <QRCode
            value={userData}
            size={180}
            style={{
              height: "180px",
              width: "180px",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            level="H" // Highest error correction level
          />
        </div>

        <div className="flex items-center justify-between mt-10 w-full px-5">
          <h3 className="text-md font-bold">Transaction History</h3>
          <Link
            className="text-md text-[#1CA36E] underline"
            to={"/transactions"}
          >
            View Transactions
          </Link>
        </div>

        <div className="w-full px-5 mt-5">
          <TransactionComponent />
          <TransactionComponent />
          <TransactionComponent />
        </div>
      </div>
    </section>
  );
}

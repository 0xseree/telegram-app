import { FaArrowLeft } from "react-icons/fa6";
import BalanceCard from "../../components/Home/BalanceCard";
import { LuScanLine } from "react-icons/lu";
import { TransferConfirmationModal } from "../../components/transfer/TransferConfirmationModal";
import { useState } from "react";
import { useGlobal } from "../../contexts/global";
import { Link } from "react-router-dom";
export default function Transfer() {
  const [isOpen, setIsOpen] = useState(false);
  const { amount, setAmount, receiver, setReceiver, processing } = useGlobal();

  function goBack() {
    window.history.back();
  }

  const handleTransfer = () => {
    setIsOpen(true);
  };

  const onModalClose = () => {
    if (!processing) {
      setAmount("");
      setReceiver("");
      setIsOpen(false);
    }
  };

  return (
    <section className="w-full ">
      <TransferConfirmationModal
        isOpen={isOpen}
        onClose={onModalClose}
      />

      <div className="w-full flex items-center justify-between  p-5 fixed top-0 left-0 right-0 z-10 bg-white">
        <span onClick={goBack} className="text-2xl">
          <FaArrowLeft />
        </span>

        <h3 className="text-xl font-bold">Send Cash</h3>

        <div></div>
      </div>

      <div className="w-full mt-20">
        <div className="w-full">
          <BalanceCard />
        </div>

        <div className="w-full bg-white rounded-xl p-5 shadow-xl mt-5 pb-10">
          <div>
            <p className="text-gray-500 text-xl">You're paying:</p>
          </div>

          <div className="w-full flex items-center gap-2 mt-2">
            <div>
              <img
                className="w-[80px] rounded-full"
                src="/user_icon.png"
                alt=""
              />
            </div>

            <div className="w-full bg-[#EDF1F3] rounded-full p-2 mt-3 flex items-center justify-between">
              <input
                className="w-[90%] rounded-full px-3 bg-transparent border-none outline-none text-4xl font-bold no-spinner appearance-none"
                type="number"
                name=""
                id=""
                value={parseFloat(amount)}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
              />

              <div className=" flex items-center gap-2 bg-white rounded-full p-2 w-[100px]">
                <img className="w-5 h-5" src="/bir_green_icon.png" alt="" />
                <p className="font-bold">BIRR</p>
              </div>
            </div>
          </div>

          <div className="my-5">
            <p className="text-gray-500 text-xl">Reciever</p>
          </div>

          <div className="w-full">
            <div className="w-full border-3 border-[#E3E5FC] p-3 rounded-2xl flex items-center">
              <div>
                <img className="w-[50px]" src="/seree_icon.png" alt="" />
              </div>

              <div className="ml-4">
                <h3 className="text-xl font-bold">Username</h3>
                <input
                  type="text"
                  className="w-full mt-2 outline-none border-none text-xl"
                  placeholder="collins_adi"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="my-10 w-full">
            <button
              disabled={processing || !receiver || !amount}
              onClick={handleTransfer}
              className={`w-full px-3 py-5 items-center justify-center text-xl text-white bg-[#1CA36E] rounded-full disabled:opacity-40`}
            >
              Send Coins
            </button>
          </div>

          <div className="flex items-center gap-2 justify-between">
            <div className="h-[1px] w-[40%] bg-[#EDF1F3]"></div>
            <p className="text-center text-[#6C7278] text-xl">Or</p>
            <div className="h-[1px] w-[40%] bg-[#EDF1F3]"></div>
          </div>

          <Link
            to={`${amount ? "/pay-with-qr-code" : "#"}`}
            title={`${!amount ? "Enter Amount" : ""}`}
            className={`flex items-center mt-5 justify-center gap-4 p-4 border border-[#E3E5FC] rounded-full ${
              !amount ? "opacity-50 bg-gray-300" : "opacity-100"
            }`}
          >
            <LuScanLine className="text-3xl text-[#2B61E3]" />

            <h3 className="text-md font-bold">Scan QR Code to send </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

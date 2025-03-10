import { FaArrowLeft } from "react-icons/fa6";

import { TransactionComponent } from "../../components/UI/TransactionComponent";
export const TransactionHistory = () => {
  function goBack() {
    window.history.back();
  }
  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between p-5 fixed top-0 left-0 right-0 z-10 bg-white">
        <span onClick={goBack} className="text-2xl">
          <FaArrowLeft />
        </span>

        <h3 className="text-xl font-bold">Transactions History</h3>

        <div></div>
      </div>

      <div className="w-full mt-20 flex flex-col items-center justify-center px-5">
        <TransactionComponent />
        <TransactionComponent />
        <TransactionComponent />
      </div>
    </section>
  );
};

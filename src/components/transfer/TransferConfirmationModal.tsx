import { useGlobal } from "../../contexts/global";
import { Modal } from "../UI/Modal";

export const TransferConfirmationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { amount, receiver, setProcessing, processing } = useGlobal();

  function formatAmount(value: number): string {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const confirmTransfer = () => {
    setProcessing(true);
    console.log("Transaction Processing? .... ");
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center justify-center">
          <img className="w-[80px]" src="/seree_icon.png" alt="" />
          <h3 className="my-3 text-2xl font-bold">
            {formatAmount(parseFloat(amount)) || "0"} BIRR
          </h3>

          <div className="w-full px-5 mt-10">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-500 text-xl">To</p>
              <p className="text-xl font-bold lowercase">{receiver}</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-28">
          <button
            disabled={processing}
            onClick={confirmTransfer}
            className="w-full px-3 py-5 items-center justify-center text-xl text-white bg-[#1CA36E] rounded-full"
          >
            {!processing ? "Confirm Transfer" : "Processing ..."}
          </button>
        </div>
      </div>
    </Modal>
  );
};

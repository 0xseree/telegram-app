import { useGlobal } from "../../contexts/global";
import { Modal } from "../UI/Modal";
import axios from "axios";
import { useState } from "react";

export const TransferConfirmationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { amount, receiver, setProcessing, processing } = useGlobal();
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  function formatAmount(value: number): string {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const confirmTransfer = async () => {
    setProcessing(true);
    console.log("Transaction Processing? .... ");

    try {
      const response = await axios.post("https://3055-102-90-79-14.ngrok-free.app/transfer", {
        amount: parseFloat(amount),
      });

      if (response.data.success) {
        console.log("Transaction successful:", response.data.transactionHash);
        setSuccess(true);
        setTransactionHash(response.data.transactionHash);
      } else {
        console.error("Transaction failed");
      }
    } catch (error) {
      console.error("Error processing transfer:", error);
    } finally {
      setProcessing(false);
    }
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
            disabled={processing || success}
            onClick={confirmTransfer}
            className="w-full px-3 py-5 items-center justify-center text-xl text-white bg-[#1CA36E] rounded-full"
          >
            {!processing
              ? success
                ? "Transaction Successful!"
                : "Confirm Transfer"
              : "Processing ..."}
          </button>
          {success && transactionHash && (
            <div className="mt-4 text-center">
              <a
                href={`https://sepolia.scrollscan.com/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Transaction on ScrollScan
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

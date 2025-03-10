import { FaArrowLeft } from "react-icons/fa6";
import { TransferConfirmationModal } from "../../../components/transfer/TransferConfirmationModal";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

// A Third Party implementation of the QR code reader

export const Html5QrcodeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false
    );
    scanner.render(success, error);

    function success(decodedText: string) {
      console.log(decodedText);
      scanner.clear();
    }

    function error(error: any) {
      console.log(error);
    }
  }, []);

  return (
    <section className="w-full ">
      <TransferConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="w-full flex items-center justify-between  p-5 fixed top-0 left-0 right-0 z-10 bg-white">
        <span className="text-2xl">
          <FaArrowLeft />
        </span>

        <h3 className="text-xl font-bold">Pay with QR Code</h3>

        <div></div>
      </div>
      <div className="w-full mt-20">
        <div id="reader"></div>
      </div>
    </section>
  );
};

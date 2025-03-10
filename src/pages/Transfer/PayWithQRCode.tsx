import { FaArrowLeft } from "react-icons/fa6";
import { TransferConfirmationModal } from "../../components/transfer/TransferConfirmationModal";
import { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import { useGlobal } from "../../contexts/global";

export const PayWithQRCode: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [processed, setProcessed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const { setReceiver, processing } = useGlobal();

  function goBack() {
    window.history.back();
  }

  // Initialize camera when component mounts
  useEffect(() => {
    const startCamera = async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraStream(stream);
        }
      } catch (err) {
        const error = err as Error;
        setError("Error accessing camera: " + error.message);
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture image from camera
  const captureImage = (): void => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Convert to blob and save captured image
    canvas.toBlob((blob) => {
      if (blob) {
        processQRCode(imageData);
      }
    });
  };

  // Process image data to extract QR code
  const processQRCode = (imageData: ImageData): void => {
    setScanning(true);

    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      console.log(code);

      if (code) {
        setResult(code.data);
        setReceiver(code.data);
        setProcessed(true);

        // Attempt to parse the QR code data
        try {
          // const paymentData = JSON.parse(code.data) as ReceiverInfo;
          // Set receiver info if valid data found
          // if (paymentData.username) {
          //   setProcessed(true);
          // }
        } catch (e) {
          setError("Invalid QR code format");
        }
      } else {
        setError("No QR code found");
      }
    } catch (err) {
      const error = err as Error;
      setError("Error processing QR code: " + error.message);
      console.error("QR code processing error:", error);
    } finally {
      setScanning(false);
    }
  };

  // Reset function to clear results and captured image
  const resetCamera = (): void => {
    setResult("");
    setProcessed(false);
    setError("");
  };

  const onModalClose = () => {
    if (!processing) {
      resetCamera();
      setReceiver("");
      setIsOpen(false);
    }
  };

  const handleProceed = () => {
    setIsOpen(true);
  };

  return (
    <section className="w-full ">
      <TransferConfirmationModal isOpen={isOpen} onClose={onModalClose} />

      <div className="w-full flex items-center justify-between p-5 fixed top-0 left-0 right-0 z-10 bg-white">
        <span onClick={goBack} className="text-2xl">
          <FaArrowLeft />
        </span>

        <h3 className="text-xl font-bold">Pay with QR Code</h3>

        <div></div>
      </div>
      <div className="w-full mt-20">
        {!processed && (
          <div className="w-full">
            <div className="w-full text-center">
              <h3>Scan the QR Code to process your payment</h3>
            </div>
            <div className="mt-5 w-full flex items-center justify-center">
              {/* Camera view with guide frame overlay */}
              <div className="relative max-w-[330px] max-h-[330px] rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                {/* Overlay guide frame for QR code positioning */}
                <div className="absolute inset-0 border-2 border-dashed border-[#2B61E3] m-12 rounded-lg"></div>
              </div>

              {/* Hidden canvas used for processing */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {error && (
              <div className="w-full flex items-center justify-center mt-3">
                <div className="w-[90%] rounded-xl bg-red-100 p-2 flex items-center justify-center">
                  <p className="text-red-600 text-center">{error}</p>
                </div>
              </div>
            )}

            <div className="w-full flex items-center justify-center mt-5">
              {/* <div className="w-[90%] rounded-xl bg-[#CFDDFF] p-2 flex items-center justify-center">
                <p className="text-[#2B61E3] text-center">
                  The QR Code will be automatically detected when you position
                  it between the guide lines
                </p>
              </div> */}
            </div>

            <div className="my-10 w-full flex items-center justify-center">
              <button
                onClick={captureImage}
                disabled={scanning}
                className="w-[90%] px-3 py-5 items-center justify-center text-xl text-white bg-[#1CA36E] rounded-full disabled:bg-gray-400"
              >
                {scanning ? "Scanning..." : "Scan"}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <div className="w-full my-10 flex items-center justify-center flex-col">
            <div className="w-[90%] my-5">
              <h3 className="text-xl">Receiver:</h3>
            </div>

            <div className="w-[90%] border border-[#E3E5FC] p-3 rounded-2xl flex items-center">
              <div>
                <img className="w-[50px]" src="/seree_icon.png" alt="" />
              </div>

              <div className="ml-4">
                <h3 className="text-xl font-bold">Username</h3>
                <p className="text-xl text-[#9B9B9B]">
                  {result || "undefined"}
                </p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-[90%] px-3 py-5 mt-20 items-center justify-center text-xl text-white bg-[#1CA36E] rounded-full"
            >
              Proceed
            </button>

            <p
              className="my-5 text-[#2B61E3] cursor-pointer"
              onClick={resetCamera}
            >
              Scan again
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

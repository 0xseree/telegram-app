import { IoIosCloseCircle } from "react-icons/io";

export const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`w-full h-full bg-black/50 fixed top-0 left-0 right-0 z-20 flex items-end justify-center ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-white rounded-xl p-5 shadow-xl min-h-[60%] pb-20">
        <div className="w-full flex items-center justify-end">
          <span onClick={onClose} className="text-4xl">
            <IoIosCloseCircle />
          </span>
        </div>

        <div className="w-full ">{children}</div>
      </div>
    </div>
  );
};

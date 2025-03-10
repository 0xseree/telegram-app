import { ArrowUp } from "../svg/ArrowUp";

export const TransactionComponent = () => {
  return (
    <div className="w-full p-3 flex justify-between shadow-sm rounded-xl my-3">
      <div className="flex items-center gap-5">
        <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
          <ArrowUp />
        </div>

        <div className="">
          <h3 className="font-semibold text-xl">Instant Tip</h3>
          <p className="text-sm   text-[#8F96A3]">26 Aug, 2024</p>
        </div>
      </div>

      <div>
        <p className="text-[#8F96A3]">
          {" "}
          <span className="font-bold text-xl text-black">20</span> Birr
        </p>
        <p className="text-green-600">Success</p>
      </div>
    </div>
  );
};

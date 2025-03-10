import { Link } from "react-router-dom";
import { ArrowUp } from "../svg/ArrowUp";

export const Actions = () => {
  return (
    <section className="w-full p-5">
      <div className="w-full ">
      <div className="flex items-center justify-between mt-5 w-full px-5">
          <h3 className="text-md font-bold">Transaction History</h3>
          <Link
            className="text-md text-[#1CA36E] underline"
            to={"/transactions"}
          >
            View Transactions
          </Link>
        </div>

        {/* send money */}

        <div className="w-full h-[250px] bg-gradient-to-b from-[#F89D32] to-[#AC6D23] rounded-xl relative overflow-hidden mt-5 p">
          {/* background image */}

          <div className="absolute  flex flex-col-reverse items-end gap-2 w-full justify-end">
            <img className="w-[200px]" src="/left_radar.png" alt="" />

            <img className="w-[200px]" src="/right_radar.png" alt="" />
          </div>

          {/* Main Content */}

          <div className="absolute p-5 text-white w-full h-full flex items-center justify-center">
            <div className="">
              <img className="w-[200px]" src="/send_vector.png" alt="" />
            </div>

            <div className=" ml-5">
              <h3 className="text-xl font-bold">
                Send with username or QR code
              </h3>
              <p className="text-md my-4">Send just by a tap</p>

              <Link to="/transfer" className="flex items-center justify-between gap-2 bg-white rounded-full px-2 py-2 text-black w-full">
                <div className="ml-3">
                  <p className="text-md font-bold">Send Coins</p>
                </div>
                <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                  <ArrowUp />
                </div>
              </Link>
            </div>
          </div>
        </div>


        {/* Receive Money */}

        <div className="w-full h-[200px] bg-gradient-to-b from-[#8F98FF] to-[#565B99] rounded-xl relative overflow-hidden mt-5">
          {/* background image */}

          <div className="absolute  flex flex-col-reverse items-end gap-2 w-full justify-end">
            <img className="w-[200px]" src="/left_radar.png" alt="" />

            <img className="w-[200px]" src="/right_radar.png" alt="" />
          </div>

          {/* Main Content */}

          <div className="absolute p-5 text-white w-full h-full flex items-center justify-center">
            <div className="">
              <img className="w-[150px]" src="/receive_vector.png" alt="" />
            </div>

            <div className=" ml-5">
              <h3 className="text-xl font-bold">
                Recieve with QR code
              </h3>
              <p className="text-md my-4">Recieve just by a tap</p>

              <Link to={"/receive"} className="flex items-center justify-between gap-2 bg-white rounded-full px-2 py-2 text-black w-full">
                <div className="ml-3">
                  <p className="text-md font-bold">Recieve Coins</p>
                </div>
                <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                  <ArrowUp />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

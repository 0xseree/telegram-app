import { useGlobal } from "../../contexts/global";
import { ethers } from "ethers";

export default function BalanceCard() {
  const globalContext = useGlobal();
  console.log("balance: ", globalContext.balance.toString());
  const balance = globalContext ? globalContext.balance.toString() : "0";

  function formatBalance(value: string): string {
    const [integerPart, fractionalPart = ""] = value.split(".");
    const paddedValue = integerPart + fractionalPart.padEnd(8, "0");
    
    const bigIntValue = BigInt(paddedValue);
    
    const formattedValue = ethers.formatUnits(bigIntValue, 8);
    
    return parseFloat(formattedValue).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <section className="w-full p-5">
      <div className="w-full h-[200px] bg-gradient-to-r from-[#1CA36E] to-[#0A3D29] rounded-xl relative overflow-hidden">
        {/* background image */}

        <div className="absolute  flex items-center gap-2 w-full justify-between">
          <img className="w-[100px]" src="/left_radar.png" alt="" />

          <img className="w-[100px]" src="/right_radar.png" alt="" />
        </div>

        {/* Main Content */}

        <div className="absolute p-5 text-white w-full h-full flex items-center justify-center">
          <div className="w-full  flex flex-col items-center justify-center">
            <div>
              <h3 className="text-xl text-gray-300">Current Balance</h3>
            </div>

            <div className="w-full flex items-center gap-2 justify-center mt-2">
              <div>
                <img className="w-8 h-8" src="/birr_icon.png" alt="" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">{formatBalance(balance)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

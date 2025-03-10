import BalanceCard from "../../components/Home/BalanceCard";
import UserHeader from "../../components/Home/UserHeader";
import { Actions } from "../../components/Home/Actions";

export default function Home() {
  return (
    <div className="w-full ">
      {/* Top Section */}

      <UserHeader />

      {/* Balance Section */}

      <BalanceCard />

      {/* Actions Section */}

      <Actions />
    </div>
  );
}

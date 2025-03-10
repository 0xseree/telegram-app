import { useGlobal } from "../../contexts/global";
import { NotificationIcon } from "../svg/NotificationIcon";

export default function UserHeader() {
  const { userData } = useGlobal();

  return (
    <div className="w-full flex justify-between items-center p-5">
      <div className="flex items-center gap-2">
        <div>
          <img className="w-10 h-10 rounded-full" src="/user_icon.png" alt="" />
        </div>

        <div>
          <h3 className="text-xl font-bold">
            Lance
          </h3>
          <p className="text-sm text-gray-500">You are Welcome!</p>
        </div>
      </div>

      <div>
        <NotificationIcon />
      </div>
    </div>
  );
}

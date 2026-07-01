import type { AccountRecord } from "@/shared/types";
import { getCountryFlag } from "@/shared/utils";

interface AccountBadgeProps {
  account: AccountRecord | null;
}

export default function AccountBadge({ account }: AccountBadgeProps) {
  if (!account) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 text-white px-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base shrink-0">
          {getCountryFlag(account.country)}
        </span>
        <div>
          <div className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {account.nickname}
          </div>
          <div className="text-[10px]">{account.playerId}</div>
        </div>
      </div>
    </div>
  );
}

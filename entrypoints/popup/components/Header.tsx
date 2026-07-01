import AccountBadge from "./AccountBadge";
import type { AccountRecord } from "@/shared/types";
import headerBg from "@/assets/app-header.png";
import logoSvg from "@/assets/app-logo.svg";

interface HeaderProps {
  account: AccountRecord | null;
}

function Header({ account }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between bg-black px-4 py-3 relative z-10"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={logoSvg}
        alt="Trainers Web Plus"
        className="h-6.5 -mt-2 w-auto"
        draggable={false}
      />
      <AccountBadge account={account} />
    </header>
  );
}

export default Header;

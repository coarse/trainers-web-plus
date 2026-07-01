import { getRelativeSyncedString } from "../utils/datetime";

interface FooterProps {
  lastSynced: number;
  eventCount: number;
  onClearData: () => void;
}

function Footer({ lastSynced, onClearData }: FooterProps) {
  return (
    <footer className="grid grid-cols-3 align-center justify-between bg-black text-white text-xs p-2">
      <span className="text-gray-400">v{__APP_VERSION__}</span>
      <span className="text-center">
        last synced: {getRelativeSyncedString(lastSynced)}
      </span>
      <div className="flex justify-end">
        <button
          className="text-gray-400 cursor-pointer hover:text-white"
          onClick={onClearData}
        >
          Clear Stored Data
        </button>
      </div>
    </footer>
  );
}

export default Footer;

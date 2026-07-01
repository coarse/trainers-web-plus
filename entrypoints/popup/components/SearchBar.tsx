import SearchIcon from "./SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute h-3.5 w-3.5 left-2.5 pointer-events-none text-gray-400" />
      <input
        type="text"
        className="w-full bg-white border border-gray-400 hover:border-gray-300 rounded-lg py-2 px-3 pl-8 text-xs outline-none transition-all duration-200 focus:border-[#0075C2] focus:ring-2 focus:ring-[#0075C2]"
        placeholder="Search by title, shop, or location..."
        value={value}
        onChange={(e: Event) => onChange((e.target as HTMLInputElement).value)}
      />
    </div>
  );
}

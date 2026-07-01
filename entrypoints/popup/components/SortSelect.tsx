interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="text-xs font-semibold px-2 py-1 rounded-lg border bg-white border-gray-400 hover:border-gray-300 text-gray-700 transition-all duration-200 outline-none cursor-pointer"
      value={value}
      onChange={(e: Event) => onChange((e.target as HTMLSelectElement).value)}
    >
      <option value="date-asc">Soonest Date</option>
      <option value="date-desc">Latest Date</option>
    </select>
  );
}

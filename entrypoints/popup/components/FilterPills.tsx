import { STATUS_FILTERS } from "@/shared/data";

interface FilterPillsProps {
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

export default function FilterPills({
  selectedStatus,
  onStatusChange,
}: FilterPillsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto">
      {STATUS_FILTERS.map((status) => {
        const active = selectedStatus === status.value;
        return (
          <label
            key={status.value}
            className="relative inline-flex items-center cursor-pointer peer"
          >
            <input
              type="radio"
              name="filter-status-group"
              value={status.value}
              checked={active}
              onChange={() => onStatusChange(status.value)}
              className="peer sr-only"
            />
            <span className="text-xs font-semibold px-2 py-1 rounded-lg border whitespace-nowrap transition-all duration-200 outline-none bg-white border-gray-400 hover:border-gray-300 hover:text-gray-500 peer-checked:text-white peer-checked:bg-gray-900  peer-checked:border-gray-900 peer-checked:hover:text-white peer-checked:hover:border-gray-900">
              {status.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

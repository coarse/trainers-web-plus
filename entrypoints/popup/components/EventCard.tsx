import clsx from "clsx/lite";
import ExternalLinkIcon from "./ExternalLinkIcon";
import type { RegisteredEvent } from "@/shared/types";
import { BASE_URL } from "@/shared/data";
import { getStatusText } from "@/shared/utils";

interface EventCardProps {
  event: RegisteredEvent;
  onViewDetails?: (url: string) => void;
}

export default function EventCard({ event, onViewDetails }: EventCardProps) {
  const newLocal = "w-3.5 mt-[2px] text-center flex-shrink-0";
  return (
    <div
      className={clsx(
        "border-y border-r border-gray-300 rounded-r-lg p-3 flex flex-col gap-2 transition-all duration-200 border-l-4",
        event.status === "entered" && "border-l-blue-500",
        (event.status === "elected" || event.status === "joined") &&
          "border-l-emerald-500",
        (event.status === "declined" || event.status === "waiting") &&
          "border-l-gray-950",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={clsx(
              "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
              event.status === "entered" && "text-blue-500 bg-blue-500/10",
              ["elected", "joined"].includes(event.status) &&
                "text-emerald-500 bg-emerald-500/10",
              ["declined", "waiting"].includes(event.status) &&
                "text-white bg-gray-950",
            )}
          >
            {getStatusText(event.status)}
          </span>
        </div>
        <div className="text-sm font-medium">
          📅 {event.date} at {event.time}
        </div>
      </div>

      <h3 className="text-base font-bold leading-tight line-clamp-2 m-0">
        {event.title}
      </h3>

      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-1.5 text-sm">
          <span className={newLocal}>🏪</span>
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            title={event.organizer}
          >
            {event.organizer}
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-sm">
          <span className="w-3.5 mt-0.5 text-center shrink-0">📍</span>
          <span
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            title={event.place}
          >
            {event.place}
          </span>
        </div>
      </div>

      <div className="flex justify-end border-t border-gray-400 pt-2 mt-1">
        <button
          className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-400 rounded-lg px-2 py-1 whitespace-nowrap transition-all duration-200 outline-none bg-white hover:border-gray-300 hover:text-gray-500 cursor-pointer"
          onClick={() => onViewDetails?.(`${BASE_URL}${event.url}`)}
        >
          View Details
          <ExternalLinkIcon className="h-2.5 w-2.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}

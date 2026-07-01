import pokeballSvg from "@/assets/pokeball.svg";

interface EmptyStateProps {
  query?: string;
}

export default function EmptyState({ query }: EmptyStateProps) {
  const message = query
    ? `No events found for "${query}". Try adjusting your search.`
    : "Try adjusting your filters or search query.";

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center overflow-y-auto">
      <div className="text-4xl mb-3">
        <img
          src={pokeballSvg}
          alt="Trainers Web Plus"
          className="h-20 -mt-2 w-auto"
          draggable={false}
        />
      </div>
      <h3 className="text-base font-bold text-gray-700 m-0 mb-1.5">
        No matching events
      </h3>
      <p className="text-sm text-gray-900 m-0 mb-5 max-w-[320px] leading-relaxed">
        {message}
      </p>
    </div>
  );
}

/**
 * EmptyState — shown when a list has no items (e.g. search returns nothing).
 */

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gray-800/60 border border-white/10 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm">{description}</p>
    </div>
  );
}

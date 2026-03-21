/**
 * LoadingSpinner — reusable loading indicator with optional text.
 */

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
      </div>
      <p className="text-gray-400 text-sm animate-pulse">{text}</p>
    </div>
  );
}

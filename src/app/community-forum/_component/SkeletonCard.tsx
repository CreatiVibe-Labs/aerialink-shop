// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl bg-[#FFFDFA] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  );
}
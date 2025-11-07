// components/SkeletonGrid.tsx

import SkeletonCard from "./SkeletonCard";


interface SkeletonGridProps {
  count?: number;
}

export default function SkeletonGrid({ count = 10 }: SkeletonGridProps) {
  return (
    <div className="grid xl:grid-cols-5 grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

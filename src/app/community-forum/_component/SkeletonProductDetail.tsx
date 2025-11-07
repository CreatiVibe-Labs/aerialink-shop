// components/SkeletonProductDetail.tsx
export default function SkeletonProductDetail() {
  return (
    <div className="rounded-xl flex xl:flex-row flex-col bg-[#FFFDFA] p-2 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] animate-pulse">
      <div className="flex xl:max-w-[30%] max-w-full gap-5 items-center">
        <div className="w-28 h-28 bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div className="border-l xl:border-t-0 border-[#D9D9D9] xl:max-w-[4%] w-full min-[360px]:max-w-full min-[360px]:border-t-1 min-[360px]:my-3"></div>
      <div className="max-w-[66%] min-[360px]:max-w-full flex flex-col gap-3 flex-1 p-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
}
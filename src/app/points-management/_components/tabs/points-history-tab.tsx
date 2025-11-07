import LoadButton from "@/components/common/load-button";
import TableList from "../table-list";

const PointsHistoryTab = () => {
  // Sample data for the table (you can replace this with dynamic data)
  const historyData = [
    {
      id: 1,
      date: "01-02-2025",
      points: +500,
      description: "Daily Login Reward",
    },
    { id: 2, date: "01-02-2025", points: -500, description: "Coupon Redeem" },
    {
      id: 3,
      date: "01-02-2025",
      points: +500,
      description: "Daily Login Reward",
    },
    { id: 4, date: "01-02-2025", points: -500, description: "Coupon Redeem" },
    {
      id: 5,
      date: "01-02-2025",
      points: +500,
      description: "Daily Login Reward",
    },
    { id: 6, date: "01-02-2025", points: -500, description: "Coupon Redeem" },
    {
      id: 7,
      date: "01-02-2025",
      points: +500,
      description: "Daily Login Reward",
    },
    { id: 8, date: "01-02-2025", points: -500, description: "Coupon Redeem" },
    {
      id: 9,
      date: "01-02-2025",
      points: +500,
      description: "Daily Login Reward",
    },
    { id: 10, date: "01-02-2025", points: -500, description: "Coupon Redeem" },
  ];

  return (
    <div className="max-w-7xl max-2xl:w-full mx-auto px-4 max-md:px-0">
      {/* Custom Table Container */}
      <div className="rounded-xl p-4 overflow-x-auto max-md:p-1 max-md:text-sm max-sm:text-xs ">
        {/* Header Row */}
        <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-2 bg-primary text-white p-2 max-md:py-1 mb-2 rounded-lg">
          <div className="p-2 font-semibold">S.No</div>
          <div className="p-2 font-semibold">Date</div>
          <div className="p-2 font-semibold">Points</div>
          <div className="p-2 font-semibold max-sm:hidden">Description</div>
        </div>

        {/* Data Rows */}
        <div className="space-y-2">
          {historyData.map((item, index) => (
            <TableList
              id={item.id}
              date={item.date}
              points={item.points}
              description={item.description}
              key={item.id}
            />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-4 max-md:mt-0">
        <LoadButton onClick={() => {}} className="mt-5" />
      </div>
    </div>
  );
};

export default PointsHistoryTab;

import ShowroomProductSelection from "./_component/ProductSelection";

export default function VirtualShowroom() {
  return (
    <>
      <div className="mb-10 max-2xl: gap-x-1 min-h-screen max-w-7xl w-full mx-auto  mt-7">
        <h1 className="xl:text-6xl md:text-4xl text-2xl  xl:mt-10 font-black text-center text-primary uppercase">
          360° virtual tour
        </h1>
        <p className="xl:text-2xl md:text-xl text-[#AFB1AE] text-center xl:px-70 md:px-20 mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tincidunt euismod ante. Vivamus placerat at enim non condimentum.
          Donec sit amet mauris purus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit
        </p>
        {/* Select Product Card */}
        <ShowroomProductSelection />
      </div>
    </>
  );
}

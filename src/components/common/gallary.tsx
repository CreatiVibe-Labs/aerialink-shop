import Image from "next/image";

const Gallery = () => {
  const images = [
    "/assets/about/gallaryimage1.jpg",
    "/assets/about/gallaryimage2.jpg",
    "/assets/about/gallaryimage3.jpg",
    "/assets/about/gallaryimage4.jpg",
    "/assets/about/gallaryimage5.png",
    "/assets/about/gallaryimage6.jpg",
    "/assets/about/gallaryimage7.jpg",
    "/assets/about/gallaryimage8.png",
  ];

  return (
    <section className="w-full max-w-7xl pb-10 m-auto ">
      <div className="flex flex-row items-center gap-[17.78px] mb-[31px]">
        {/* Vertical Bar */}
        <div className="w-[22.22px] h-[44.44px] rounded-[4.44px] bg-[#98C1A9] "></div>

        {/* Heading */}
        <h2 className="text-[24px] font-semibold leading-[22.22px] text-[#666664] font-poppins">
          Our Gallery
        </h2>
      </div>

      {/* Masonry layout using Tailwind columns */}
      <div className="flex flex-wrap justify-start gap-5">
        {images.map((src, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg sm: ${
              i === 0 || i === 1 || i === 4 || i === 5 || i === 6 || i === 7
                ? "w-[29%]"
                : "w-[39%]"
            }`}
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              width={1000}
              height={1000}
              className="h-[321px] object-cover rounded-lg w-full object-center"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export { Gallery };

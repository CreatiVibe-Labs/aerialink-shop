"use client";
import Image from "next/image";

const cardsData = [
  {
    id: 1,
    image: "/assets/account/card1.png",
    title: "Messages",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent?",
    buttonText: "View",
    buttonWidth: "w-[89px]",
  },
  {
    id: 2,
    image: "/assets/account/card2.png",
    title: "Contact Us",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent?",
    buttonText: "Contact Now",
    buttonWidth: "w-[132px]",
  },
  {
    id: 3,
    image: "/assets/account/card3.png",
    title: "FAQs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent?",
    buttonText: "Read More",
    buttonWidth: "w-[120px]",
  },
  {
    id: 4,
    image: "/assets/account/card4.png",
    title: "Submit Complaint",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent?",
    buttonText: "submit your complaint",
    buttonWidth: "w-[189px]",
  },
];

export default function ProfileCardsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto lg:py-10 py-2">
      <div
        className="
          grid 
          grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
          gap-4 lg:gap-6
        "
      >
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="
              bg-[#fdfdfd] rounded-[14px] 
              flex flex-col justify-between p-4 lg:p-[18px]
              transition-all duration-200 shadow-lg
            "
          >
            {/* Image + Title + Desc */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row lg:flex-col gap-[10px] lg:gap-[10px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                <h3
                  className="
                  font-albert-sans font-semibold text-[20px] leading-[28px]
                  text-[#98C1A9]
                "
                >
                  {card.title}
                </h3>
              </div>
              <p
                className="
                  font-albert-sans text-[13px] leading-[17px] text-[#AFB1AE]
                
                "
              >
                {card.description}
              </p>
            </div>

            {/* Button */}
            <button
              className={`
                mt-4 flex items-center justify-center gap-2
                ${card.buttonWidth} h-[32px] lg:h-[32px]
                bg-[#98C1A9] text-white rounded-[10px]
                font-semibold text-[12px] 
                hover:bg-[#82ab94] transition-all cursor-pointer
              `}
            >
              {card.buttonText} &nbsp; →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

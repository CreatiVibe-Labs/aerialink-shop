import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const SidebarPoster: FC = () => {
  const POSTERS = [
    {
      src: "/assets/poster/poster-1.png",
      alt: "poster 1",
    },
    {
      src: "/assets/poster/poster-2.png",
      alt: "poster 2",
    },
    {
      src: "/assets/poster/poster-3.png",
      alt: "poster 3",
    },
    {
      src: "/assets/poster/poster-4.png",
      alt: "poster 4",
    },
  ];

  return (
    <Link href={'/redirect'}>
      {POSTERS.map((item, index) => (
        <div className="min-h-36 relative mb-4" key={index}>
          <Image
            fill
            src={item.src}
            alt={item.alt}
            className="object-cover rounded-xl"
          />
        </div>
      ))}
    </Link>
  );
};

export default SidebarPoster;

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const SidebarPoster: FC = () => {
  const POSTERS = [
    {
      src: "/assets/poster/poster-1.png",
      alt: "poster 1",
      link: "/redirect"
    },
    {
      src: "/assets/poster/poster-2.png",
      alt: "poster 2",
      link: "/redirect"
    },
    {
      src: "/assets/poster/poster-3.png",
      alt: "poster 3",
      link: "/redirect"
    },
    {
      src: "/assets/poster/poster-4.png",
      alt: "poster 4",
      link: "/redirect"
    },
  ];

  return (
    <>

      {POSTERS.map((item, index) => (
        <Link href={item.link} key={index}>
          <div className="min-h-36 relative">
            <Image
              fill
              src={item.src}
              alt={item.alt}
              className="object-cover rounded-xl"
            />
          </div>
        </Link>
      ))} 
    </>
  );
};

export default SidebarPoster;

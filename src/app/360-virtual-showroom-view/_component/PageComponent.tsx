"use client";

import VirtualShowroom360 from "@/app/360-virtual-showroom/_component/VirtualShowroom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageComponent() {
  const router = useRouter();

  const [data, setData] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [wallImages, setWallImages] = useState("");
  const [corsFloorImage, setCorsFloorImage] = useState<string>("");

  useEffect(() => {
    const productInfoString = sessionStorage.getItem("productInfo");
    console.log({ productInfoString });
    if (productInfoString) {
      try {
        const data = JSON.parse(productInfoString);
        setData(true);
        setProductImage(data.activeProduct?.floor_image || "");
        setWallImages(data.selectedImages || []);
      } catch (error) {
        console.error("Error parsing sessionStorage JSON:", error);
      }
    } else {
      router.push("/360-virtual-showroom");
      console.warn('SessionStorage "productInfo" not found.');
    }
  }, []); // run once on client

  // Fetch CORS-enabled floor image
  useEffect(() => {
    const fetchCorsFloorImage = async () => {
      if (!productImage) {
        setCorsFloorImage("");
        return;
      }

      try {
        const storagePath = productImage.replace(
          "https://dashboard.aerialinkshop.jp/storage/",
          ""
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cors-storage/${storagePath}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch CORS image:", response.status);
          setCorsFloorImage(productImage); // Fallback to original
          return;
        }

        // Convert response to blob and create object URL
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        console.log("CORS floor image loaded:", blobUrl);
        setCorsFloorImage(blobUrl);

      } catch (error) {
        console.error("Error fetching CORS floor image:", error);
        setCorsFloorImage(productImage); // Fallback to original
      }
    };

    fetchCorsFloorImage();
  }, [productImage]);

  const handleClickBack = () => {
    sessionStorage.removeItem("productInfo");
    router.push("/360-virtual-showroom");
  };

  return (
    <>
      <div className="flex justify-between xl:items-center lg:items-center md:items-center min-[360px]:items-start gap-5 mt-10 xl:flex-row lg:flex-row md:flex-row min-[360px]:flex-col">
        <div className="w-full flex gap-5 items-stretch">
          <div className="p-2 bg-[#98C1A9] rounded-sm"></div>
          <h1 className="font-black text-3xl text-[#666664] uppercase min-[360px]:text-2xl">
            360° virtual preview
          </h1>
        </div>
        <div className="w-full text-right flex justify-end">
          <span
            onClick={() => handleClickBack()}
            className="cursor-pointer flex items-center justify-end gap-3 text-[#666664] text-[20px] text-right w-full"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.00056 3.57031L0.714844 7.85603L5.00056 12.1417"
                stroke="#666664"
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.2863 16.4269V13.5698C19.2863 12.0542 18.6842 10.6008 17.6126 9.52914C16.541 8.45751 15.0875 7.85547 13.572 7.85547H0.714844"
                stroke="#666664"
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back To Selection
          </span>
        </div>
      </div>
      <div className="">
        {data == true && corsFloorImage != "" && wallImages != "" && (
          <div>
            <VirtualShowroom360
              floorImage={corsFloorImage}
              height={"80vh"}
              wallImages={wallImages}
            />
          </div>
        )}
      </div>
    </>
  );
}

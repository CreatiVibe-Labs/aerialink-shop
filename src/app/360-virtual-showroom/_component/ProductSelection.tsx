"use client";

import { useState, ChangeEvent, Suspense, useEffect } from "react";
import Image from "next/image";
import VirtualShowroom360 from "./VirtualShowroom";
import { useRouter, useSearchParams } from "next/navigation";
import imageCompression from "browser-image-compression";
import { useLanguage } from "@/contexts/language-context";
import { useProducts } from "@/contexts/product-context";
import { Product } from "@/contexts/types-and-interfaces/product";

export default function ShowroomProductSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const { state: { products } } = useProducts();
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(0);

  // Check for productId in URL query parameters and set it as selected
  useEffect(() => {
    const productId = searchParams.get('productId');
    if (productId) {
      setSelectedProduct(parseInt(productId, 10));
    }
  }, [searchParams]);

  const handleFileChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    const updatedImages = [...selectedImages];
    updatedImages[index] = file;
    setSelectedImages(updatedImages);
  };

  // Always use all products
  const activeProduct = products.find(
    (p) => p.id === selectedProduct
  );

  const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const handleFullScreen = async () => {
    sessionStorage.removeItem("productInfo");
    const compressedFiles = await Promise.all(
      selectedImages.map((file) => compressImage(file!))
    );
    const base64Images = await Promise.all(
      compressedFiles.map((file) => fileToBase64(file))
    );

    const dataToStore = {
      selectedImages: base64Images,
      selectedProduct,
      activeProduct,
    };

    sessionStorage.setItem("productInfo", JSON.stringify(dataToStore));
    router.push("/360-virtual-showroom-view");
  };

  const productTitle =
    language == "EN"
      ? activeProduct?.title_en
      : activeProduct?.title_jp;
  return (
    <>
      <div className="w-full">
        <div
          className={`max-w-[500px] flex flex-col items-center mx-auto p-5 ${selectedProduct != 0 ? "" : "pt-15 gap-5"
            } mt-10 bg-[#FFFDFA] rounded-lg shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]`}
        >
          {selectedProduct == 0 && (
            <>
              <Image
                src={"/assets/common/ecommerce-logo.png"}
                width={500}
                height={500}
                alt="logo"
                className="w-24 h-auto object-cover"
              />
              <p className="xl:text-5xl text-3xl xl:mt-4 text-center text-[#686868] font-bold">
                Select a Product
              </p>
            </>
          )}
          {selectedProduct != 0 && (
            <>
              <Image
                src={
                  activeProduct?.images[0].url ||
                  "/assets/common/placeholder.png"
                }
                width={500}
                height={500}
                alt={productTitle || "Product image"}
                className="w-64 h-auto object-cover"
              />
              <p className="xl:text-lg text-md text-center text-[#686868] line-clamp-1">
                {productTitle}
              </p>
            </>
          )}
          <button
            className="xl:mt-10 mt-5 max-w-[480px] py-3 w-full rounded-lg border-1 border-[#98C1A9] transition-all bg-[#98C1A9] text-white cursor-pointer hover:bg-[white] hover:text-[#98C1A9]"
            onClick={() => setOpenPopup(true)}
          >
            {selectedProduct != 0 ? "Change" : "Select"}
          </button>
        </div>
      </div>
      {/* Media Uploader */}
      <div className="flex xl:flex-row md:flex-row flex-col xl:gap-10 gap-5 xl:mt-20 mt-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="relative w-full h-60">
            {/* Remove Button */}
            {selectedImages[index] && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedImages = [...selectedImages];
                  updatedImages[index] = null;
                  setSelectedImages(updatedImages);
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black z-10 shadow cursor-pointer"
              >
                ×
              </button>
            )}

            <label className="w-full h-full border-2 border-dashed border-[#98C1A9] rounded-lg cursor-pointer flex flex-col items-center justify-center text-center transition gap-3">
              {selectedImages[index] ? (
                <img
                  src={URL.createObjectURL(selectedImages[index]!)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3133_26078)">
                      <path
                        d="M0.765625 16.001V17.5249C0.765625 18.3332 1.08674 19.1085 1.65832 19.68C2.2299 20.2516 3.00513 20.5727 3.81346 20.5727H17.5287C18.3371 20.5727 19.1123 20.2516 19.6839 19.68C20.2555 19.1085 20.5766 18.3332 20.5766 17.5249V16.001"
                        stroke="#B9E2D4"
                        strokeWidth="1.52392"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.09766 6.09641L10.6694 0.762695L15.2412 6.09641"
                        stroke="#B9E2D4"
                        strokeWidth="1.52392"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.6758 0.762695V14.478"
                        stroke="#B9E2D4"
                        strokeWidth="1.52392"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3133_26078">
                        <rect width="21.3349" height="21.3349" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <h3 className="text-3xl text-[#B9E2D4]">Upload photo</h3>
                  <p className="text-sm text-[#B9E2D4]">
                    {index === 0 && <span>(left side wall)</span>}
                    {index === 1 && <span>(right side wall)</span>}
                    {index === 2 && <span>(back side wall)</span>}
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onClick={(e) => (e.currentTarget.value = "")}
                onChange={(e) => handleFileChange(index, e)}
              />
            </label>
          </div>
        ))}
      </div>

      {/* 360 Preview */}
      <div>
        {selectedProduct != 0 &&
          selectedImages.length === 3 &&
          selectedImages.every((image) => image !== null) && (
            <div className="flex flex-col items-center gap-2">
              {
                // Debug info or additional UI elements can be added here
                activeProduct?.floor_image && (
                  <Suspense>
                    <VirtualShowroom360
                      floorImage={
                        activeProduct?.floor_image || "/assets/floors/floor1.jpg"
                      }
                      height={"350px"}
                      wallImages={
                        selectedImages.map((image) =>
                          URL.createObjectURL(image!)
                        ) as [string, string, string]
                      }
                    />
                  </Suspense>
                )
              }

              <button
                onClick={() => handleFullScreen()}
                className="xl:mt-10 mt-5 max-w-[480px] py-3 w-full rounded-lg border-1 border-[#98C1A9] transition-all bg-[#98C1A9] text-white cursor-pointer hover:bg-[white] hover:text-[#98C1A9]"
              >
                View 360° in Full Screen
              </button>
            </div>
          )}
      </div>

      {openPopup && (
        <>
          <div className="background bg-[#666664]/60 fixed top-0 left-0 w-full h-screen z-100"></div>

          <div className="popupWrapper fixed top-0 left-0 w-full h-screen z-110 overflow-auto flex items-center justify-center py-10">
            <div className="popupContent max-w-[700px] w-full relative rounded-lg p-5 bg-[#FFFDFA] shadow-lg max-h-[90vh] overflow-auto">
              <div
                onClick={() => setOpenPopup(false)}
                className="close cursor-pointer absolute top-3 right-3"
              >
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32.0855"
                    cy="32.0855"
                    r="22.8599"
                    stroke="#999999"
                    strokeWidth="2.40836"
                  />
                  <path
                    d="M24.0645 40.1072L32.0858 32.0858M40.1072 24.0645L32.0843 32.0858M32.0843 32.0858L24.0645 24.0645M32.0858 32.0858L40.1072 40.1072"
                    stroke="#999999"
                    strokeWidth="5.34757"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="popupBody mt-20">
                {products.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No products available</p>
                  </div>
                ) : (
                  <div className="grid xl:grid-cols-3 grid-cols-2  gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={`p-4 rounded-xl text-center cursor-pointer bg-[#FFFDFA] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] transition-transform duration-300 ease-in-out ${selectedProduct == product.id ? "scale-105" : ""
                          }`}
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setOpenPopup(false);
                        }}
                      >
                        {product.images[0]?.url && (
                          <Image
                            src={product.images[0].url}
                            alt={
                              language == "EN"
                                ? product.title_en
                                : product.title_jp
                            }
                            width={500}
                            height={500}
                            className="mx-auto w-50 object-cover rounded"
                          />
                        )}
                        <p className="text-[#666664] text-sm line-clamp-1">
                          {language == "EN"
                            ? product.title_en
                            : product.title_jp}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

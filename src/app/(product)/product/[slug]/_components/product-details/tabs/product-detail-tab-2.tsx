// "use client";
// import { useLanguage } from "@/contexts/language-context";
// import { useProducts } from "@/contexts/product-context";
// import React from "react";

// // Skeleton for Description Tab
// const DescriptionSkeleton = () => (
//   <div className="flex flex-col space-y-8 animate-pulse">
//     {/* First Section */}
//     <div className="w-full md:w-4/5">
//       <div className="mt-3 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-full"></div>
//         <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//         <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//       </div>
//     </div>
//   </div>
// );

// const ProductDetailTab2 = () => {
//   const { state } = useProducts();
//   const { language } = useLanguage();
//   const { product, productLoading } = state;

//   // Show skeleton while loading
//   if (productLoading) return <DescriptionSkeleton />;

//   const productFinal = {
//     productDetails:
//       language === "EN" ? product?.translations.en : product?.translations.jp,
//   };

//   if (!product) return <p className="text-gray-500">No product data.</p>;

//   const description = productFinal.productDetails?.description;

//   if (!description || description.trim() === "") {
//     return <p className="text-gray-500">No description available.</p>;
//   }

//   return (
//     <div className="flex flex-col text-min-gray space-y-8">
//       {/* Description HTML */}
//       <div
//         className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
//         dangerouslySetInnerHTML={{
//           __html: description,
//         }}
//       />
//     </div>
//   );
// };

// export default ProductDetailTab2;

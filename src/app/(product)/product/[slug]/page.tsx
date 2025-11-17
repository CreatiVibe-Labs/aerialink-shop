import { useParams } from 'next/navigation'
import React from 'react'
import ProductExplore from './_components/product-explore';
import ProductExploreDetailSection from './_components/product-details/product-explore-detail-section';
import OtherProductSection from './_components/other-product-section';

function ProductInnerPage() {
 
  return (
    <div className='w-full pb-10  max-lg:px-3 h-full max-md:py-5'>
      <ProductExplore/>
      <ProductExploreDetailSection/>
      <OtherProductSection/>
    </div>
  )
}

export default ProductInnerPage
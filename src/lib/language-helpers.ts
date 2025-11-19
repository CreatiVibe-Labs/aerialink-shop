/**
 * Get product title with fallback to English if Japanese version is not available
 */
export function getProductTitle(
  titleEn: string | null | undefined,
  titleJp: string | null | undefined,
  language: string
): string {
  if (language === 'EN' || language === 'en') {
    return titleEn || titleJp || 'Product';
  }
  
  // Japanese selected but not available, fallback to English
  return titleJp || titleEn || 'Product';
}

/**
 * Get product description with fallback
 */
export function getProductDescription(
  descEn: string | null | undefined,
  descJp: string | null | undefined,
  language: string
): string {
  if (language === 'EN' || language === 'en') {
    return descEn || descJp || '';
  }
  
  return descJp || descEn || '';
}

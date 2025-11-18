/**
 * Convert storage URL to CORS-enabled URL for Canvas/WebGL usage
 * Use this for Three.js, Pannellum, or any Canvas-based image loading
 */
export function getCorsImageUrl(imageUrl: string): string {
  // If already using our CORS endpoint, return as is
  if (imageUrl.includes('/api/cors-storage/')) {
    return imageUrl;
  }

  // Extract the path after /storage/
  const storageMatch = imageUrl.match(/\/storage\/(.+)$/);
  
  if (storageMatch) {
    const path = storageMatch[1];
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    return `${baseUrl}/cors-storage/${path}`;
  }

  // If it's a local file or blob URL, return as is
  if (imageUrl.startsWith('blob:') || imageUrl.startsWith('/assets/')) {
    return imageUrl;
  }

  return imageUrl;
}

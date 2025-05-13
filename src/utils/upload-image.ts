'use server';

import { errorLogger } from './error';

const imageVariant = '/dex';

export async function uploadImage(images: File[]): Promise<{ error?: string; success: boolean; imgUrl?: string; imgId?: string }> {
  if (!images[0]) return errorLogger('No image to upload');
  const formData = new FormData();
  images.forEach(image => formData.append('file', image, image.name));
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_BEARER}`,
    },
    body: formData,
  };
  try {
    const response = await fetch(url, options);
    const responseJSON = (await response.json()) as unknown as CloudFlareResponse;
    console.log('responseJSON :', responseJSON);
    if (responseJSON.result) {
      const imgUrl = responseJSON.result.variants.find(imgUrl => imgUrl.endsWith(imageVariant));
      const imgId = responseJSON.result.id;
      if (!imgUrl) {
        return errorLogger('Image variant not found', 'Successful upload to cloudflare but could not find the right image variant. Check the Image variants from Cloudflare dashboard');
      }
      return { success: true, imgUrl, imgId };
    } else {
      const msg = 'Image could not upload CF';
      return errorLogger(msg, responseJSON);
    }
  } catch (e) {
    return errorLogger(e);
  }
}

type CloudFlareResponse = {
  result: { id: string; filename: string; variants: string[] } | null;
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
};

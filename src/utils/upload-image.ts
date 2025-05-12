'use server';

export async function uploadImage(images: File[]): Promise<{ error?: string; success: boolean; imgUrl?: string }> {
  if (!images[0]) return { error: 'No image to upload.', success: false };
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
    if (responseJSON.result) {
      const imgUrl = responseJSON.result.variants.find(imgUrl => imgUrl.endsWith('/dex'));
      if (!imgUrl) {
        const msg = 'Image uploaded but not found. Please contact support at +1-212-456-7890';
        console.error('Successful upload to cloudflare but could not find the right image variant. Check the variants from Cloudflare dashboard');
        return { error: msg, success: false };
      }
      return { success: true, imgUrl };
    } else {
      const msg = 'Image could not upload CF. Please contact support at +1-212-456-7890';
      console.error(msg);
      return { success: false, error: msg };
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return { success: false, error: e.message };
    }
    return {
      error: 'Unexpected error while uploading the image. Please contact support at +1-212-456-7890',
      success: false,
    };
  }
}

type CloudFlareResponse = {
  result: { id: string; filename: string; variants: string[] } | null;
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
};

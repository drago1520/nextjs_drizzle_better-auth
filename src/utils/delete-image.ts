'use server';
import { ErrorLogger, errorLogger } from './error';

export async function deleteImage(imageId: string): Promise<ErrorLogger | { success: true }> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`;
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_BEARER}`,
    },
  };
  try {
    const response = (await (await fetch(url, options)).json()) as CloudFlareResponse;
    if (!response.success) return errorLogger(response.errors[0].message);
    return { success: true };
  } catch (e) {
    return errorLogger(e);
  }
}

type CloudFlareResponse = {
  result: object;
  success: boolean;
  errors: { code: number; message: string }[];
  messages: { code: number; message: string }[];
};

import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

// Define CLOUDINARY_FOLDERS
const CLOUDINARY_FOLDERS = {
  ROOT: 'root',
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// Helper function to generate a signature for client-side uploads
export async function generateSignature(
  folder: string = CLOUDINARY_FOLDERS.ROOT,
) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Create the signature with the folder parameter
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET || '',
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  };
}

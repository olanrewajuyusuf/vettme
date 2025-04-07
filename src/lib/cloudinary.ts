// // export const uploadToCloudinary = async (file: File): Promise<string> => {
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     formData.append('upload_preset', 'vettmepro'); // Replace with your actual preset
  
// //     const response = await fetch('https://api.cloudinary.com/v1_1/ijm-global-limited/video/upload', {
// //       method: 'POST',
// //       body: formData,
// //     });
  
// //     if (!response.ok) {
// //       throw new Error('Failed to upload video');
// //     }
  
// //     const data = await response.json();
// //     return data.secure_url; // The URL of the uploaded video
// // };
// export const uploadToCloudinary = async (file: File, uploadPreset: string = 'vettmepro'): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', uploadPreset);

//     const response = await fetch('https://api.cloudinary.com/v1_1/ijm-global-limited/video/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text(); // Read error details
//       console.error('Cloudinary upload error:', errorText);
//       throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.secure_url; // Returns the uploaded video URL
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error);
//     throw new Error('An error occurred while uploading to Cloudinary');
//   }
// };

export const uploadToCloudinary = async (
  file: File, 
  uploadPreset: string = 'vettmepro', 
  resourceType: 'image' | 'video' = 'video'
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/ijm-global-limited/${resourceType}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload error:', errorText);
      throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('An error occurred while uploading to Cloudinary');
  }
};


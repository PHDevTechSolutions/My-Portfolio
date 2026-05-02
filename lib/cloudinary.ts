// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: "dxnk3mexu",
  apiKey: "", // Will be set via environment variable
  apiSecret: "HEE8DhZ2l5ATe4qs8PKy0ZgGUUg",
}

export function getCloudinaryUploadUrl() {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`
}

export function getCloudinaryImageUrl(publicId: string, options: { width?: number; height?: number; crop?: string } = {}) {
  const { width, height, crop = "fill" } = options

  let transformations = ""
  if (width) transformations += `w_${width},`
  if (height) transformations += `h_${height},`
  if (width || height) transformations += `c_${crop}`

  const transformString = transformations ? `${transformations}/` : ""

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformString}${publicId}`
}

// Upload image to Cloudinary
export async function uploadImageToCloudinary(
  file: File,
  folder: string = "portfolio-projects"
): Promise<{ url: string; publicId: string }> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "pkonstruct_unsigned") // Your existing Cloudinary preset
  formData.append("folder", folder)

  const response = await fetch(getCloudinaryUploadUrl(), {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary")
  }

  const data = await response.json()

  return {
    url: data.secure_url,
    publicId: data.public_id,
  }
}

// Upload project image with project ID
export async function uploadProjectImageToCloudinary(
  file: File,
  projectId: string
): Promise<string> {
  const result = await uploadImageToCloudinary(file, `portfolio-projects/${projectId}`)
  return result.url
}

export interface ImageData {
  id: string;
  top_left_x: number;
  top_left_y: number;
  bottom_right_x: number;
  bottom_right_y: number;
  image_base64: string;
}

export interface PageDimensions {
  dpi: number;
  height: number;
  width: number;
}

export interface PageData {
  index: number;
  markdown: string;
  images: ImageData[];
  dimensions: PageDimensions;
}

export interface UsageInfo {
  pages_processed: number;
  doc_size_bytes: number;
}

export interface ApiResponse {
  pages: PageData[];
  model: string;
  usage_info: UsageInfo;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5018/api/upload-pdf';

export async function processPdf(file: File): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    
    console.log('Uploading PDF:', file.name, 'Size:', file.size, 'bytes');

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      // Don't use credentials to avoid CORS issues with wildcard origins
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.error('Server response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to process PDF: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response:', data);
    return data;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

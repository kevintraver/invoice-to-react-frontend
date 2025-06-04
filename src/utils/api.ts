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

// Invoice-related interfaces
export interface ComponentMetadata {
  source: string;
  generatedAt: string;
  generator: string;
  imageType: string;
  imageSizeBytes: number;
}

export interface InvoiceComponent {
  name: string;
  code: string;
  metadata: ComponentMetadata;
}

export interface InvoiceUsageInfo {
  image_processed: boolean;
  image_size_bytes: number;
  image_type: string;
}

export interface InvoiceApiResponse {
  component: InvoiceComponent;
  model: string;
  usage_info: InvoiceUsageInfo;
}

// Check if VITE_API_URL already includes the full path
const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = VITE_API_URL && VITE_API_URL.includes('/mastra/') 
  ? VITE_API_URL.split('/mastra/')[0] 
  : VITE_API_URL || 'http://localhost:4111';

const PDF_API_URL = `${API_BASE_URL}/mastra/upload-pdf`;
const INVOICE_API_URL = `${API_BASE_URL}/mastra/invoice`;

export async function processPdf(file: File): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    
    console.log('Uploading PDF:', file.name, 'Size:', file.size, 'bytes');

    const response = await fetch(PDF_API_URL, {
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

export async function processInvoice(file: File): Promise<InvoiceApiResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    console.log('Uploading Invoice Image:', file.name, 'Size:', file.size, 'bytes');

    const response = await fetch(INVOICE_API_URL, {
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
      throw new Error(`Failed to process invoice: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received invoice response:', data);
    return data;
  } catch (error) {
    console.error('Error processing invoice:', error);
    throw error;
  }
}

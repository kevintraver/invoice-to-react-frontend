
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

export const processPdf = async (file: File): Promise<ApiResponse> => {
  // This function mocks the API call to the backend
  console.log(`Processing PDF: ${file.name} (${file.size} bytes)`);
  
  // Return a mock response after a delay to simulate processing
  return new Promise((resolve) => {
    // Simulate API processing time (2-4 seconds)
    const delay = 2000 + Math.random() * 2000;
    
    setTimeout(() => {
      // Mock response data
      const mockResponse: ApiResponse = {
        pages: [
          {
            index: 0,
            markdown: `# ${file.name.replace('.pdf', '')}
            
## Introduction

This is a sample blog post created from your PDF document. The content here represents what would be extracted from your actual PDF.

### What is this?

This is a demonstration of how your PDF content would be converted to a beautiful blog post format. In a real implementation, this markdown would contain the actual text extracted from your document.

- Point one about the content
- Another important point
- A final consideration

> "This is a sample quote that might appear in your document. Quotes are styled distinctly to make them stand out in the blog format."

You can share this blog post with others once it's generated, making it easy to distribute content that was previously locked in a PDF format.`,
            images: [
              {
                id: "img1",
                top_left_x: 50,
                top_left_y: 100,
                bottom_right_x: 250,
                bottom_right_y: 300,
                image_base64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNURFRkYiLz48cGF0aCBkPSJNMTAwIDUwQzExMC42MDkgNTAgMTIwLjc4MyA1My45NTI0IDEyOC4yODQgNjEuNzE1N0MxMzUuNzg2IDY5LjQ3ODkgMTQwIDgwIDEzOC41MzcgOTAuNTAzM0MxMzcuMDczIDEwMS4wMDcgMTM0IDExMSAxMjYuMDY5IDExOC4wNjlDMTE4LjEzOCAxMjUuMTM4IDEwNy42MjMgMTI4Ljc2IDk3LjExODggMTI3LjI5N0M4Ni42MTQyIDEyNS44MzMgNzcuMTAzOCAxMTkuNTI1IDcxLjIxMzMgMTEwLjI1NkM2NS4zMjI5IDEwMC45ODcgNjMuNTQ4NSA4OS42Mzg0IDY2LjMyMTEgNzkuMDMzNUM2OS4wOTM3IDY4LjQyODUgNzYuMTcyOSA1OS43Mzc4IDg1LjkxMyA1NC45NDg1Qzk1LjY1MzEgNTAuMTU5MSAxMDYuODc4IDQ5LjY4MTEgMTE2Ljk0OSA1My42MjczIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+"
              }
            ],
            dimensions: {
              dpi: 300,
              height: 792,
              width: 612
            }
          }
        ],
        model: "mistral-ocr-v1.0",
        usage_info: {
          pages_processed: 1,
          doc_size_bytes: file.size
        }
      };
      
      resolve(mockResponse);
    }, delay);
  });
};

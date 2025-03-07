
import { marked } from 'marked';

export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  
  // Configure marked options if needed
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // Parse the markdown to HTML
  return marked.parse(markdown);
};

// Function to sanitize HTML (basic implementation)
export const sanitizeHtml = (html: string): string => {
  // This is a simple implementation
  // In a production app, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '');
};


import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareWidgetProps {
  title: string;
}

const ShareWidget: React.FC<ShareWidgetProps> = ({ title }) => {
  const shareUrl = window.location.href;
  const shareText = `I turned my PDF into a Blog post with Mastra + Mistral OCR: ${title}`;
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: <Mail className="h-4 w-4" />,
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`Check out my blog post: ${shareUrl}`)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-xl overflow-hidden shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Share2 className="h-5 w-5 text-blog-purple mr-2" />
            <h3 className="text-lg font-medium">Share this blog post</h3>
          </div>
          <div className="text-xs text-muted-foreground">
            Created with Mastra + Mistral OCR
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-blog-light-purple hover:text-blog-purple transition-colors"
              onClick={() => window.open(link.url, '_blank')}
            >
              {link.icon}
              {link.name}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-blog-light-purple hover:text-blog-purple transition-colors"
            onClick={copyToClipboard}
          >
            <Link className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareWidget;

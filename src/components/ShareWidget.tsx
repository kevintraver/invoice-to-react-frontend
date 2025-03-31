import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link, Mail, Wind, CloudSun } from 'lucide-react';
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
        toast.success('Link copied to clipboard!', {
          style: { background: '#D6E5C0', border: '1px solid #5D7B6F', color: '#5D7B6F' },
          icon: <CloudSun className="h-5 w-5 text-ghibli-forest" />
        });
      })
      .catch(() => {
        toast.error('Failed to copy link', {
          style: { background: '#FFADAD', border: '1px solid #5D7B6F', color: '#5D7B6F' }
        });
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 ghibli-paper relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-10 z-0">
        <Wind className="h-20 w-20 text-ghibli-forest" style={{ transform: 'rotate(-10deg)' }} />
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Share2 className="h-5 w-5 text-ghibli-forest mr-2" />
            <h3 className="text-lg font-medium font-ghibli-display text-ghibli-forest">Share this blog post</h3>
          </div>
          <div className="text-xs text-ghibli-forest/60 font-ghibli-handwritten">
            Created with Mastra + Mistral OCR
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              className="ghibli-button-outline text-sm"
              onClick={() => window.open(link.url, '_blank')}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Button>
          ))}
          
          <Button
            className="ghibli-button-accent text-sm"
            onClick={copyToClipboard}
          >
            <Link className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareWidget;

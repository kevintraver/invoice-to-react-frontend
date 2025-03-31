import type { Config } from "tailwindcss";

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Studio Ghibli inspired color palette
        ghibli: {
          // Rich sky blue from "Castle in the Sky"
          'sky': '#71B6FF',
          // Vibrant deep sky blue from "Ponyo"
          'deep-sky': '#1D7BFD',
          // Saturated sunset orange from "Princess Mononoke"
          'sunset': '#FF9D5C',
          // Rich forest green from "Princess Mononoke"
          'forest': '#4E7A51',
          // Deep forest green from "Totoro"
          'deep-forest': '#2A544B',
          // Soft cream color from backgrounds
          'cream': '#FFF8E7',
          // Warm sand color from "Howl's Moving Castle" landscapes
          'sand': '#E8D4A9',
          // Soft blush pink from "Spirited Away"
          'blush': '#FFCAD4',
          // Rich blush from "The Wind Rises"
          'deep-blush': '#E66A94',
          // Warm tea color from various Ghibli films
          'tea': '#D0B49F',
          // Rich earthy brown from "Princess Mononoke"
          'earth': '#7D5A50',
          // Vibrant spring green from "Totoro"
          'spring': '#8ED081',
          // Rich ocean blue from "Ponyo"
          'ocean': '#1DAEFD',
          // Vibrant sunset pink from "Spirited Away"
          'sunset-pink': '#FF7BA5',
          // Magical purple from "Spirited Away"
          'magic': '#9A7DEF',
          // Golden yellow from "Castle in the Sky"
          'golden': '#FFDE59',
          // Rich red from "Princess Mononoke"
          'blood': '#D83A3A',
          // Deep night blue from "Howl's Moving Castle"
          'night': '#141E46',
          // Soft cloud white
          'cloud': '#FFFFFF',
        },
        // Keep the old blog colors for backward compatibility
        blog: {
          purple: '#8B5CF6',
          'light-purple': '#E5DEFF',
          orange: '#F97316',
          'light-orange': '#FFEDD5',
          'blog-bg': '#FCFAFF'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'xl': '1rem',
        'xxl': '1.5rem',
        'organic': '30% 70% 70% 30% / 30% 30% 70% 70%'  // Organic shape for Ghibli-style elements
      },
      boxShadow: {
        'ghibli': '0 4px 20px -2px rgba(93, 123, 111, 0.25)',
        'ghibli-hover': '0 8px 30px -2px rgba(93, 123, 111, 0.35)',
        'ghibli-intense': '0 10px 40px -3px rgba(93, 123, 111, 0.5)',
        'inner-ghibli': 'inset 0 2px 8px 0 rgba(93, 123, 111, 0.1)',
        'ghibli-magical': '0 12px 30px rgba(154, 125, 239, 0.2), 0 4px 8px rgba(154, 125, 239, 0.1)',
      },
      backgroundImage: {
        'ghibli-gradient': 'linear-gradient(to right, #71A6D2, #BAD7F2)',
        'forest-gradient': 'linear-gradient(to bottom, #5D7B6F, #7FA480)',
        'sunset-gradient': 'linear-gradient(135deg, #FFCB77, #FFC09F)',
        'cream-gradient': 'linear-gradient(to bottom, #F9F7E8, #E4D6C1)',
        'cloud-pattern': "url('/images/cloud-pattern.png')",
        'paper-texture': "url('/images/paper-texture.png')"
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        // New Ghibli-inspired animations
        'sway': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-6px) rotate(3deg)' }
        },
        'clouds-drift': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '0.4', filter: 'brightness(100%)' },
          '50%': { opacity: '1', filter: 'brightness(120%)' }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-6px) rotate(3deg)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "dust": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.2" },
          "25%": { transform: "translateY(-8px) translateX(5px)", opacity: "0.4" },
          "50%": { transform: "translateY(-15px) translateX(10px)", opacity: "0.2" },
          "75%": { transform: "translateY(-20px) translateX(5px)", opacity: "0.1" },
          "100%": { transform: "translateY(-30px) translateX(0)", opacity: "0" },
        },
        "dust-delayed": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.2" },
          "30%": { transform: "translateY(-10px) translateX(-5px)", opacity: "0.3" },
          "60%": { transform: "translateY(-20px) translateX(-10px)", opacity: "0.2" },
          "100%": { transform: "translateY(-30px) translateX(-5px)", opacity: "0" },
        },
        "dust-fast": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.2" },
          "40%": { transform: "translateY(-15px) translateX(8px)", opacity: "0.3" },
          "100%": { transform: "translateY(-30px) translateX(0)", opacity: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "magic-sparkle": {
          "0%, 100%": { 
            transform: "scale(1) rotate(0deg)",
            opacity: "0.8" 
          },
          "25%": { 
            transform: "scale(1.1) rotate(5deg)",
            opacity: "1" 
          },
          "50%": { 
            transform: "scale(0.9) rotate(-5deg)",
            opacity: "0.6" 
          },
          "75%": { 
            transform: "scale(1.2) rotate(10deg)",
            opacity: "0.9" 
          },
        },
        "leaf-fall": {
          "0%": { 
            transform: "translateY(0) translateX(0) rotate(0deg)",
            opacity: "0.9"
          },
          "25%": { 
            transform: "translateY(20px) translateX(10px) rotate(45deg)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "translateY(40px) translateX(-5px) rotate(90deg)",
            opacity: "0.7"
          },
          "75%": { 
            transform: "translateY(60px) translateX(5px) rotate(135deg)",
            opacity: "0.6"
          },
          "100%": { 
            transform: "translateY(80px) translateX(0) rotate(180deg)",
            opacity: "0.2"
          },
        },
        "color-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(15deg)" },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        // New Ghibli-inspired animations
        'sway': 'sway 6s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 5s ease-in-out infinite',
        'clouds-drift': 'clouds-drift 30s linear infinite',
        'sparkle': 'sparkle 4s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-in-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "float": "float 8s ease-in-out infinite",
        "float-delayed": "float-delayed 10s ease-in-out infinite",
        "bounce-slow": "bounce-slow 6s ease-in-out infinite",
        "gentle-bounce": "gentle-bounce 5s ease-in-out infinite",
        "sway": "sway 5s ease-in-out infinite",
        "spin-slow": "spin-slow 15s linear infinite",
        "dust": "dust 8s ease-out infinite",
        "dust-delayed": "dust-delayed 10s ease-out infinite",
        "dust-fast": "dust-fast 6s ease-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "magic-sparkle": "magic-sparkle 3s ease-in-out infinite",
        "leaf-fall": "leaf-fall 10s ease-in-out infinite",
        "color-shift": "color-shift 8s ease-in-out infinite",
      },
      fontFamily: {
        'ghibli': ['"Atkinson Hyperlegible"', 'sans-serif'],
        'ghibli-display': ['"Mochiy Pop One"', 'sans-serif'],
        'ghibli-handwritten': ['"Caveat"', 'cursive'],
        sans: ["var(--font-sans)", "Avenir", "Helvetica", "Arial", "sans-serif"],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

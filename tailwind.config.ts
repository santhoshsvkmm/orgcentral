import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em' }],   // 12px
      sm: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.005em' }],  // 14px
      base: ['0.9375rem', { lineHeight: '1.5rem', letterSpacing: '0' }],        // 15px
      lg: ['1.0625rem', { lineHeight: '1.625rem', letterSpacing: '-0.005em' }], // 17px
      xl: ['1.1875rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  // 19px
      '2xl': ['1.375rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }], // 22px
      '3xl': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],  // 28px
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }], // 36px
      '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],  // 48px
      '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }], // 60px
      '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],  // 72px
      '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.045em' }], // 96px
      '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],  // 128px
    },
    extend: {
      fontFamily: {
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        headline: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-sidebar': 'var(--gradient-sidebar)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'card': '0 1px 3px rgb(0 0 0 / 0.04), 0 4px 12px rgb(0 0 0 / 0.06), 0 0 0 1px hsl(var(--border) / 0.5)',
        'card-hover': '0 4px 16px rgb(0 0 0 / 0.08), 0 8px 32px hsl(var(--primary) / 0.1)',
        'nav': '0 1px 0 hsl(var(--border))',
        'sidebar-item': '0 1px 4px hsl(var(--primary) / 0.25)',
        'glow': '0 0 20px hsl(var(--primary) / 0.35), 0 0 40px hsl(var(--primary) / 0.15)',
        'glow-sm': '0 0 12px hsl(var(--primary) / 0.3)',
        'inner-glow': 'inset 0 1px 0 hsl(var(--primary-foreground) / 0.1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.2)' },
        },
        'slide-up-fade': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up-fade': 'slide-up-fade 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

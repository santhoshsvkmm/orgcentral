import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { PageLoader } from '@/components/layout/page-loader';
import { JotaiProvider } from '@/components/jotai-provider';
import { IntlProviderWrapper } from '@/components/intl-provider-wrapper';
export const metadata: Metadata = {
  title: 'OrgCentral Simplified',
  description: 'Simplified Organizational Management Tool',
};

// Helper function to load messages
async function getMessages(locale: string) {
  try {
    return (await import(`../i18n/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    return {}; // Fallback to empty object if messages are not found
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // You can implement logic here to get the locale from headers or cookies
  const locale = "en";
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
 <JotaiProvider>
 <IntlProviderWrapper>
 {children}
 </IntlProviderWrapper>
 <PageLoader />
 <Toaster />
 </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
'use client';

import { IntlProvider } from 'react-intl';
import { ReactNode, useEffect, useState } from 'react';

// Helper function to dynamically import messages
const getMessages = async (locale: string) => {
  try {
    const messages = await import(`@/i18n/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to default locale messages (e.g., English)
    const defaultMessages = await import('@/i18n/en.json');
    return defaultMessages.default;
  }
};

interface IntlProviderWrapperProps {
  children: ReactNode;
}

export function IntlProviderWrapper({ children }: IntlProviderWrapperProps) {
  const [locale, setLocale] = useState('en'); // Default locale
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Get the locale from the html lang attribute on the client side
    const htmlLang = document.documentElement.lang;
    setLocale(htmlLang);

    // Load messages for the determined locale
    const loadMessages = async () => {
      const loadedMessages = await getMessages(htmlLang);
      setMessages(loadedMessages);
    };

    loadMessages();
  }, []); // Run only once on mount

  if (!messages) {
    // Optionally render a loading state or null while messages are loading
    return null;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
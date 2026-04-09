import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Solar Living",
  description: "Solar Living Web",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${lora.variable}`}>
      <body className="font-sans antialiased" style={{ backgroundColor: '#474748', color: '#f0f0f0' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

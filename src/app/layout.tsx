import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { SoundControl } from "@/components/ui/SoundControl";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Myriam Depetris · Estilismo de Mesas & Experiencias",
  description:
    "Ambientación boutique y estilismo de mesas para bodas, aniversarios, celebraciones íntimas y eventos inolvidables. Catálogo exclusivo de objetos de mesa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden w-full relative">
        <Header />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <CartDrawer />
        <SoundControl />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

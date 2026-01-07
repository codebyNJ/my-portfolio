import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Thoughts & Writings | Nijeesh NJ",
  description: "Technical writings, life reflections, and project insights from Nijeesh NJ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={`${instrumentSans.variable} ${instrumentSerif.variable} font-sans selection:bg-zinc-800 selection:text-[#a7c080]`}
        style={{ fontFamily: 'var(--font-instrument-sans)' }}
      >
        {children}
      </body>
    </html>
  );
}

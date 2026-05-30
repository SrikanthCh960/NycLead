import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC GravityNet | Enterprise Technology Consulting",
  description: "NYC GravityNet helps organizations secure, modernize, and scale with intelligent technology solutions that drive measurable business outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

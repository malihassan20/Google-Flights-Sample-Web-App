import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
// Google Font: Roboto
const roboto = Roboto({
  subsets: ["latin"], // Include subsets for Roboto
  variable: "--font-roboto", // Define a custom CSS variable for Roboto
  weight: ["100", "300", "400", "500", "700", "900"], // Add desired weights
});


export const metadata: Metadata = {
  title: "Google Flight App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        {children}
      </body>
    </html>
  );
}

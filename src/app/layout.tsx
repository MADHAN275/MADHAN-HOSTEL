import type { Metadata } from "next";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";

export const metadata: Metadata = {
  title: "Hostel Management System",
  description: "Modern Living, Simplified Management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClickSpark>
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
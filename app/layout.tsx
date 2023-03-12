import "@/styles/globals.scss";
// import { Manrope as Font, Space_Mono as Mono } from "next/font/google";
import { Manrope as Font } from "next/font/google";

// const mono = Mono({ subsets: ["latin"], weight: "400" });
const font = Font({ subsets: ["latin"] });

export const metadata = {
  title: "Go workout",
  description: "plz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${mono.className} ${font.className}`}>
    <html lang="en" className={`${font.className}`}>
      <body>{children}</body>
    </html>
  );
}

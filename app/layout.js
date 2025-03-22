import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DISC Panglima Roqiiqu Group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/Syafar44/assets/main/assets/image/Desain%20Kitalulus%20PRG%20(2).jpg"
        />
      </head>
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  );
}

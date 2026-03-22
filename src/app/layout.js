import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Famstep Fashion",
  description: "Your one-stop shop for premium men&apos;s fashion. Discover the latest trends in shirts, pants, jackets, shoes, accessories, and suits. Shop now and elevate your style with our curated collection of high-quality apparel and accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.variable}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

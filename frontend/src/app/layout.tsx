import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/CartButton";
export const runtime = "edge";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>
          {typeof metadata.title === "string"
            ? metadata.title
            : "Default Title"}
        </title>
        <meta
          name="description"
          content={metadata.description || "Default Description"}
        />
      </Head>
      <body className="text-white body-font uppercase flex flex-col min-h-screen">
        <div className="bg-gray-900 top-0 sticky">
          <div className="container gap-5 mx-auto flex  px-5 flex-col sm:flex-row items-center md:justify-center">
            <Image
              src="https://media3.giphy.com/media/dyFrL10k1eNm5tZIvU/giphy.gif?cid=6c09b952j9q69uyx8x2nelueto4bzfmj897aiebeudlz7en1&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              alt="Logo"
              height="80"
              width="80"
              object-fit="cover"
            />
            <div className="hidden w-full sm:flex justify-between">
              <div className="flex gap-5">
                <Link href="/" className="hover:text-gray-400">
                  Home
                </Link>
                <Link href="/about" className="hover:text-gray-400">
                  About
                </Link>

                <Link href="/products" className="hover:text-gray-400">
                  Products
                </Link>
                <Link href="/contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </div>
              <div className="flex gap-5">
                <div className="inline-flex items-center  text-base mt-4 md:mt-0">
                  ZALOGUJ
                </div>
                <CartButton />
              </div>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

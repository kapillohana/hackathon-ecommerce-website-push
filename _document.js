import Document, { Html, Head } from 'next/document';
import { metadata } from './app/layout.tsx';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, metadata };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add Google Fonts link for Poppins (if needed) */}
        </Head>
        <body className={`${geistSans.className} ${geistMono.className} antialiased font-sans`}>
          {super.render()}
        </body>
      </Html>
    );
  }
}
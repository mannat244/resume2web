import AuthProvider from "./components/AuthProvider";
import "./globals.css";

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Resume2Web - Turn Your Resume into a Website",
  description: "Easily convert your resume into a professional website with Resume2Web. Upload your resume and get an instant online portfolio.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

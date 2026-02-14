import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Twist Digital - Task Management System",
  description: "Twist Digital - Task Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        style={{ fontFamily: manrope.style.fontFamily }}
      >
        {children}
      </body>
    </html>
  );
}

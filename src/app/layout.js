import "./globals.css";
import { Inter } from "next/font/google";
import Topbar from "@/components/pageComponents/Topbar/Topbar";
import Prvider from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Prvider>
          <div>
            {" "}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
              integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,300&family=Roboto+Condensed:ital,wght@1,300&family=Roboto+Mono:ital,wght@1,200&family=Roboto:wght@300;400&display=swap"
              rel="stylesheet"
            ></link>
          </div>
          <Topbar></Topbar>
          <div>{children}</div>
        </Prvider>
      </body>
    </html>
  );
}

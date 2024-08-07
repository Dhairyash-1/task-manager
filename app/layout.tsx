import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModalProvider } from "@/context/ModalContext"
import { UserProvider } from "@/context/UserContext"
import { TodoProvider } from "@/context/TodoContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <TodoProvider>
          <UserProvider>
            <ModalProvider>{children}</ModalProvider>
          </UserProvider>
        </TodoProvider>
      </body>
    </html>
  )
}

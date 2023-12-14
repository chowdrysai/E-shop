import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/CardProvider'
import { ToastBar, Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'E-shop',
  description: 'E commerce site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-gray-700` }>
        <Toaster toastOptions= {{ style: { backgroundColor: 'rgb(51 65 85)', color: 'white' } }}/>
        <CartProvider>
        <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>{children}</main>
        <Footer />
        </div>
        </CartProvider>
      </body>
    </html>
  )
}

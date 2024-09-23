import StreamVideoProvider from '@/Provider/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "ViColab",
  description: "Collab App",
  icons:{
    icon:'/icons/LOGO.jpg'
  }
};

function RootLayout({children}:{children:ReactNode}) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
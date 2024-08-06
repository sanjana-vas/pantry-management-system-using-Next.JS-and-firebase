// app/layout.tsx
import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pantry Management',
  description: 'Manage your pantry items effectively.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="#fafafa"
        >
          {/* Add Navbar or other layout components here */}
          {children}
        </Box>
      </body>
    </html>
  );
}

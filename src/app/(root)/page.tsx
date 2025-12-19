import React from 'react';
import { Metadata } from 'next';
import HomeClient from '@/app/(root)/_components/HomeClient';

export const metadata: Metadata = {
  title: "Home | WG",
}

const HomePage = () => {
  return <HomeClient />;
};

export default HomePage;
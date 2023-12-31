import type { Metadata } from 'next';

import { MyPageLayout } from './components/page-layout';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <MyPageLayout>{children}</MyPageLayout>;
}

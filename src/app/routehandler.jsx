'use client';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RouteHandler({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = ['/auth/signin', '/auth/register'];
  const shouldHideHeaderFooter = hiddenRoutes.includes(pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <section>{children}</section>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}
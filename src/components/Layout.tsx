import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

// 16.375rem is the height of header + footer

export default function Layout() {
  return (
    <div className="bg-dark-g min-h-screen">
      <Header />
      <main className="flex min-h-[calc(100vh-16.375rem)] items-center justify-center py-6 text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function Layout() {
  return (
    <div className="bg-dark-g min-h-screen">
      <Header />
      <main className="text-white py-6 min-h-[calc(100vh-16.375rem)] flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

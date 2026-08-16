import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AIAssistantWidget from "./AIAssistantWidget";

function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 sm:p-8 animate-fade-in max-w-[1600px] mx-auto w-full flex-1">
          <Outlet />
        </main>
      </div>

      {/* Global AI Copilot Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}


export default Layout;
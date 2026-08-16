import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  LogOut,
  Sparkles,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { InventraIcon } from "./Logo";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("role") || "ADMIN";
  const userName = localStorage.getItem("userName") || (userRole === "ADMIN" ? "Administrator" : "Staff User");
  const isStaff = userRole === "STAFF";

  const allMenuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      tag: "01",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "AI Copilot",
      icon: Sparkles,
      path: "/ai-assistant",
      isAi: true,
      tag: "AI",
      roles: ["ADMIN"],
    },
    {
      name: "Products",
      icon: Package,
      path: "/products",
      tag: "02",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "Customers",
      icon: Users,
      path: "/customers",
      tag: "03",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "Sales POS",
      icon: ShoppingCart,
      path: "/sales",
      tag: "04",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "Suppliers",
      icon: Truck,
      path: "/suppliers",
      tag: "05",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "Purchases",
      icon: ShoppingCart,
      path: "/purchases",
      tag: "06",
      roles: ["ADMIN", "STAFF"],
    },
    {
      name: "Reports",
      icon: FileText,
      path: "/reports",
      tag: "07",
      roles: ["ADMIN"],
    },
  ];

  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-[#0f172a] text-white h-screen sticky top-0 flex flex-col justify-between border-r border-slate-800 shrink-0 z-40 p-5 overflow-y-auto font-sans shadow-xl">
      <div>
        {/* Brand Header with Official Logo */}
        <div 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 mb-8 px-2 mt-2 cursor-pointer group"
        >
          <div className="p-1.5 rounded-xl bg-black border border-slate-700 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <InventraIcon size={26} />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white font-display flex items-center gap-1.5">
              INVENTRA <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300">ERP</span>
            </h1>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block -mt-0.5">
              {isStaff ? "Staff Operations" : "Enterprise OS"}
            </span>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {isStaff ? "[ STAFF WORKSPACE ]" : "[ SYSTEM MODULES ]"}
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 border border-blue-400/40"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? "text-white" : item.isAi ? "text-sky-400 animate-pulse" : "text-slate-400"} />
                  <span className="text-xs font-semibold">{item.name}</span>
                </div>
                
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? "bg-white/20 text-white" : "text-slate-400 bg-slate-800"
                }`}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
          <div className="space-y-0.5 overflow-hidden">
            <span className="text-[11px] font-bold text-white block truncate">
              {isStaff ? "Staff Operations Portal" : "Admin Console"}
            </span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {isStaff ? "Active Session" : "Live Telemetry"}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-between p-3 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30 cursor-pointer text-xs font-bold uppercase"
        >
          <div className="flex items-center gap-2">
            <LogOut size={16} />
            <span>Sign Out</span>
          </div>
          <span>[ 00 ]</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
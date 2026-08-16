import { Bell, UserCircle, Package, X, LogOut, Sparkles, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getLowStock } from "../api/inventoryApi";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchAlerts();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await getLowStock();
      if (res.success) {
        setLowStockAlerts(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch low stock alerts", error);
    }
  };

  const getPageTitle = (path) => {
    if (path.startsWith("/dashboard")) return "Dashboard Overview";
    if (path.startsWith("/ai-assistant")) return "AI Copilot Command Center";
    if (path.startsWith("/products")) return "Product Stock Matrix";
    if (path.startsWith("/customers")) return "Client & CRM Directory";
    if (path.startsWith("/suppliers")) return "Supplier & Vendor Network";
    if (path.startsWith("/purchases")) return "Procurement & Purchase Orders";
    if (path.startsWith("/sales")) return "Sales & POS Transactions";
    if (path.startsWith("/reports")) return "Business Intelligence & BI Reports";
    return "Enterprise Workspace";
  };

  return (
    <div className="h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-30 font-sans shadow-xs">
      
      {/* Page Title with Meta Tag */}
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-mono-custom uppercase tracking-wider font-bold hidden sm:inline-block">
          [ ACTIVE VIEW ]
        </span>
        <h2 className="text-sm sm:text-base font-black tracking-tight text-slate-900 font-display">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* AI Copilot Direct Quick Link */}
        <button
          onClick={() => navigate("/ai-assistant")}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-mono-custom font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm hover:from-blue-700 hover:to-indigo-700"
        >
          <Sparkles size={13} className="text-sky-200 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notification Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-slate-200"
          >
            <Bell size={17} />
            {lowStockAlerts.length > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-900 font-mono-custom uppercase">[ Notifications ]</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-mono-custom font-bold px-2 py-0.5 rounded-full">
                  {lowStockAlerts.length} Alerts
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {lowStockAlerts.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 font-mono-custom">
                    ✦ All inventory healthy &amp; above safety limits
                  </div>
                ) : (
                  lowStockAlerts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/products");
                      }}
                      className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3"
                    >
                      <div className="p-2 bg-blue-50 text-blue-700 rounded-lg mt-0.5">
                        <Package size={14} />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono-custom mt-0.5">
                          SKU: {item.sku} • <span className="text-blue-600 font-bold">{item.stock} left</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono-custom shadow-xs">
            AD
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
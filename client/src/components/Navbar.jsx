import { Bell, UserCircle, Package, X, LogOut, Sparkles } from "lucide-react";
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
    if (path.startsWith("/ai-assistant")) return "Inventra AI Copilot • Enterprise Telemetry";
    if (path.startsWith("/products")) return "Product Catalog";
    if (path.startsWith("/customers")) return "Customer Directory";
    if (path.startsWith("/suppliers")) return "Supplier Registry";
    if (path.startsWith("/purchases")) return "Purchase Orders";
    if (path.startsWith("/sales")) return "Sales Transactions";
    if (path.startsWith("/reports")) return "Business Intelligence & Reports";
    return "Inventra System Portal";
  };

  return (
    <div className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <h2 className="text-lg font-bold tracking-tight text-slate-800">
        {getPageTitle(location.pathname)}
      </h2>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* AI Copilot Direct Quick Link */}
        <button
          onClick={() => navigate("/ai-assistant")}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 text-blue-700 hover:from-blue-100 hover:to-indigo-100 text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
        >
          <Sparkles size={14} className="text-amber-500 animate-pulse" />
          <span>AI Copilot</span>
        </button>
        {/* Notification Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all duration-200"
          >
            <Bell size={20} />
            {lowStockAlerts.length > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-slate-800">Notifications</h3>
                <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {lowStockAlerts.length} Alerts
                </span>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {lowStockAlerts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400">
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {lowStockAlerts.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-3 items-start">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg shrink-0">
                          <Package size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Low stock alert: Only <span className="font-bold text-red-600">{item.stock}</span> units remaining.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-0.5 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full">
              <UserCircle size={30} className="text-white bg-slate-900 rounded-full" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {localStorage.getItem("userName") || "Super Administrator"}
              </span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                {localStorage.getItem("role") || "ADMIN"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            title="Sign out of ERP"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-rose-500/20"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
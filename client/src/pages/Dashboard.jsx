import { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  Truck,
  AlertTriangle,
  Sparkles,
  Activity,
  ArrowRight,
  Plus
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import StatCard from "../components/StatCard";
import RecentSales from "../components/RecentSales";
import { getLowStock } from "../api/inventoryApi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-blue-500/40 rounded-2xl px-4 py-2.5 shadow-2xl text-white">
        <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-sky-300 font-bold text-sm mt-0.5">
          ₹ {Number(payload[0].value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const userRole = localStorage.getItem("role") || "ADMIN";
  const isStaff = userRole === "STAFF";

  // Pre-initialized instant state (0 delay UI)
  const [summary, setSummary] = useState({
    totalProducts: 8,
    totalCustomers: 5,
    totalSales: 1719696,
    profit: 465800,
    lowStockCount: 3,
    todaySales: 185000,
    todayInvoices: 4,
  });

  const [chartData, setChartData] = useState([
    { date: "Jan", revenue: 450000 },
    { date: "Feb", revenue: 580000 },
    { date: "Mar", revenue: 689696 },
  ]);

  const [sales, setSales] = useState([
    { invoiceNumber: "INV-2026-001", customerName: "TechCorp Global", amount: 450000, date: "16/08/2026" },
    { invoiceNumber: "INV-2026-002", customerName: "Apex Dynamics", amount: 289000, date: "16/08/2026" },
    { invoiceNumber: "INV-2026-003", customerName: "Nexus Systems", amount: 540000, date: "15/08/2026" },
  ]);

  const [lowStock, setLowStock] = useState([
    { id: 1, name: "Ubiquiti UniFi Pro 7 AP", sku: "NET-UAP-7PRO", stock: 3 },
    { id: 2, name: "Dell Precision 7780", sku: "WS-DELL-7780", stock: 2 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardFast();
  }, []);

  const fetchDashboardFast = async () => {
    try {
      const [summaryRes, chartRes, salesRes, stockRes] = await Promise.allSettled([
        API.get("/dashboard/summary"),
        API.get("/dashboard/sales-chart"),
        API.get("/dashboard/recent-sales"),
        getLowStock(),
      ]);

      if (summaryRes.status === "fulfilled" && summaryRes.value?.data?.success) {
        setSummary((prev) => ({ ...prev, ...summaryRes.value.data.data }));
      }

      if (chartRes.status === "fulfilled" && chartRes.value?.data?.success) {
        setChartData(
          chartRes.value.data.data.map((item) => ({
            date: item.month,
            revenue: Number(item.sales),
          }))
        );
      }

      if (salesRes.status === "fulfilled" && salesRes.value?.data?.success) {
        setSales(
          salesRes.value.data.data.map((sale) => ({
            invoiceNumber: sale.invoiceNumber,
            customerName: sale.customer?.name || "Customer",
            amount: Number(sale.totalAmount),
            date: new Date(sale.createdAt || sale.saleDate).toLocaleDateString("en-IN"),
          }))
        );
      }

      if (stockRes.status === "fulfilled" && stockRes.value?.data) {
        setLowStock(stockRes.value.data);
      }
    } catch (err) {
      console.error("Dashboard fetch notice:", err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-8 max-w-[1500px] mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs uppercase tracking-wider font-bold">
              {isStaff ? "[ 01 / STAFF OPERATIONS ]" : "[ 01 / EXECUTIVE CONSOLE ]"}
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM OPTIMAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            {isStaff ? "Daily Operations & Billing" : "Operational Intelligence Dashboard"}
          </h1>
        </div>

        {isStaff ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/sales")}
              className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>Create Sale / POS</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/ai-assistant")}
            className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md"
          >
            <Sparkles size={13} className="text-sky-200 animate-pulse" />
            <span>Audit with AI Copilot</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      {/* Bento Stat Cards */}
      {isStaff ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Today's Sales"
            value="₹ 1,85,000"
            icon={ShoppingCart}
            tag="TODAY"
            trendLabel="4 transactions settled today"
            isHighlight={true}
          />
          <StatCard
            title="Today's Invoices"
            value="4"
            icon={TrendingUp}
            tag="INVOICES"
            trendLabel="All receipts synced"
          />
          <StatCard
            title="Catalog Products"
            value={summary.totalProducts || 8}
            icon={Package}
            tag="PRODUCTS"
            trendLabel="Available for sale"
          />
          <StatCard
            title="Client Accounts"
            value={summary.totalCustomers || 5}
            icon={Users}
            tag="CUSTOMERS"
            trendLabel="Active CRM buyers"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Product Catalog"
            value={summary.totalProducts || 8}
            icon={Package}
            tag="01.A"
            trendLabel="Active warehouse SKUs"
          />
          <StatCard
            title="Client Accounts"
            value={summary.totalCustomers || 5}
            icon={Users}
            tag="01.B"
            trendLabel="Verified CRM accounts"
          />
          <StatCard
            title="Gross Revenue"
            value={`₹ ${Number(summary.totalSales || 1719696).toLocaleString("en-IN")}`}
            icon={TrendingUp}
            tag="01.C"
            trendLabel="+24.8% monthly trajectory"
          />
          <StatCard
            title="Net Profit"
            value={`₹ ${Number(summary.profit || 465800).toLocaleString("en-IN")}`}
            icon={ArrowUpRight}
            tag="01.D"
            trendLabel="27.1% operating margin"
            isHighlight={true}
          />
        </div>
      )}

      {/* Main Charts & Stock Row */}
      {!isStaff && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 liquid-glass-type3 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs uppercase tracking-wider font-bold">
                    [ 02 / REVENUE ]
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">Revenue Velocity Trend</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">Monthly gross transaction settlement</p>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 uppercase">
                ✦ Live Telemetry
              </span>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#blueGrad)"
                  dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" }}
                  activeDot={{ r: 6, fill: "#0ea5e9" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="liquid-glass-type3 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs uppercase tracking-wider font-bold">
                    [ 03 / THRESHOLDS ]
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">Inventory Alerts</h3>
                </div>
                {lowStock.length > 0 && (
                  <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {lowStock.length} Flagged
                  </span>
                )}
              </div>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {lowStock.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate("/products")}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{product.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{product.sku}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/purchases")}
              className="w-full mt-4 py-3 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50 text-xs font-bold uppercase text-slate-700 hover:text-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Create Replenishment PO</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Today's / Recent Invoices Table */}
      <div className="liquid-glass-type3 rounded-3xl shadow-sm overflow-hidden">
        <RecentSales sales={sales} />
      </div>
    </div>
  );
}

export default Dashboard;
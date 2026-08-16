import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Eye, ShoppingCart, RefreshCw, Search } from "lucide-react";

import { getSales, deleteSale } from "../api/saleApi";

function Sales() {
  const navigate = useNavigate();
  const isAdmin = true;

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await getSales();
      setSales(response.data || []);
    } catch (error) {
      console.error("Sales fetch error:", error);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale record? Associated product stock will be adjusted.")) return;
    try {
      await deleteSale(id);
      fetchSales();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = sales.filter((sale) =>
    sale.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
    sale.customer?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status = "COMPLETED") => {
    const map = {
      COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      SETTLED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      PENDING: "bg-[#e67e22]/15 text-[#b85412] border-[#e67e22]/30",
      CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono-custom border uppercase ${map[status] || "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
        {status}
      </span>
    );
  };

  const totalRevenue = filtered.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#f0e2d3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e67e22]/15 text-[#b85412] border border-[#e67e22]/30 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ 04 / TRANSACTIONS ]
            </span>
            <span className="text-[11px] font-mono-custom text-[#784f33] font-bold">
              {sales.length} Invoices Recorded
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2b180d] tracking-tight font-display">
            Point of Sale &amp; Billing Ledger
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSales}
            className="p-2.5 rounded-xl border border-[#f0e2d3] bg-white hover:bg-[#fbf6ef] text-[#784f33] transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => navigate("/sales/add")}
            className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus size={16} />
            <span>New Sale POS</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={17} className="absolute left-4 top-3.5 text-[#8c654b]" />
        <input
          type="text"
          placeholder="Search sales transactions by invoice # or client name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#f0e2d3] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2b180d] placeholder:text-[#8c654b] focus:outline-none focus:border-[#e67e22] shadow-2xs transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#f0e2d3] shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#fbf6ef] border-b border-[#f0e2d3] text-[#784f33] uppercase text-[10px] font-mono-custom tracking-wider">
              <tr>
                <th className="p-4 pl-6">Invoice #</th>
                <th className="p-4">Customer Account</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Settled</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f5ede4]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    ✦ Loading sales transactions...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShoppingCart size={28} className="text-[#e2cca8]" />
                      <span>No sales invoices found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#fffcf7] transition-colors group">
                    <td className="p-4 pl-6 font-mono-custom font-bold text-[#b85412]">
                      {sale.invoiceNumber}
                    </td>

                    <td className="p-4 font-semibold text-[#2b180d]">
                      {sale.customer?.name || "Counter Walk-in"}
                    </td>

                    <td className="p-4 text-[#784f33] font-mono-custom">
                      {sale.items?.length || 1} line item(s)
                    </td>

                    <td className="p-4 font-black text-[#2b180d] font-mono-custom text-xs">
                      ₹{Number(sale.totalAmount || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      {statusBadge(sale.status)}
                    </td>

                    <td className="p-4 text-[#784f33] font-mono-custom text-[11px]">
                      {new Date(sale.createdAt || Date.now()).toLocaleDateString("en-IN")}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/sales/${sale.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-[#fbf6ef] hover:bg-[#f0e2d3] text-[#784f33] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="View Receipt"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(sale.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Summary Banner */}
      {!loading && filtered.length > 0 && (
        <div className="flex justify-end pt-2">
          <div className="bg-[#fbf6ef] border border-[#f0e2d3] rounded-2xl px-6 py-4 text-right shadow-2xs font-mono-custom">
            <span className="text-xs text-[#784f33] uppercase font-bold block mb-1">
              Settled Volume ({filtered.length} Invoices)
            </span>
            <span className="text-2xl font-black text-[#b85412]">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Sales;
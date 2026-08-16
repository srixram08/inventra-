import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit3, Trash2, Truck, RefreshCw, Search } from "lucide-react";

import {
  getSuppliers,
  deleteSupplier,
} from "../api/supplierApi";

function Supplier() {
  const navigate = useNavigate();
  const isAdmin = true;

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await getSuppliers();
      setSuppliers(response.data || []);
    } catch (error) {
      console.error("Supplier Fetch Error:", error);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier partner?")) return;

    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#f0e2d3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e67e22]/15 text-[#b85412] border border-[#e67e22]/30 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ 05 / VENDOR NETWORK ]
            </span>
            <span className="text-[11px] font-mono-custom text-[#784f33] font-bold">
              {suppliers.length} Active Partners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2b180d] tracking-tight font-display">
            Supplier &amp; Procurement Partners
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSuppliers}
            className="p-2.5 rounded-xl border border-[#f0e2d3] bg-white hover:bg-[#fbf6ef] text-[#784f33] transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => navigate("/suppliers/add")}
            className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus size={16} />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={17} className="absolute left-4 top-3.5 text-[#8c654b]" />
        <input
          type="text"
          placeholder="Search suppliers by name, company, or email..."
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
                <th className="p-4 pl-6">Vendor Name</th>
                <th className="p-4">Company Entity</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f5ede4]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    ✦ Loading supplier records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Truck size={28} className="text-[#e2cca8]" />
                      <span>No supplier partners found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-[#fffcf7] transition-colors group">
                    <td className="p-4 pl-6 font-bold text-[#2b180d] text-xs">
                      {supplier.name}
                    </td>

                    <td className="p-4 font-semibold text-[#66432b]">
                      {supplier.companyName || "Independent Supplier"}
                    </td>

                    <td className="p-4 font-mono-custom text-[#784f33]">
                      {supplier.phone || "—"}
                    </td>

                    <td className="p-4 text-[#784f33] font-mono-custom">
                      {supplier.email || "—"}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-[#e67e22]/15 hover:bg-[#e67e22]/25 text-[#b85412] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(supplier.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
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

    </div>
  );
}

export default Supplier;
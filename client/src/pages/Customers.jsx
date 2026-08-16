import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit3, Trash2, Search, Users, RefreshCw } from "lucide-react";

import {
  getCustomers,
  deleteCustomer,
} from "../api/customerApi";

const Customers = () => {
  const navigate = useNavigate();
  const isAdmin = true;

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers();
      const data = res.data || [];
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error(error);
      setCustomers([]);
      setFilteredCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name?.toLowerCase().includes(search.toLowerCase()) ||
      customer.email?.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [search, customers]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#f0e2d3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e67e22]/15 text-[#b85412] border border-[#e67e22]/30 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ 03 / CRM DIRECTORY ]
            </span>
            <span className="text-[11px] font-mono-custom text-[#784f33] font-bold">
              {customers.length} Client Accounts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2b180d] tracking-tight font-display">
            Customer Relationship Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            className="p-2.5 rounded-xl border border-[#f0e2d3] bg-white hover:bg-[#fbf6ef] text-[#784f33] transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => navigate("/customers/add")}
            className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus size={16} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={17} className="absolute left-4 top-3.5 text-[#8c654b]" />
        <input
          type="text"
          placeholder="Search customers by name, email, or phone number..."
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
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Billing Address</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f5ede4]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    ✦ Loading customer accounts...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-12 text-[#8c654b] font-mono-custom">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users size={28} className="text-[#e2cca8]" />
                      <span>No customer records found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#fffcf7] transition-colors group">
                    <td className="p-4 pl-6 font-bold text-[#2b180d] text-xs">
                      {customer.name}
                    </td>

                    <td className="p-4 text-[#66432b] font-mono-custom">
                      {customer.email}
                    </td>

                    <td className="p-4 font-mono-custom text-[#784f33]">
                      {customer.phone || "—"}
                    </td>

                    <td className="p-4 text-[#784f33] max-w-xs truncate">
                      {customer.address || "—"}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/customers/edit/${customer.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-[#e67e22]/15 hover:bg-[#e67e22]/25 text-[#b85412] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
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
};

export default Customers;
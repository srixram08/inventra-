import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Truck, Building2, Phone, Mail, MapPin, Check, Plus } from "lucide-react";
import { createSupplier } from "../api/supplierApi";

function AddSupplier() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Supplier name is required");
      return;
    }

    try {
      setLoading(true);
      await createSupplier(formData);
      navigate("/suppliers");
    } catch (error) {
      console.log(error);
      navigate("/suppliers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
        <Link
          to="/suppliers"
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ VENDOR NETWORK ]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Register New Supplier Partner
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-3xl p-7 sm:p-9 font-sans max-w-3xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Supplier / Contact Person *
            </label>
            <div className="relative">
              <Truck size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Apex Global Components"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Company Entity Name
            </label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Apex Industrial Supply Ltd."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Business Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sales@apexcomponents.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Contact Phone
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 91234 56789"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Warehouse / Supply Depot Address
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Plot 44, Industrial Logistics Corridor, Sector 12"
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Link
            to="/suppliers"
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="btn-liquid-caramel px-7 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Saving Partner...</span>
            ) : (
              <>
                <Check size={15} />
                <span>Save Supplier Partner</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSupplier;
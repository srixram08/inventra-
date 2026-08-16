import { useState } from "react";
import { User, Mail, Phone, MapPin, Check, ArrowRight } from "lucide-react";

const CustomerForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Customer Name and Email are required");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 shadow-sm rounded-3xl p-7 sm:p-9 font-sans max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
            Customer / Client Name *
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Nexus Innovations Inc."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
            Work Email Address *
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. procurement@nexus.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
            Contact Phone Number
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
            Billing / Office Address
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Cyber City Tech Park, Tower B"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

      </div>

      <div className="flex items-center justify-end gap-3 pt-8 mt-6 border-t border-slate-100">
        <button
          type="submit"
          disabled={loading}
          className="btn-liquid-caramel px-7 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
        >
          {loading ? (
            <span>Saving Customer...</span>
          ) : (
            <>
              <Check size={15} />
              <span>Save Customer Dossier</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Check } from "lucide-react";

import {
  getCustomerById,
  updateCustomer,
} from "../api/customerApi";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await getCustomerById(id);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(id, formData);
      navigate("/customers");
    } catch (error) {
      console.error(error);
      navigate("/customers");
    }
  };

  if (loading) {
    return <div className="p-8 font-mono-custom text-xs text-slate-500">Loading customer profile...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
        <Link
          to="/customers"
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ CRM PROFILE ]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Edit Client Profile: {formData.name}
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
              Customer Name *
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Email Address *
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Billing Address
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Link
            to="/customers"
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn-liquid-caramel px-7 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Check size={15} />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
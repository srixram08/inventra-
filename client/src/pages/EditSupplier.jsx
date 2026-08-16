import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Truck, Building2, Phone, Mail, MapPin, Check } from "lucide-react";
import { getSupplierById, updateSupplier } from "../api/supplierApi";

function EditSupplier() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const response = await getSupplierById(id);
      const supplier = response.data;
      if (supplier) {
        setFormData({
          name: supplier.name || "",
          companyName: supplier.companyName || "",
          email: supplier.email || "",
          phone: supplier.phone || "",
          address: supplier.address || "",
        });
      }
    } catch (error) {
      console.error("Fetch Supplier Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSupplier(id, formData);
      navigate("/suppliers");
    } catch (error) {
      console.error("Update Error:", error);
      navigate("/suppliers");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 font-mono-custom text-xs text-slate-500">Loading supplier partner profile...</div>;
  }

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
              [ VENDOR PROFILE ]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Edit Supplier Partner: {formData.name}
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
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
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 font-mono-custom uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
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
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono-custom"
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
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
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
            disabled={saving}
            className="btn-liquid-caramel px-7 py-3 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {saving ? (
              <span>Saving Partner...</span>
            ) : (
              <>
                <Check size={15} />
                <span>Update Supplier</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSupplier;
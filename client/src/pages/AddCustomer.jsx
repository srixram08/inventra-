import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

import CustomerForm from "../components/CustomerForm";
import { createCustomer } from "../api/customerApi";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await createCustomer(data);
      navigate("/customers");
    } catch (error) {
      console.error(error);
      navigate("/customers");
    } finally {
      setLoading(false);
    }
  };

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
              [ CRM DIRECTORY ]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Add New Client Account
          </h1>
        </div>
      </div>

      <CustomerForm
        initialData={{}}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AddCustomer;
function RecentSales({ sales = [] }) {
  return (
    <div className="p-6 sm:p-7 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ 04 / LEDGER ]
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Recent Sales Invoices
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-mono-custom mt-1">
            Real-time ledger entries synchronized to catalog
          </p>
        </div>
        {sales.length > 0 && (
          <span className="text-[10px] font-mono-custom font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase">
            {sales.length} Synced
          </span>
        )}
      </div>

      {sales.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-mono-custom">
          <p className="text-sm">✦ No recent sales recorded</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left font-mono-custom text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="pb-3 pr-4">Invoice ID</th>
                <th className="pb-3 pr-4">Client / Customer</th>
                <th className="pb-3 pr-4">Settled Amount</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {sales.map((sale, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-4 font-mono-custom font-bold text-blue-600 text-xs">
                    {sale.invoiceNumber}
                  </td>
                  <td className="py-3.5 pr-4 text-xs font-semibold text-slate-800">
                    {sale.customerName}
                  </td>
                  <td className="py-3.5 pr-4 text-xs font-black text-slate-900 font-mono-custom">
                    ₹ {sale.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 pr-4 text-[11px] text-slate-400 font-mono-custom">
                    {sale.date}
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="text-[9px] font-mono-custom font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
                      SETTLED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentSales;
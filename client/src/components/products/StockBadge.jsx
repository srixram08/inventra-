const StockBadge = ({ stock }) => {
  let status = "Available";
  let styles = "bg-emerald-50 text-emerald-700 border border-emerald-200";

  if (stock === 0) {
    status = "Out of Stock";
    styles = "bg-rose-50 text-rose-700 border border-rose-200";
  } else if (stock <= 10) {
    status = "Low Stock";
    styles = "bg-[#e67e22]/15 text-[#b85412] border border-[#e67e22]/30";
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono-custom tracking-wide inline-flex items-center gap-1 ${styles}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          stock === 0 ? "bg-rose-500" : stock <= 10 ? "bg-[#e67e22]" : "bg-emerald-500"
        }`}
      />
      {status}
    </span>
  );
};

export default StockBadge;
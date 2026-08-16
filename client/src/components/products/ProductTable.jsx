import StockBadge from "./StockBadge";
import { Edit3, Trash2, Package } from "lucide-react";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  isAdmin
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#f0e2d3] shadow-sm overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-[#fbf6ef] border-b border-[#f0e2d3] text-[#784f33] uppercase text-[10px] font-mono-custom tracking-wider">
            <tr>
              <th className="p-4 pl-6">Product Details</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Supplier</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              {isAdmin && (
                <th className="p-4 pr-6 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f5ede4]">
            {products.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 8 : 7} className="text-center p-12 text-[#8c654b] font-mono-custom">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Package size={28} className="text-[#e2cca8]" />
                    <span>No products found in catalog</span>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-[#fffcf7] transition-colors group">
                  
                  <td className="p-4 pl-6 font-semibold text-[#2b180d] text-xs">
                    <div className="font-bold text-[#2b180d]">{product.name}</div>
                  </td>

                  <td className="p-4 font-mono-custom text-[#784f33] font-medium">
                    {product.sku}
                  </td>

                  <td className="p-4">
                    <span className="bg-[#fbf6ef] text-[#784f33] px-2.5 py-0.5 rounded-lg text-[11px] font-medium border border-[#f0e2d3]">
                      {product.category?.name || "General"}
                    </span>
                  </td>

                  <td className="p-4 text-[#66432b]">
                    {product.supplier?.name || "Internal Direct"}
                  </td>

                  <td className="p-4 font-black text-[#2b180d] font-mono-custom text-xs">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </td>

                  <td className="p-4 font-bold text-[#2b180d] font-mono-custom">
                    {product.stock} units
                  </td>

                  <td className="p-4">
                    <StockBadge stock={product.stock} />
                  </td>

                  {isAdmin && (
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="px-3 py-1.5 rounded-xl bg-[#e67e22]/15 hover:bg-[#e67e22]/25 text-[#b85412] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
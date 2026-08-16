import { useEffect, useState } from "react";
import { Plus, Search, Package, RefreshCw, Layers } from "lucide-react";

import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ProductForm from "../components/products/ProductForm";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

import API from "../api/axios";

const Products = () => {
  const role = localStorage.getItem("role") || "ADMIN";
  const isAdmin = true; // Both Owner/Admin and Staff have add/edit operational capability

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");

  // LOAD PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // LOAD CATEGORIES
  const fetchCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data || []);
    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };

  // LOAD SUPPLIERS
  const fetchSuppliers = async () => {
    try {
      const response = await API.get("/suppliers");
      setSuppliers(response.data.data || []);
    } catch (error) {
      console.log(error);
      setSuppliers([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()) ||
    product.sku?.toLowerCase().includes(search.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-12 max-w-[1500px] mx-auto">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#f0e2d3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e67e22]/15 text-[#b85412] border border-[#e67e22]/30 text-[9px] font-mono-custom uppercase tracking-wider font-bold">
              [ 02 / CATALOG ]
            </span>
            <span className="text-[11px] font-mono-custom text-[#784f33] font-bold">
              {products.length} Total SKUs Registered
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2b180d] tracking-tight font-display">
            Product Stock Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-[#f0e2d3] bg-white hover:bg-[#fbf6ef] text-[#784f33] transition-colors cursor-pointer"
            title="Refresh Catalog"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleAdd}
            className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-mono-custom font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={17} className="absolute left-4 top-3.5 text-[#8c654b]" />
        <input
          type="text"
          placeholder="Search products by title, SKU, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#f0e2d3] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2b180d] placeholder:text-[#8c654b] focus:outline-none focus:border-[#e67e22] shadow-2xs transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono-custom text-[#8c654b] bg-white rounded-3xl border border-[#f0e2d3]">
          ✦ Loading product catalog...
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}

      {/* Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          selectedProduct
            ? "Edit Catalog Product"
            : "Add New Product"
        }
      >
        <ProductForm
          product={selectedProduct}
          categories={categories}
          suppliers={suppliers}
          onSuccess={fetchProducts}
          onClose={() => setShowModal(false)}
        />
      </ProductModal>
    </div>
  );
};

export default Products;
import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductTable from '../../components/admin/ProductTable';
import AddProductModal from '../../components/admin/AddProductModal';
import GrantAccessModal from '../../components/admin/GrantAccessModal';
import Toast from '../../components/shared/Toast';
import { subjects } from '../../data/mockData';

export default function Products() {
  const [products, setProducts] = useState(subjects);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1 max-w-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <Search size={15} style={{ color: 'var(--text3)' }} />
          <input
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: 'var(--text)' }}
          />
        </div>
        <button
          onClick={() => { setEditProduct(null); setModal('product'); }}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
          style={{ background: 'var(--brand)' }}
        >+ Add Product</button>
      </div>

      {/* Summary */}
      <p className="text-sm" style={{ color: 'var(--text3)' }}>
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </p>

      <ProductTable
        products={filtered}
        onEdit={(p) => { setEditProduct(p); setModal('product'); }}
        onGrantAccess={() => setModal('access')}
        onArchive={(p) => {
          setProducts(prev => prev.filter(x => x.id !== p.id));
          setToast({ message: `${p.title} archived` });
        }}
      />

      <AddProductModal
        isOpen={modal === 'product'}
        onClose={() => setModal(null)}
        product={editProduct}
        onSave={(p) => {
          setProducts(prev => editProduct ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
          setToast({ message: editProduct ? 'Product updated' : 'Product added' });
          setEditProduct(null);
        }}
      />
      <GrantAccessModal
        isOpen={modal === 'access'}
        onClose={() => setModal(null)}
        onSave={() => setToast({ message: 'Access granted' })}
      />
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

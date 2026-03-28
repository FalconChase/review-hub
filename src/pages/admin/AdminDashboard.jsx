import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/shared/StatCard';
import ProductTable from '../../components/admin/ProductTable';
import UserList from '../../components/admin/UserList';
import ActivityLog from '../../components/admin/ActivityLog';
import QuickActions from '../../components/admin/QuickActions';
import AddProductModal from '../../components/admin/AddProductModal';
import AddUserModal from '../../components/admin/AddUserModal';
import GrantAccessModal from '../../components/admin/GrantAccessModal';
import Toast from '../../components/shared/Toast';
import { adminStats, subjects, users, activityLog } from '../../data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(subjects);
  const [userList, setUserList] = useState(users);
  const [modal, setModal] = useState(null); // 'product' | 'user' | 'access'
  const [editProduct, setEditProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📦" label="Total Products" value={adminStats.totalProducts} change={12} changeLabel="vs last month" iconBg="#eff6ff" />
        <StatCard icon="👥" label="Total Users" value={adminStats.totalUsers} change={8} changeLabel="new this week" iconBg="#f0fdf4" />
        <StatCard icon="🔑" label="Licenses Granted" value={adminStats.licensesGranted} change={5} changeLabel="this month" iconBg="#fefce8" />
        <StatCard icon="📈" label="Avg. Pass Rate" value={`${adminStats.avgPassRate}%`} change={3} changeLabel="improvement" iconBg="#fdf4ff" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Products table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Products</h2>
            <button
              onClick={() => { setEditProduct(null); setModal('product'); }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white hover:opacity-90"
              style={{ background: 'var(--brand)' }}
            >+ Add Product</button>
          </div>
          <ProductTable
            products={products}
            onEdit={(p) => { setEditProduct(p); setModal('product'); }}
            onGrantAccess={() => setModal('access')}
            onArchive={(p) => {
              setProducts(prev => prev.filter(x => x.id !== p.id));
              showToast(`${p.title} archived`);
            }}
          />
        </div>

        {/* Right: Quick actions + activity */}
        <div className="space-y-4">
          <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Quick Actions</h2>
          <QuickActions
            onNewProduct={() => { setEditProduct(null); setModal('product'); }}
            onAddUser={() => setModal('user')}
            onGrantAccess={() => setModal('access')}
            onViewReports={() => navigate('/admin/analytics')}
          />
          <ActivityLog activities={activityLog} />
        </div>
      </div>

      {/* Users list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: "'Lora', serif" }}>Recent Users</h2>
          <button onClick={() => navigate('/admin/users')} className="text-xs font-semibold hover:underline" style={{ color: 'var(--brand)' }}>View all →</button>
        </div>
        <UserList users={userList.slice(0, 4)} />
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={modal === 'product'}
        onClose={() => setModal(null)}
        product={editProduct}
        onSave={(p) => {
          setProducts(prev => editProduct ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
          showToast(editProduct ? 'Product updated' : 'Product added');
          setEditProduct(null);
        }}
      />
      <AddUserModal
        isOpen={modal === 'user'}
        onClose={() => setModal(null)}
        onSave={(u) => { setUserList(prev => [...prev, u]); showToast('User added'); }}
      />
      <GrantAccessModal
        isOpen={modal === 'access'}
        onClose={() => setModal(null)}
        onSave={() => showToast('Access granted')}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

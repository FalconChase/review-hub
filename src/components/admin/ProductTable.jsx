import Badge from '../shared/Badge';
import { Edit2, Key, Archive } from 'lucide-react';

export default function ProductTable({ products, onEdit, onGrantAccess, onArchive }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
            {['Product', 'Category', 'Modules', 'Users', 'Status', 'Actions'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.id}
              className="transition-colors hover:bg-opacity-50"
              style={{
                borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none',
                background: 'var(--surface)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: p.iconBg || 'var(--brand-soft)' }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>{p.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>{p.exam || p.description?.slice(0, 40)}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.category}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.moduleCount || p.topicCount || 0}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{p.userCount || 0}</td>
              <td className="px-4 py-3">
                <Badge variant={p.status === 'active' ? 'success' : 'warning'}>
                  {p.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit?.(p)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-blue-50 hover:text-blue-600"
                    style={{ color: 'var(--text3)' }} title="Edit"
                  ><Edit2 size={15} /></button>
                  <button
                    onClick={() => onGrantAccess?.(p)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-green-50 hover:text-green-600"
                    style={{ color: 'var(--text3)' }} title="Grant Access"
                  ><Key size={15} /></button>
                  <button
                    onClick={() => onArchive?.(p)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                    style={{ color: 'var(--text3)' }} title="Archive"
                  ><Archive size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

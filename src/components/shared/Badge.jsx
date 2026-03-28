export default function Badge({ variant = 'default', children, className = '' }) {
  const variants = {
    default:  'bg-gray-100 text-gray-600',
    success:  'bg-green-100 text-green-700',
    warning:  'bg-amber-100 text-amber-700',
    danger:   'bg-red-100 text-red-700',
    info:     'bg-blue-100 text-blue-700',
    brand:    'text-white',
    outline:  'border text-gray-600',
  };

  const base = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold';

  if (variant === 'brand') {
    return (
      <span
        className={`${base} ${className}`}
        style={{ backgroundColor: 'var(--brand)', color: '#fff' }}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}

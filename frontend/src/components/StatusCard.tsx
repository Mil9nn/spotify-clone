import { Loader2, Upload, Trash2, Pencil } from 'lucide-react';

interface StatusCardProps {
  status: 'uploading' | 'deleting' | 'updating' | 'loading';
}

const statusConfig = {
  uploading: {
    icon: <Upload className="w-6 h-6 text-green-500 animate-pulse" />,
    text: 'Uploading...',
  },
  deleting: {
    icon: <Trash2 className="w-6 h-6 text-red-500 animate-pulse" />,
    text: 'Deleting...',
  },
  updating: {
    icon: <Pencil className="w-6 h-6 text-yellow-500 animate-pulse" />,
    text: 'Updating...',
  },
  loading: {
    icon: <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />,
    text: 'Loading...',
  },
};

export default function StatusCard({ status }: StatusCardProps) {
  const { icon, text } = statusConfig[status];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-6 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-700">
        {icon}
        <span className="text-white text-lg font-medium">{text}</span>
      </div>
    </div>
  );
}
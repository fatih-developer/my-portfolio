import { motion } from 'framer-motion';

interface AvailabilityStatusProps {
  status: 'available' | 'busy' | 'limited';
  message: string;
}

const statusConfig = {
  available: {
    label: 'Available',
    color: 'bg-green-500',
    textColor: 'text-green-500',
  },
  busy: {
    label: 'Busy',
    color: 'bg-red-500',
    textColor: 'text-red-500',
  },
  limited: {
    label: 'Limited',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
  },
};

export function AvailabilityStatus({ status, message }: AvailabilityStatusProps) {
  const config = statusConfig[status];
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-2 bg-background border rounded-full px-3 py-1 shadow-sm"
    >
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className="text-sm font-medium">{config.label}</span>
    </motion.div>
  );
}
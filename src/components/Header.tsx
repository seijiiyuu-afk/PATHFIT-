import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Shield } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function Header() {
  const { isAdmin, openLoginModal, toggleAdminPanel } = useAdmin();

  const handleLogoClick = () => {
    if (isAdmin) {
      toggleAdminPanel();
    } else {
      openLoginModal();
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-lg border-b border-purple-600/30"
    >
      <div className="max-w-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo - Secret admin access */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-purple-700/50 transition-colors cursor-pointer"
            title={isAdmin ? 'Open Admin Panel' : ''}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <BookOpen className="text-yellow-400" size={24} />
            </motion.div>
            {/* Admin indicator */}
            {isAdmin && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-900 flex items-center justify-center"
              >
                <Shield size={8} className="text-white" />
              </motion.div>
            )}
          </motion.button>

          <div>
            <h1 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              PATHFIT 2 Compendium
            </h1>
            <p className="text-purple-300 text-xs">
              Sorsogon State University &middot; College of Business and Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-purple-200 text-sm">
            <GraduationCap size={16} className="text-yellow-400" />
            <span>2nd Semester, AY 2025-2026</span>
          </div>

          {/* Flower decoration */}
          <motion.img
            src="/images/flower-small.png"
            alt=""
            className="w-8 h-8 object-contain opacity-60"
            animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.header>
  );
}

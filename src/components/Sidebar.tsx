import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FileText,
  List,
  Users,
  UserCircle,
  ClipboardCheck,
  Activity,
  Dumbbell,
  BookOpen,
  Flag,
  Flower2,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Cover Page', icon: Home },
  { path: '/abstract', label: 'Abstract', icon: FileText },
  { path: '/table-of-contents', label: 'Contents', icon: List },
  { path: '/members', label: 'Members', icon: Users },
  { path: '/student-profile', label: 'Student Profile', icon: UserCircle },
  { path: '/parq', label: 'PAR-Q Forms', icon: ClipboardCheck },
  { path: '/activities', label: 'Activities', icon: Activity },
  { path: '/individual-works', label: 'Individual Works', icon: Dumbbell },
  { path: '/reflections', label: 'Reflections', icon: BookOpen },
  { path: '/closing', label: 'Closing', icon: Flag },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-[220px] bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 shadow-xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-4 border-b border-purple-700/50">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flower2 className="text-yellow-400" size={22} />
          </motion.div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
            PATHFIT 2
          </span>
        </div>
        <p className="text-purple-300 text-xs mt-1">Compendium</p>
      </div>

      {/* Navigation */}
      <div className="p-3 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <NavLink
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-yellow-300 bg-purple-800/70 font-bold'
                    : 'text-white/80 hover:text-white hover:bg-purple-800/50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-yellow-400' : 'text-purple-400'} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400"
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <motion.img
          src="/images/flower-small.png"
          alt=""
          className="w-6 h-6 object-contain opacity-30"
          animate={{ y: [0, -3, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </nav>
  );
}

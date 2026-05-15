import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminProvider } from '@/context/AdminContext';
import Sidebar from './Sidebar';
import Header from './Header';
import FloatingFlowers from './FloatingFlowers';
import LoginModal from './LoginModal';
import AdminPanel from './AdminPanel';

export default function Layout() {
  const location = useLocation();

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        {/* Floating flower animation background */}
        <FloatingFlowers />

        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="ml-[220px] min-h-screen flex flex-col relative z-10">
          {/* Top Header with secret admin access */}
          <Header />

          {/* Login Modal */}
          <LoginModal />

          {/* Admin Panel */}
          <AdminPanel />

          {/* Page content */}
          <main className="flex-1 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-4 px-6 mt-8 relative overflow-hidden">
            {/* Footer flowers */}
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="absolute top-1 left-8 w-6 h-6 object-contain opacity-30"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="absolute bottom-1 right-8 w-5 h-5 object-contain opacity-30"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <motion.img
                  src="/images/flower-small.png"
                  alt=""
                  className="w-6 h-6 object-contain opacity-60"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <span className="text-sm text-purple-200">
                  PATHFIT 2 &middot; Group 2 &middot; Sorsogon State University
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-300 text-xs">Instructor:</span>
                <span className="text-yellow-400 text-sm font-medium">Kate Baluyot, LPT</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </AdminProvider>
  );
}

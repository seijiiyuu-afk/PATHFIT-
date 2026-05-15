import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, Eye, EyeOff, Flower2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function LoginModal() {
  const { showLoginModal, closeLoginModal, login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeLoginModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4"
          >
            {/* Flower decorations */}
            <motion.img
              src="/images/flower-corner.png"
              alt=""
              className="absolute -top-12 -left-12 w-24 h-24 object-contain opacity-60 pointer-events-none"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.img
              src="/images/flower-corner-tr.png"
              alt=""
              className="absolute -top-12 -right-12 w-24 h-24 object-contain opacity-60 pointer-events-none"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.img
              src="/images/flower-bouquet.png"
              alt=""
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 object-contain opacity-40 pointer-events-none"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Modal Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 px-6 py-5 relative">
                <button
                  onClick={closeLoginModal}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Flower2 className="text-yellow-400" size={28} />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Admin Access
                  </h2>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Flower2 className="text-yellow-400" size={28} />
                  </motion.div>
                </div>
                <p className="text-purple-200 text-sm text-center mt-1">
                  Enter your credentials to access admin mode
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50/50 text-purple-900 placeholder-purple-300"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-12 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50/50 text-purple-900 placeholder-purple-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoggingIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Lock size={18} />
                      Login as Admin
                    </>
                  )}
                </motion.button>

                {/* Hint */}
                <p className="text-center text-purple-400 text-xs">
                  Default: username &quot;tahoo&quot; / password &quot;tahoo198725&quot;
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

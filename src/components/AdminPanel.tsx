import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LogOut,
  Globe,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Shield,
  EyeOff,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';

export default function AdminPanel() {
  const {
    isAdmin,
    showAdminPanel,
    toggleAdminPanel,
    logout,
    isPublished,
    publish,
    unpublish,
    refreshData,
  } = useAdmin();

  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isAdmin || !showAdminPanel) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publish();
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    } catch (error) {
      console.error('Error publishing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setIsPublishing(true);
    try {
      await unpublish();
    } catch (error) {
      console.error('Error unpublishing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-20 right-4 z-[90] w-80 bg-white rounded-2xl shadow-2xl border border-purple-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-700 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-yellow-400" size={20} />
            <h3 className="text-white font-bold">Admin Panel</h3>
          </div>
          <button
            onClick={toggleAdminPanel}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Status */}
          <div className={`flex items-center gap-3 p-3 rounded-lg ${isPublished ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            {isPublished ? (
              <>
                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-green-700 font-medium text-sm">Site is Published</p>
                  <p className="text-green-600 text-xs">Public users see read-only version</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-yellow-700 font-medium text-sm">Site is Unpublished</p>
                  <p className="text-yellow-600 text-xs">Admin editing mode is active</p>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {!isPublished ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Globe size={16} />
                {isPublishing ? 'Publishing...' : 'Publish Site'}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnpublish}
                disabled={isPublishing}
                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <EyeOff size={16} />
                {isPublishing ? 'Unpublishing...' : 'Unpublish for Editing'}
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={refreshData}
              className="w-full py-2.5 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh Data
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="w-full py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>

          {/* Help */}
          <div className="border-t border-purple-100 pt-3">
            <p className="text-purple-400 text-xs text-center">
              Click the logo again to reopen this panel
            </p>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm text-center shadow-lg"
            >
              Site published successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

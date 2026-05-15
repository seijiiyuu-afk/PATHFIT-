import { motion } from 'framer-motion';
import { List, Home, FileText, Users, UserCircle, ClipboardCheck, Activity, Dumbbell, BookOpen, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const tocItems = [
  { num: '1', title: 'Cover Page', path: '/', icon: Home },
  { num: '2', title: 'Abstract / Introduction', path: '/abstract', icon: FileText },
  { num: '3', title: 'Table of Contents', path: '/table-of-contents', icon: List },
  { num: '4', title: 'Introduction of Members', path: '/members', icon: Users },
  { num: '5', title: 'Student Athlete Profile', path: '/student-profile', icon: UserCircle },
  { num: '6', title: 'PAR-Q Forms', path: '/parq', icon: ClipboardCheck },
  { num: '7', title: 'Activities', path: '/activities', icon: Activity },
  { num: '8', title: 'Individual Works', path: '/individual-works', icon: Dumbbell },
  { num: '9', title: 'Reflections', path: '/reflections', icon: BookOpen },
  { num: '10', title: 'Closing Paragraph', path: '/closing', icon: Flag },
];

export default function TableOfContents() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8">
      {/* Decorative flowers */}
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed top-24 right-8 w-32 h-32 object-contain opacity-30 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-purple mb-4"
          >
            <List className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">Table of Contents</h1>
          <div className="flex items-center justify-center">
            <img src="/images/flower-divider.png" alt="" className="h-6 w-auto opacity-50" />
          </div>
        </motion.div>

        {/* TOC Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-purple p-8"
        >
          <div className="space-y-3">
            {tocItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-purple-50 transition-all duration-300 group hover:shadow-md"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold text-sm shadow-sm group-hover:shadow-purple transition-shadow">
                      {item.num}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <Icon size={20} className="text-purple-500 group-hover:text-purple-700 transition-colors" />
                      <span className="text-purple-800 font-medium group-hover:text-purple-900 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-purple-600 text-xs">Go</span>
                    </div>
                  </Link>
                  {index < tocItems.length - 1 && (
                    <div className="ml-14 border-b border-purple-100" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Footer decoration */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-300" />
            <img src="/images/flower-small.png" alt="" className="w-8 h-8 object-contain opacity-50" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-300" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

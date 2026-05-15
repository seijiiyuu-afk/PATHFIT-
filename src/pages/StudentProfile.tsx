import { motion } from 'framer-motion';
import { UserCircle, CheckCircle } from 'lucide-react';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

export default function StudentProfile() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      <motion.img
        src="/images/flower-corner.png"
        alt=""
        className="fixed top-24 left-[240px] w-28 h-28 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed bottom-32 right-12 w-14 h-14 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            <UserCircle className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Student Athlete Profile"
              tag="span"
              className="section-title"
              pageId="student-profile"
              fieldId="title"
            />
          </h1>
          <div className="flex items-center justify-center mb-4">
            <motion.img
              src="/images/flower-divider.png"
              alt=""
              className="h-6 w-auto opacity-50"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="card-purple p-4 max-w-2xl mx-auto">
            <p className="text-purple-700 mb-3">
              <EditableText
                initialText="The following are the accomplished Student Athlete Profile forms of each group member. Upload the scanned copy of the accomplished Student Athlete Profile of each member."
                tag="p"
                className="text-purple-700"
                multiline
                pageId="student-profile"
                fieldId="description"
              />
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-purple-600">
              {['Clear', 'Complete', 'Properly oriented', 'Readable'].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <CheckCircle size={14} className="text-green-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="card-purple p-5 hover:shadow-purple-lg transition-all duration-300"
            >
              <h3 className="font-bold text-purple-900 mb-4 text-center">
                <EditableText
                  initialText={`[Member ${i + 1} Name] — Student Athlete Profile`}
                  tag="span"
                  className="font-bold text-purple-900"
                  pageId="student-profile"
                  fieldId={`label_${i}`}
                />
              </h3>
              <ImageUpload
                id={`student-profile-${i}`}
                label={`Upload Profile ${i + 1}`}
                aspectRatio="3/4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

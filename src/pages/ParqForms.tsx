import { motion } from 'framer-motion';
import { ClipboardCheck, Info } from 'lucide-react';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

export default function ParqForms() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed top-24 right-8 w-28 h-28 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed bottom-24 left-[260px] w-12 h-12 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
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
            <ClipboardCheck className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Physical Activity Readiness Questionnaire (PAR-Q)"
              tag="span"
              className="section-title"
              pageId="parq"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-purple p-6 mb-8 max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-3">
            <Info className="text-purple-500 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-purple-800 mb-3">
                <EditableText
                  initialText="The PAR-Q is a standard self-screening tool used to determine if an individual is physically ready to engage in exercise and physical activity."
                  tag="p"
                  className="text-purple-800"
                  multiline
                  pageId="parq"
                  fieldId="description"
                />
              </p>
              <p className="text-purple-600 text-sm">
                <EditableText
                  initialText="Upload the scanned copy of the accomplished PAR-Q form of each member. Arrange properly and label each file correctly."
                  tag="p"
                  className="text-purple-600 text-sm"
                  pageId="parq"
                  fieldId="instructions"
                />
              </p>
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
                  initialText={`[Member ${i + 1} Name] — PAR-Q Form`}
                  tag="span"
                  className="font-bold text-purple-900"
                  pageId="parq"
                  fieldId={`label_${i}`}
                />
              </h3>
              <ImageUpload
                id={`parq-${i}`}
                label={`Upload PAR-Q ${i + 1}`}
                aspectRatio="3/4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

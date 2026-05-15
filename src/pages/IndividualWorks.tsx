import { motion } from 'framer-motion';
import { Dumbbell, FileText, Route } from 'lucide-react';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

export default function IndividualWorks() {
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
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed bottom-20 right-8 w-28 h-28 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed top-1/2 left-[260px] w-12 h-12 object-contain opacity-15 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
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
            <Dumbbell className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Individual Works"
              tag="span"
              className="section-title"
              pageId="individual-works"
              fieldId="title"
            />
          </h1>
          <p className="text-purple-600 text-lg mb-2">
            <EditableText
              initialText="4-Week Training Program & Jog/Track Record"
              tag="span"
              className="text-purple-600 text-lg"
              pageId="individual-works"
              fieldId="subtitle"
            />
          </p>
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
            <p className="text-purple-700 text-sm">
              <EditableText
                initialText="The following section contains the individual 4-Week Training Programs and Jog & Track Records of each member, arranged alphabetically by surname. Upload the scanned copies — all must be complete and readable."
                tag="p"
                className="text-purple-700 text-sm"
                multiline
                pageId="individual-works"
                fieldId="description"
              />
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="card-purple p-5 hover:shadow-purple-lg transition-all duration-300"
            >
              <h3 className="font-bold text-purple-900 mb-4 text-center text-lg">
                <EditableText
                  initialText={`[Member ${i + 1} Name]`}
                  tag="span"
                  className="font-bold text-purple-900 text-lg"
                  pageId="individual-works"
                  fieldId={`member_${i}_name`}
                />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-purple-600" />
                    <h4 className="text-sm font-semibold text-purple-700">4-Week Training Program</h4>
                  </div>
                  <ImageUpload
                    id={`training-program-${i}`}
                    label="Upload Training Program"
                    aspectRatio="3/4"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Route size={16} className="text-purple-600" />
                    <h4 className="text-sm font-semibold text-purple-700">Jog & Track Record</h4>
                  </div>
                  <ImageUpload
                    id={`jog-track-${i}`}
                    label="Upload Jog & Track Record"
                    aspectRatio="3/4"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

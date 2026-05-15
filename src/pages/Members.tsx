import { motion } from 'framer-motion';
import { Users, Heart, Target } from 'lucide-react';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

export default function Members() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      {/* Many flowers */}
      <motion.img
        src="/images/flower-corner.png"
        alt=""
        className="fixed top-24 left-[240px] w-32 h-32 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="fixed bottom-20 right-8 w-40 h-40 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed top-1/3 right-16 w-14 h-14 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
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
            <Users className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Introduction of Members"
              tag="span"
              className="section-title"
              pageId="members"
              fieldId="title"
            />
          </h1>
          <div className="flex items-center justify-center mb-2">
            <motion.img
              src="/images/flower-divider.png"
              alt=""
              className="h-6 w-auto opacity-50"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <p className="text-purple-600">
            <EditableText
              initialText="Meet the team behind this compendium"
              tag="span"
              className="text-purple-600"
              pageId="members"
              fieldId="subtitle"
            />
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card-purple p-6 floral-border hover:shadow-purple-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo Upload */}
                <div className="md:w-1/3">
                  <ImageUpload
                    id={`member-photo-${i}`}
                    label={`Member ${i + 1} Photo`}
                    aspectRatio="3/4"
                  />
                </div>

                {/* Info */}
                <div className="md:w-2/3 space-y-4">
                  {/* Name */}
                  <div>
                    <h3 className="text-xl font-bold text-purple-900">
                      <EditableText
                        initialText={`[Member ${i + 1} Full Name]`}
                        tag="span"
                        className="text-xl font-bold text-purple-900"
                        pageId="members"
                        fieldId={`member_${i}_name`}
                      />
                    </h3>
                    <p className="text-purple-500 text-sm mt-1">
                      <EditableText
                        initialText="[Course/Year - e.g. BSTM 1-B]"
                        tag="span"
                        className="text-purple-500 text-sm"
                        pageId="members"
                        fieldId={`member_${i}_course`}
                      />
                    </p>
                  </div>

                  <div className="border-t border-purple-200" />

                  {/* Bio */}
                  <div>
                    <h4 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-2">
                      <Heart size={14} className="text-pink-500" />
                      Self-Introduction
                    </h4>
                    <p className="text-purple-700 text-sm leading-relaxed">
                      <EditableText
                        initialText={`Hi! I am [First Name], a [year level] student taking up [course] at Sorsogon State University. I am passionate about [hobby/interest] and I joined PATHFIT 2 to improve my endurance and maintain a healthy lifestyle. In my free time, I enjoy [hobby]. I hope to grow not just physically but also mentally through this course.`}
                        tag="span"
                        className="text-purple-700 text-sm"
                        multiline
                        pageId="members"
                        fieldId={`member_${i}_bio`}
                      />
                    </p>
                  </div>

                  {/* Hobbies & Goal */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-purple-600 mb-1">Hobbies</h4>
                      <p className="text-purple-800 text-sm">
                        <EditableText
                          initialText="[List your hobbies]"
                          tag="span"
                          className="text-purple-800 text-sm"
                          pageId="members"
                          fieldId={`member_${i}_hobbies`}
                        />
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-purple-600 mb-1 flex items-center gap-1">
                        <Target size={12} />
                        Fitness Goal
                      </h4>
                      <p className="text-purple-800 text-sm">
                        <EditableText
                          initialText="[Your fitness goal]"
                          tag="span"
                          className="text-purple-800 text-sm"
                          pageId="members"
                          fieldId={`member_${i}_goal`}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import EditableText from '@/components/EditableText';

export default function Abstract() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      {/* Many decorative flowers */}
      <motion.img
        src="/images/flower-corner.png"
        alt=""
        className="fixed top-24 left-[240px] w-32 h-32 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed bottom-20 right-8 w-32 h-32 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed top-1/2 right-12 w-16 h-16 object-contain opacity-15 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
            <FileText className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Abstract"
              tag="span"
              className="section-title"
              pageId="abstract"
              fieldId="title"
            />
          </h1>
          <div className="flex items-center justify-center">
            <motion.img
              src="/images/flower-divider.png"
              alt=""
              className="h-6 w-auto opacity-50"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Abstract Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-purple p-8 md:p-10 floral-border"
        >
          <div className="text-purple-800 leading-relaxed text-lg space-y-6">
            <p>
              <EditableText
                initialText="This compendium was created to summarize and document the different physical fitness activities and exercises that were conducted throughout the training sessions. Its purpose is to provide an organized collection of information, experiences, and learnings about the importance of maintaining physical fitness and improving overall health. The activities included cardio endurance, flexibility, balance and coordination, agility, speed, muscular endurance, and core strength exercises, all of which helped develop different aspects of physical performance. Through these activities, we learned the importance of proper exercise, teamwork, discipline, and consistency in achieving physical fitness goals."
                tag="p"
                className="text-purple-800 leading-relaxed text-lg"
                multiline
                pageId="abstract"
                fieldId="paragraph1"
              />
            </p>
            <p>
              <EditableText
                initialText="We also experienced how different exercises challenge the body in different ways, helping us improve our stamina, body control, strength, and focus. Some activities were difficult at first, but with practice and determination, we became more confident and physically active. Physical fitness and training are important because they help maintain a healthy body, reduce the risk of illnesses, improve mental well-being, and develop discipline and confidence in everyday life."
                tag="p"
                className="text-purple-800 leading-relaxed text-lg"
                multiline
                pageId="abstract"
                fieldId="paragraph2"
              />
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-300" />
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="w-8 h-8 object-contain opacity-50"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-300" />
          </div>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: 'Cardio Endurance', desc: 'Building stamina through running and aerobic exercises' },
            { title: 'Flexibility', desc: 'Improving range of motion through stretching routines' },
            { title: 'Core Strength', desc: 'Developing abdominal and back muscle strength' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="card-purple p-5 text-center hover:shadow-purple-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-bold text-purple-900 mb-2">
                <EditableText
                  initialText={item.title}
                  tag="span"
                  className="font-bold text-purple-900"
                  pageId="abstract"
                  fieldId={`key_${index}`}
                />
              </h3>
              <p className="text-purple-600 text-sm">
                <EditableText
                  initialText={item.desc}
                  tag="span"
                  className="text-purple-600 text-sm"
                  pageId="abstract"
                  fieldId={`key_desc_${index}`}
                />
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

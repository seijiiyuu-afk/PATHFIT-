import { motion } from 'framer-motion';
import { Flag, Heart, Users, Award } from 'lucide-react';
import EditableText from '@/components/EditableText';

export default function Closing() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      {/* Many background flowers */}
      <motion.img
        src="/images/flower-wreath.png"
        alt=""
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain opacity-10 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-corner.png"
        alt=""
        className="fixed top-24 left-[240px] w-32 h-32 object-contain opacity-30 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed bottom-20 right-8 w-32 h-32 object-contain opacity-30 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="fixed top-1/4 right-12 w-24 h-24 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed bottom-1/3 left-[260px] w-12 h-12 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
            <Flag className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Closing Paragraph"
              tag="span"
              className="section-title"
              pageId="closing"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-purple p-8 md:p-12 floral-border"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-4"
            >
              <Heart className="text-purple-600" size={36} />
            </motion.div>
          </div>

          <div className="space-y-6 text-purple-800 leading-relaxed text-lg">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <EditableText
                initialText="As we conclude this compendium, we look back with pride and gratitude on everything we have accomplished as a group in PATHFIT 2. This journey was not always easy, but it was meaningful. Each activity, training session, and written output pushed us to become more disciplined, more committed, and more aware of the importance of physical fitness in our daily lives."
                tag="p"
                className="text-purple-800 leading-relaxed text-lg"
                multiline
                pageId="closing"
                fieldId="paragraph1"
              />
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <EditableText
                initialText="This compendium is a testament to our hard work, cooperation, and dedication as a team. We learned that fitness is a personal journey, but it becomes more fulfilling when shared with others who support and motivate you. We are thankful to our instructor, Ms. Kate Baluyot, LPT, for guiding us throughout the semester with patience and encouragement."
                tag="p"
                className="text-purple-800 leading-relaxed text-lg"
                multiline
                pageId="closing"
                fieldId="paragraph2"
              />
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <EditableText
                initialText="As we move forward, we carry with us not just the physical gains from our training, but also the life lessons of perseverance, teamwork, and self-care. We hope that this compendium reflects the effort and sincerity we put into every requirement, and that it serves as a reminder of the growth we achieved together in PATHFIT 2."
                tag="p"
                className="text-purple-800 leading-relaxed text-lg"
                multiline
                pageId="closing"
                fieldId="paragraph3"
              />
            </motion.p>
          </div>

          <div className="my-8 flex items-center justify-center gap-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-300" />
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="w-10 h-10 object-contain"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-300" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              <EditableText
                initialText="Thank You!"
                tag="span"
                className="text-4xl font-bold text-purple-900"
                pageId="closing"
                fieldId="thankyou"
              />
            </h2>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Users size={18} />
              <span>Group 2 &middot; PATHFIT 2 &middot; Sorsogon State University</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: Users, label: 'Group Members', value: '9' },
            { icon: Award, label: 'Activities Completed', value: '[X]' },
            { icon: Heart, label: 'Semester', value: '2nd' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="card-purple p-5 text-center hover:shadow-purple-lg transition-all duration-300"
              >
                <Icon className="text-purple-500 mx-auto mb-2" size={28} />
                <p className="text-3xl font-bold text-purple-900 mb-1">{stat.value}</p>
                <p className="text-purple-600 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

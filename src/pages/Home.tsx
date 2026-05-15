import { motion } from 'framer-motion';
import { BookOpen, Users, GraduationCap, Calendar } from 'lucide-react';
import EditableText from '@/components/EditableText';

export default function Home() {
  return (
    <div className="page-container min-h-[calc(100vh-120px)] flex items-center justify-center py-8 relative">
      {/* Many decorative flowers */}
      <motion.img
        src="/images/flower-corner.png"
        alt=""
        className="absolute top-0 left-4 w-40 h-40 object-contain opacity-30 flower-decoration pointer-events-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="absolute top-0 right-4 w-40 h-40 object-contain opacity-30 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="absolute bottom-20 left-4 w-32 h-32 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="absolute bottom-20 right-4 w-32 h-32 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="absolute top-1/3 left-8 w-16 h-16 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="absolute top-1/2 right-8 w-14 h-14 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -6, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Flower wreath at top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="mb-6"
        >
          <motion.img
            src="/images/flower-wreath.png"
            alt=""
            className="w-48 h-48 mx-auto object-contain"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-purple-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            <EditableText
              initialText="PATHFIT 2"
              tag="span"
              className="text-6xl md:text-7xl font-bold text-purple-900"
              pageId="home"
              fieldId="title"
            />
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.img
              src="/images/flower-divider.png"
              alt=""
              className="h-8 w-auto opacity-60"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <h2 className="text-2xl md:text-3xl text-purple-700 font-medium">
            <EditableText
              initialText="Compendium"
              tag="span"
              className="text-2xl md:text-3xl text-purple-700 font-medium"
              pageId="home"
              fieldId="subtitle"
            />
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="card-purple p-6 mb-8 max-w-2xl mx-auto"
        >
          <p className="text-lg text-purple-800 mb-4">
            <EditableText
              initialText="A Collection of Physical Fitness Activities and Training Programs"
              tag="span"
              className="text-lg text-purple-800"
              pageId="home"
              fieldId="description"
            />
          </p>
          <div className="border-t border-purple-200 pt-4">
            <p className="text-purple-600">
              <EditableText
                initialText="Physical Activity Towards Health and Fitness 2"
                tag="span"
                className="text-purple-600"
                pageId="home"
                fieldId="course"
              />
            </p>
          </div>

          {/* Flower divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-300" />
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="w-6 h-6 object-contain opacity-40"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-300" />
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, label: 'Group', field: 'Group 2', fieldId: 'group' },
            { icon: GraduationCap, label: 'Instructor', field: 'Kate Baluyot, LPT', fieldId: 'instructor' },
            { icon: Calendar, label: 'Semester', field: '2nd Sem, AY 2025-2026', fieldId: 'semester' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="card-purple p-4 flex items-center gap-3 hover:shadow-purple-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={24} className="text-purple-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-purple-500">{item.label}</p>
                  <p className="font-bold text-purple-900">
                    <EditableText
                      initialText={item.field}
                      tag="span"
                      className="font-bold text-purple-900"
                      pageId="home"
                      fieldId={item.fieldId}
                    />
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Members List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="card-purple p-6 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center justify-center gap-2">
            <BookOpen size={20} className="text-purple-600" />
            Members
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {Array.from({ length: 9 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.08 }}
                className="text-purple-700 text-sm py-2 px-3 bg-purple-50 rounded hover:bg-purple-100 transition-colors"
              >
                <EditableText
                  initialText={`[Member ${i + 1} Full Name]`}
                  tag="span"
                  className="text-purple-700 text-sm"
                  pageId="home"
                  fieldId={`member_${i}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom flower */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-300" />
            <motion.img
              src="/images/flower-small.png"
              alt=""
              className="w-5 h-5 object-contain opacity-40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-300" />
          </div>
        </motion.div>

        {/* School Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-purple-600 text-sm">
            <EditableText
              initialText="Sorsogon State University"
              tag="span"
              className="text-purple-600 text-sm"
              pageId="home"
              fieldId="school"
            />
          </p>
          <p className="text-purple-500 text-sm">
            <EditableText
              initialText="College of Business and Management — Sorsogon City Campus"
              tag="span"
              className="text-purple-500 text-sm"
              pageId="home"
              fieldId="college"
            />
          </p>
        </motion.div>
      </div>
    </div>
  );
}

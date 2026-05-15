import { motion } from 'framer-motion';
import { BookOpen, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ReflectionData } from '@/context/AdminContext';
import { useAdmin } from '@/context/AdminContext';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

const defaultReflections: ReflectionData[] = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  name: `[Member ${i + 1} Full Name]`,
  content: `Throughout my journey in PATHFIT 2, I experienced both physical and personal challenges that helped me grow in many ways. At the beginning of the semester, I found it difficult to maintain a consistent workout routine, but as the weeks went by, I learned to push through my limits and stay committed to my goals.\n\nThe activities we did as a group and individually taught me the value of discipline, consistency, and perseverance. I realized that physical fitness is not just about the body \u2014 it is also about mental strength and determination. One of my most memorable moments was completing the 4-week training program, which made me proud of how far I had come.\n\nLooking back, I am grateful for the experiences this course gave me. I now have a deeper appreciation for physical activity and its role in maintaining a healthy and balanced lifestyle. I will carry these learnings with me beyond this class.`,
}));

export default function Reflections() {
  const { siteData } = useAdmin();
  const [reflections, setReflections] = useState<ReflectionData[]>(defaultReflections);

  useEffect(() => {
    if (siteData?.reflections) {
      setReflections(siteData.reflections);
    }
  }, [siteData]);

  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="fixed top-24 left-[240px] w-32 h-32 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-corner-tr.png"
        alt=""
        className="fixed bottom-20 right-8 w-32 h-32 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed top-1/2 right-12 w-14 h-14 object-contain opacity-15 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
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
            <BookOpen className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Reflections"
              tag="span"
              className="section-title"
              pageId="reflections"
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
              initialText="Personal reflections from each member"
              tag="span"
              className="text-purple-600"
              pageId="reflections"
              fieldId="subtitle"
            />
          </p>
        </motion.div>

        <div className="space-y-8">
          {reflections.map((reflection, index) => (
            <motion.div
              key={reflection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card-purple p-6 md:p-8 floral-border hover:shadow-purple-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-purple flex-shrink-0">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-purple-900">
                    <EditableText
                      initialText={reflection.name}
                      tag="span"
                      className="text-xl font-bold text-purple-900"
                      pageId="reflections"
                      fieldId={`reflection_${index}_name`}
                    />
                  </h2>
                  <p className="text-purple-500 text-sm">Personal Reflection</p>
                </div>
              </div>

              <div className="mb-6 max-w-xs mx-auto">
                <ImageUpload
                  id={`reflection-photo-${reflection.id}`}
                  label={`${reflection.name}'s Photo`}
                  aspectRatio="1/1"
                />
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-purple-300" size={24} />
                <div className="pl-6 text-purple-800 leading-relaxed space-y-4">
                  <EditableText
                    initialText={reflection.content}
                    tag="div"
                    className="text-purple-800 leading-relaxed"
                    multiline
                    pageId="reflections"
                    fieldId={`reflection_${index}_content`}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
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
          ))}
        </div>
      </div>
    </div>
  );
}

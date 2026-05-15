import { motion } from 'framer-motion';
import { Activity, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import type { ActivityData } from '@/context/AdminContext';
import EditableText from '@/components/EditableText';
import ImageUpload from '@/components/ImageUpload';

const defaultActivities: ActivityData[] = [
  {
    id: 1,
    title: '[Activity 1 - Title]',
    description: 'This activity focused on [description of activity]. The objective was to [objective]. As a group, we learned [learnings and experiences].',
    objectives: '[List objectives]',
    learnings: '[What did you learn?]',
    imageUrl: '',
  },
  {
    id: 2,
    title: '[Activity 2 - Title]',
    description: 'This activity focused on [description of activity]. The objective was to [objective]. As a group, we learned [learnings and experiences].',
    objectives: '[List objectives]',
    learnings: '[What did you learn?]',
    imageUrl: '',
  },
  {
    id: 3,
    title: '[Activity 3 - Title]',
    description: 'This activity focused on [description of activity]. The objective was to [objective]. As a group, we learned [learnings and experiences].',
    objectives: '[List objectives]',
    learnings: '[What did you learn?]',
    imageUrl: '',
  },
];

export default function Activities() {
  const { isAdmin, siteData, saveSite } = useAdmin();
  const [activities, setActivities] = useState<ActivityData[]>(defaultActivities);

  // Load from localStorage via context
  useEffect(() => {
    if (siteData?.activities) {
      setActivities(siteData.activities);
    }
  }, [siteData]);

  const addActivity = () => {
    const newActivity: ActivityData = {
      id: Date.now(),
      title: '[New Activity Title]',
      description: 'Describe the activity, its objectives, and what the group learned...',
      objectives: '[List objectives]',
      learnings: '[What did you learn?]',
      imageUrl: '',
    };
    const updated = [...activities, newActivity];
    setActivities(updated);
    saveSite({ activities: updated });
  };

  const handleImageUpload = async (id: number, url: string) => {
    const updated = activities.map(a => a.id === id ? { ...a, imageUrl: url } : a);
    setActivities(updated);
    await saveSite({ activities: updated });
  };

  return (
    <div className="page-container min-h-[calc(100vh-120px)] py-8 relative">
      <motion.img
        src="/images/flower-bouquet.png"
        alt=""
        className="fixed top-24 right-8 w-36 h-36 object-contain opacity-25 flower-decoration pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.img
        src="/images/flower-small.png"
        alt=""
        className="fixed bottom-20 left-[260px] w-12 h-12 object-contain opacity-20 flower-decoration pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, 15, -15, 0] }}
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
            <Activity className="text-white" size={32} />
          </motion.div>
          <h1 className="section-title mb-2">
            <EditableText
              initialText="Activities"
              tag="span"
              className="section-title"
              pageId="activities"
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
              initialText="Document of group activities and experiences"
              tag="span"
              className="text-purple-600"
              pageId="activities"
              fieldId="subtitle"
            />
          </p>
        </motion.div>

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-center"
          >
            <button
              onClick={addActivity}
              className="btn-purple inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add New Activity
            </button>
          </motion.div>
        )}

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card-purple p-6 floral-border hover:shadow-purple-lg transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                <EditableText
                  initialText={activity.title}
                  tag="span"
                  className="text-2xl font-bold text-purple-900"
                  pageId="activities"
                  fieldId={`activity_${activity.id}_title`}
                />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ImageUpload
                    id={`activity-${activity.id}`}
                    label="Insert photo/screenshot here"
                    aspectRatio="16/9"
                    defaultImage={activity.imageUrl}
                    onUpload={(url) => handleImageUpload(activity.id, url)}
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-purple-600 mb-2">Description</h3>
                  <div className="text-purple-800 leading-relaxed mb-4">
                    <EditableText
                      initialText={activity.description}
                      tag="p"
                      className="text-purple-800 leading-relaxed"
                      multiline
                      pageId="activities"
                      fieldId={`activity_${activity.id}_desc`}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-purple-600 mb-1">Objectives</h4>
                      <p className="text-purple-700 text-sm">
                        <EditableText
                          initialText={activity.objectives}
                          tag="span"
                          className="text-purple-700 text-sm"
                          multiline
                          pageId="activities"
                          fieldId={`activity_${activity.id}_obj`}
                        />
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-purple-600 mb-1">Learnings</h4>
                      <p className="text-purple-700 text-sm">
                        <EditableText
                          initialText={activity.learnings}
                          tag="span"
                          className="text-purple-700 text-sm"
                          multiline
                          pageId="activities"
                          fieldId={`activity_${activity.id}_learn`}
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

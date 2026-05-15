import { useState, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';

interface EditableTextProps {
  initialText: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  pageId?: string;
  fieldId?: string;
  multiline?: boolean;
}

export default function EditableText({
  initialText,
  className = '',
  tag: Tag = 'div',
  pageId,
  fieldId,
  multiline = false,
}: EditableTextProps) {
  const { isAdmin, isPublished, pageContent, saveContent } = useAdmin();
  const canEdit = isAdmin && !isPublished;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [showHint, setShowHint] = useState(false);

  // Load saved content from localStorage via context
  useEffect(() => {
    if (pageId && fieldId && pageContent[pageId]?.[fieldId]) {
      setText(pageContent[pageId][fieldId]);
    }
  }, [pageId, fieldId, pageContent]);

  // Also load directly from localStorage on mount (in case context hasn't loaded)
  useEffect(() => {
    if (pageId && fieldId) {
      try {
        const raw = localStorage.getItem('pathfit2_page_content');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed[pageId]?.[fieldId]) {
            setText(parsed[pageId][fieldId]);
          }
        }
      } catch { /* ignore */ }
    }
  }, [pageId, fieldId]);

  const handleSave = async () => {
    setIsEditing(false);
    if (pageId && fieldId) {
      await saveContent(pageId, fieldId, text);
    }
    // Also save to localStorage directly as backup
    if (pageId && fieldId) {
      const key = `editable-${pageId}-${fieldId}`;
      localStorage.setItem(key, text);
    }
  };

  const handleCancel = () => {
    if (pageId && fieldId && pageContent[pageId]?.[fieldId]) {
      setText(pageContent[pageId][fieldId]);
    } else {
      setText(initialText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Public view - just show text (render newlines for multiline)
  if (!canEdit) {
    if (multiline) {
      return (
        <Tag className={className}>
          {text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </Tag>
      );
    }
    return <Tag className={className}>{text}</Tag>;
  }

  // Admin edit view
  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative inline-block w-full"
      >
        <div className="relative">
          {multiline ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} w-full resize-y min-h-[100px] border-2 border-purple-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white shadow-lg`}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${className} w-full border-2 border-purple-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white shadow-lg`}
              autoFocus
            />
          )}
          {/* Save/Cancel buttons */}
          <div className="absolute -bottom-8 right-0 flex items-center gap-1 z-20">
            <button
              onClick={handleSave}
              className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
              title="Save"
            >
              <Save size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
              title="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`relative group inline-block w-full ${className}`}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      onClick={() => setIsEditing(true)}
    >
      <Tag className="cursor-text border-2 border-transparent group-hover:border-purple-300 group-hover:bg-purple-50/30 rounded transition-all duration-200 px-1">
        {multiline ? text.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
          </span>
        )) : text}
      </Tag>
      <AnimatePresence>
        {showHint && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-7 right-0 flex items-center gap-1 text-xs text-purple-600 bg-white px-2 py-1 rounded shadow-md border border-purple-200 z-10"
          >
            <Pencil size={10} />
            Click to edit
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

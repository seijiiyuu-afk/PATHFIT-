import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ====== TYPES ======
export interface MemberData {
  id: number;
  name: string;
  course: string;
  bio: string;
  hobbies: string;
  goal: string;
  photoUrl: string;
  studentProfileUrl: string;
  parqUrl: string;
  trainingProgramUrl: string;
  jogTrackUrl: string;
  reflectionPhotoUrl: string;
}

export interface ActivityData {
  id: number;
  title: string;
  description: string;
  objectives: string;
  learnings: string;
  imageUrl: string;
}

export interface ReflectionData {
  id: number;
  name: string;
  content: string;
}

export interface SiteData {
  published: boolean;
  publishDate?: string;
  members: MemberData[];
  activities: ActivityData[];
  reflections: ReflectionData[];
}

export interface PageContent {
  [pageId: string]: {
    [fieldId: string]: string;
  };
}

interface AdminContextType {
  isAdmin: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  isPublished: boolean;
  siteData: SiteData | null;
  pageContent: PageContent;
  showLoginModal: boolean;
  showAdminPanel: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleAdminPanel: () => void;
  publish: () => Promise<void>;
  unpublish: () => Promise<void>;
  refreshData: () => Promise<void>;
  saveContent: (pageId: string, fieldId: string, value: string) => Promise<void>;
  saveSite: (data: Partial<SiteData>) => Promise<void>;
  saveImage: (id: string, base64Url: string) => Promise<void>;
  getImage: (id: string) => string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ====== LOCAL STORAGE KEYS ======
const AUTH_KEY = 'pathfit2_admin_auth';
const CONTENT_KEY = 'pathfit2_page_content';
const IMAGES_KEY = 'pathfit2_images';
const SITE_KEY = 'pathfit2_site_data';
const PUBLISH_KEY = 'pathfit2_published';

// ====== CREDENTIALS ======
const ADMIN_USERNAME = 'tahoo';
const ADMIN_PASSWORD = 'tahoo198725';

// ====== LOCAL STORAGE HELPERS ======
const lsGet = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const lsSet = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage save error:', e);
  }
};

// ====== DEFAULT DATA ======
const defaultSiteData = (): SiteData => ({
  published: false,
  members: Array.from({ length: 9 }, (_, i) => ({
    id: i,
    name: `[Member ${i + 1} Full Name]`,
    course: '[Course/Year - e.g. BSTM 1-B]',
    bio: `Hi! I am [First Name], a [year level] student taking up [course] at Sorsogon State University. I am passionate about [hobby/interest] and I joined PATHFIT 2 to improve my endurance and maintain a healthy lifestyle. In my free time, I enjoy [hobby]. I hope to grow not just physically but also mentally through this course.`,
    hobbies: '[List your hobbies]',
    goal: '[Your fitness goal - e.g. Build stamina]',
    photoUrl: '',
    studentProfileUrl: '',
    parqUrl: '',
    trainingProgramUrl: '',
    jogTrackUrl: '',
    reflectionPhotoUrl: '',
  })),
  activities: [
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
  ],
  reflections: Array.from({ length: 9 }, (_, i) => ({
    id: i,
    name: `[Member ${i + 1} Full Name]`,
    content: `Throughout my journey in PATHFIT 2, I experienced both physical and personal challenges that helped me grow in many ways. At the beginning of the semester, I found it difficult to maintain a consistent workout routine, but as the weeks went by, I learned to push through my limits and stay committed to my goals.\n\nThe activities we did as a group and individually taught me the value of discipline, consistency, and perseverance. I realized that physical fitness is not just about the body \u2014 it is also about mental strength and determination. One of my most memorable moments was completing the 4-week training program, which made me proud of how far I had come.\n\nLooking back, I am grateful for the experiences this course gave me. I now have a deeper appreciation for physical activity and its role in maintaining a healthy and balanced lifestyle. I will carry these learnings with me beyond this class.`,
  })),
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const init = () => {
      setIsLoading(true);

      // Check existing auth
      const auth = lsGet<{ loggedIn: boolean; timestamp: number }>(AUTH_KEY, { loggedIn: false, timestamp: 0 });
      const isAuthValid = auth.loggedIn && Date.now() - auth.timestamp < 24 * 60 * 60 * 1000;
      if (isAuthValid) {
        setIsLoggedIn(true);
        setIsAdmin(true);
      }

      // Load publish status
      setIsPublished(lsGet<boolean>(PUBLISH_KEY, false));

      // Load page content
      setPageContent(lsGet<PageContent>(CONTENT_KEY, {}));

      // Load site data (initialize defaults if none)
      const savedSite = lsGet<SiteData | null>(SITE_KEY, null);
      if (savedSite) {
        setSiteData(savedSite);
      } else {
        const defaults = defaultSiteData();
        setSiteData(defaults);
        lsSet(SITE_KEY, defaults);
      }

      setIsLoading(false);
    };
    init();
  }, []);

  const refreshData = useCallback(async () => {
    try {
      setIsPublished(lsGet<boolean>(PUBLISH_KEY, false));
      setPageContent(lsGet<PageContent>(CONTENT_KEY, {}));
      const savedSite = lsGet<SiteData | null>(SITE_KEY, null);
      if (savedSite) setSiteData(savedSite);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setShowLoginModal(false);
        lsSet(AUTH_KEY, { loggedIn: true, timestamp: Date.now() });
        await refreshData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [refreshData]);

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowAdminPanel(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const openLoginModal = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  const toggleAdminPanel = useCallback(() => {
    setShowAdminPanel(prev => !prev);
  }, []);

  const publish = useCallback(async () => {
    setIsPublished(true);
    lsSet(PUBLISH_KEY, true);
  }, []);

  const unpublish = useCallback(async () => {
    setIsPublished(false);
    lsSet(PUBLISH_KEY, false);
  }, []);

  const saveContent = useCallback(async (pageId: string, fieldId: string, value: string) => {
    const updated = { ...pageContent };
    if (!updated[pageId]) updated[pageId] = {};
    updated[pageId][fieldId] = value;
    setPageContent(updated);
    lsSet(CONTENT_KEY, updated);
  }, [pageContent]);

  const saveSite = useCallback(async (data: Partial<SiteData>) => {
    const updated = siteData ? { ...siteData, ...data } : null;
    setSiteData(updated);
    if (updated) lsSet(SITE_KEY, updated);
  }, [siteData]);

  const saveImage = useCallback(async (id: string, base64Url: string) => {
    const images = lsGet<Record<string, string>>(IMAGES_KEY, {});
    images[id] = base64Url;
    lsSet(IMAGES_KEY, images);
  }, []);

  const getImage = useCallback((id: string): string | null => {
    const images = lsGet<Record<string, string>>(IMAGES_KEY, {});
    return images[id] || null;
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoggedIn,
        isLoading,
        isPublished,
        siteData,
        pageContent,
        showLoginModal,
        showAdminPanel,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
        toggleAdminPanel,
        publish,
        unpublish,
        refreshData,
        saveContent,
        saveSite,
        saveImage,
        getImage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export default AdminContext;

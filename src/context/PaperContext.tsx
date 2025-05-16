import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type PaperCategory = 'past_paper' | 'model_paper';
export type PaperSubject = 'mathematics' | 'physics' | 'chemistry' | 'biology' | 'english' | 'history';
export type PaperGrade = '9' | '10' | '11' | '12';

export interface Paper {
  id: string;
  title: string;
  description: string;
  category: PaperCategory;
  subject: PaperSubject;
  grade: PaperGrade;
  fileUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  uploadedBy: string;
  downloads: number;
}

interface PaperContextType {
  papers: Paper[];
  filteredPapers: Paper[];
  loading: boolean;
  addPaper: (paper: Omit<Paper, 'id' | 'uploadDate' | 'downloads'>) => void;
  deletePaper: (id: string) => void;
  filterPapers: (filters: {
    category?: PaperCategory;
    subject?: PaperSubject;
    grade?: PaperGrade;
    search?: string;
  }) => void;
  incrementDownloads: (id: string) => void;
}

// Mock paper data
const MOCK_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'Mathematics Grade 10 Past Paper 2024',
    description: 'Final examination past paper for Grade 10 Mathematics from 2024',
    category: 'past_paper',
    subject: 'mathematics',
    grade: '10',
    fileUrl: '/papers/math_g10_2024.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg',
    uploadDate: '2024-05-15',
    uploadedBy: 'Admin User',
    downloads: 45
  },
  {
    id: '2',
    title: 'Physics Model Paper for Grade 12',
    description: 'Comprehensive model paper for Grade 12 Physics final examination preparation',
    category: 'model_paper',
    subject: 'physics',
    grade: '12',
    fileUrl: '/papers/physics_g12_model.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/2698519/pexels-photo-2698519.jpeg',
    uploadDate: '2024-04-20',
    uploadedBy: 'Admin User',
    downloads: 67
  },
  {
    id: '3',
    title: 'English Literature Past Paper 2023',
    description: 'Past paper for Grade 11 English Literature from 2023 finals',
    category: 'past_paper',
    subject: 'english',
    grade: '11',
    fileUrl: '/papers/english_g11_2023.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
    uploadDate: '2024-03-10',
    uploadedBy: 'Admin User',
    downloads: 32
  },
  {
    id: '4',
    title: 'Chemistry Model Paper Grade 10',
    description: 'Model paper for Grade 10 Chemistry with answers and explanations',
    category: 'model_paper',
    subject: 'chemistry',
    grade: '10',
    fileUrl: '/papers/chemistry_g10_model.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    uploadDate: '2024-05-02',
    uploadedBy: 'Admin User',
    downloads: 28
  },
  {
    id: '5',
    title: 'Biology Past Paper Grade 12 2024',
    description: 'Past examination paper for Biology Grade 12 from 2024 session',
    category: 'past_paper',
    subject: 'biology',
    grade: '12',
    fileUrl: '/papers/biology_g12_2024.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
    uploadDate: '2024-06-01',
    uploadedBy: 'Admin User',
    downloads: 56
  },
  {
    id: '6',
    title: 'History Model Paper Grade 11',
    description: 'Comprehensive model paper for History Grade 11 final examinations',
    category: 'model_paper',
    subject: 'history',
    grade: '11',
    fileUrl: '/papers/history_g11_model.pdf',
    thumbnailUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    uploadDate: '2024-04-15',
    uploadedBy: 'Admin User',
    downloads: 19
  }
];

// Create the context
const PaperContext = createContext<PaperContextType | undefined>(undefined);

// Paper provider component
export const PaperProvider = ({ children }: { children: ReactNode }) => {
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [loading, setLoading] = useState(false);

  // Add new paper
  const addPaper = (paperData: Omit<Paper, 'id' | 'uploadDate' | 'downloads'>) => {
    setLoading(true);
    
    // Create new paper with generated ID and current date
    const newPaper: Paper = {
      ...paperData,
      id: Math.random().toString(36).substr(2, 9),
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0
    };
    
    // Add to papers list
    setPapers(prev => [newPaper, ...prev]);
    setFilteredPapers(prev => [newPaper, ...prev]);
    
    setLoading(false);
  };

  // Delete paper
  const deletePaper = (id: string) => {
    setLoading(true);
    
    // Remove paper with matching ID
    setPapers(prev => prev.filter(paper => paper.id !== id));
    setFilteredPapers(prev => prev.filter(paper => paper.id !== id));
    
    setLoading(false);
  };

  // Filter papers
  const filterPapers = (filters: {
    category?: PaperCategory;
    subject?: PaperSubject;
    grade?: PaperGrade;
    search?: string;
  }) => {
    setLoading(true);
    
    let result = [...papers];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(paper => paper.category === filters.category);
    }
    
    // Apply subject filter
    if (filters.subject) {
      result = result.filter(paper => paper.subject === filters.subject);
    }
    
    // Apply grade filter
    if (filters.grade) {
      result = result.filter(paper => paper.grade === filters.grade);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        paper => 
          paper.title.toLowerCase().includes(searchLower) ||
          paper.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredPapers(result);
    setLoading(false);
  };

  // Increment downloads count
  const incrementDownloads = (id: string) => {
    setPapers(prev => 
      prev.map(paper => 
        paper.id === id 
          ? { ...paper, downloads: paper.downloads + 1 } 
          : paper
      )
    );
    
    setFilteredPapers(prev => 
      prev.map(paper => 
        paper.id === id 
          ? { ...paper, downloads: paper.downloads + 1 } 
          : paper
      )
    );
  };

  const value = {
    papers,
    filteredPapers,
    loading,
    addPaper,
    deletePaper,
    filterPapers,
    incrementDownloads
  };

  return <PaperContext.Provider value={value}>{children}</PaperContext.Provider>;
};

// Custom hook to use papers context
export const usePapers = () => {
  const context = useContext(PaperContext);
  if (context === undefined) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
};

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import ContentCard, { ContentItem } from '@/components/ContentCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    author: 'Dr. Sarah Johnson',
    type: 'book',
    subject: 'Mathematics',
    level: 'undergraduate',
    description: 'A comprehensive guide to differential and integral calculus, covering limits, derivatives, and integrals with practical examples.',
    uploadDate: '2023-09-15',
    downloads: 1245,
    fileUrl: '/files/intro-calculus.pdf'
  },
  {
    id: '2',
    title: 'Advanced Cell Biology Notes',
    author: 'Prof. Michael Chen',
    type: 'notes',
    subject: 'Biology',
    level: 'graduate',
    description: 'Detailed notes on cell structure, organelles, cell division, and cellular communication mechanisms.',
    uploadDate: '2023-10-02',
    downloads: 873,
    fileUrl: '/files/cell-biology.pdf'
  },
  {
    id: '3',
    title: 'World History: The Modern Era',
    author: 'Dr. Emily Thompson',
    type: 'book',
    subject: 'History',
    level: 'high_school',
    description: 'A comprehensive textbook covering major historical events from the 18th century to the present day.',
    uploadDate: '2023-08-20',
    downloads: 2156,
    fileUrl: '/files/world-history.pdf'
  },
  {
    id: '4',
    title: 'Organic Chemistry Reaction Mechanisms',
    author: 'Dr. Robert Miller',
    type: 'notes',
    subject: 'Chemistry',
    level: 'undergraduate',
    description: 'Study notes detailing common organic chemistry reaction mechanisms, including nucleophilic substitution, elimination, and addition reactions.',
    uploadDate: '2023-09-28',
    downloads: 1462,
    fileUrl: '/files/organic-chemistry.pdf'
  },
  {
    id: '5',
    title: 'Quantum Physics and Applications',
    author: 'Prof. Lisa Zhang',
    type: 'book',
    subject: 'Physics',
    level: 'graduate',
    description: 'An exploration of quantum mechanics principles and their applications in modern technology and research.',
    uploadDate: '2023-07-10',
    downloads: 987,
    fileUrl: '/files/quantum-physics.pdf'
  },
  {
    id: '6',
    title: 'Literary Analysis Techniques',
    author: 'Prof. James Wilson',
    type: 'notes',
    subject: 'Literature',
    level: 'undergraduate',
    description: 'Comprehensive notes on approaches to analyzing literature, including character analysis, theme identification, and symbolic interpretation.',
    uploadDate: '2023-10-15',
    downloads: 645,
    fileUrl: '/files/literary-analysis.pdf'
  },
  {
    id: '7',
    title: 'Research Paper: Climate Change Impact',
    author: 'Dr. Elena Rodriguez',
    type: 'paper',
    subject: 'Environmental Science',
    level: 'graduate',
    description: 'A research paper examining the current and projected impacts of climate change on ecosystems and human societies.',
    uploadDate: '2023-09-05',
    downloads: 1832,
    fileUrl: '/files/climate-research.pdf'
  },
  {
    id: '8',
    title: 'Introduction to Programming with Python',
    author: 'Prof. Alex Turner',
    type: 'book',
    subject: 'Computer Science',
    level: 'high_school',
    description: 'A beginner-friendly guide to programming concepts using Python, with practical exercises and examples.',
    uploadDate: '2023-08-30',
    downloads: 3254,
    fileUrl: '/files/python-intro.pdf'
  }
];

// Filter options
const SUBJECTS = [
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'biology', label: 'Biology' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'physics', label: 'Physics' },
  { id: 'computer-science', label: 'Computer Science' },
  { id: 'literature', label: 'Literature' },
  { id: 'history', label: 'History' },
  { id: 'environmental-science', label: 'Environmental Science' }
];

const CONTENT_TYPES = [
  { id: 'book', label: 'Books' },
  { id: 'notes', label: 'Notes' },
  { id: 'paper', label: 'Papers' }
];

const ACADEMIC_LEVELS = [
  { id: 'high_school', label: 'High School' },
  { id: 'undergraduate', label: 'Undergraduate' },
  { id: 'graduate', label: 'Graduate' }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(MOCK_CONTENT);
  const [selectedFilters, setSelectedFilters] = useState({
    subjects: [] as string[],
    types: [] as string[],
    levels: [] as string[]
  });
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Apply filters and search
  useEffect(() => {
    let result = [...MOCK_CONTENT];
    
    // Apply subject filter
    if (selectedFilters.subjects.length > 0) {
      result = result.filter(item => 
        selectedFilters.subjects.some(subject => 
          item.subject.toLowerCase().includes(subject.toLowerCase())
        )
      );
    }
    
    // Apply type filter
    if (selectedFilters.types.length > 0) {
      result = result.filter(item => 
        selectedFilters.types.includes(item.type)
      );
    }
    
    // Apply level filter
    if (selectedFilters.levels.length > 0) {
      result = result.filter(item => 
        selectedFilters.levels.includes(item.level)
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query)
      );
    }
    
    setFilteredContent(result);
  }, [selectedFilters, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (filterType: string, filterId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (checked) {
        updatedFilters[filterType as keyof typeof selectedFilters] = [
          ...updatedFilters[filterType as keyof typeof selectedFilters],
          filterId
        ];
      } else {
        updatedFilters[filterType as keyof typeof selectedFilters] = 
          updatedFilters[filterType as keyof typeof selectedFilters].filter(id => id !== filterId);
      }
      
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      subjects: [],
      types: [],
      levels: []
    });
    setSearchQuery('');
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle saving content
  const handleSaveContent = (contentId: string) => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please log in to save content to your library.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: 'Content Saved',
      description: 'The item has been saved to your library.',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow bg-gray-50 pb-12">
        {/* Hero section */}
        <div className="bg-library-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold font-serif mb-4">
              Digital Library
            </h1>
            <p className="text-library-blue-100 mb-6 max-w-3xl">
              Browse our collection of educational resources, from textbooks to study notes, across various subjects and academic levels.
            </p>
            
            <div className="max-w-3xl">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {isAuthenticated && (
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/upload')} 
                  className="bg-white text-library-blue-800 hover:bg-library-blue-50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Content
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <FilterSidebar 
                subjects={SUBJECTS}
                types={CONTENT_TYPES}
                levels={ACADEMIC_LEVELS}
                onFilterChange={handleFilterChange}
                selectedFilters={selectedFilters}
                onClearFilters={clearFilters}
              />
            </div>
            
            {/* Content grid */}
            <div className="flex-grow">
              {filteredContent.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border">
                  <p className="text-xl text-gray-600 mb-4">No resources found</p>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="border-library-blue-300 text-library-blue-700"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      {filteredContent.length} resources found
                    </h2>
                    {isAuthenticated && (
                      <Button
                        onClick={() => navigate('/upload')}
                        className="bg-library-blue-700 hover:bg-library-blue-800"
                        size="sm"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((content) => (
                      <ContentCard 
                        key={content.id}
                        content={content}
                        onSave={handleSaveContent}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;


import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  BookOpen, 
  FileText, 
  FileQuestion,
  ArrowLeft,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  ThumbsUp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentCard, { ContentItem } from '@/components/ContentCard';

// Mock data (same as in Dashboard.tsx)
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

const ContentView = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedContent, setRelatedContent] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState('preview');
  
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load content data
  useEffect(() => {
    const foundContent = MOCK_CONTENT.find(item => item.id === id);
    
    if (foundContent) {
      setContent(foundContent);
      
      // Find related content (same subject or level)
      const related = MOCK_CONTENT.filter(
        item => item.id !== id && 
        (item.subject === foundContent.subject || item.level === foundContent.level)
      ).slice(0, 3);
      
      setRelatedContent(related);
    } else {
      toast({
        title: 'Content Not Found',
        description: 'The requested resource could not be found.',
        variant: 'destructive',
        duration: 3000,
      });
      navigate('/dashboard');
    }
  }, [id, navigate, toast]);

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please log in to save content to your library.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? 'Removed from Library' : 'Added to Library',
      description: isBookmarked 
        ? 'The item has been removed from your saved materials.' 
        : 'The item has been saved to your library.',
      duration: 3000,
    });
  };

  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: `Downloading ${content?.title}...`,
      duration: 3000,
    });
  };

  const handleShare = () => {
    // In a real app, this would copy a link to clipboard or open a share dialog
    toast({
      title: 'Link Copied',
      description: 'The link has been copied to your clipboard.',
      duration: 3000,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-6 w-6 text-library-blue-600" />;
      case 'notes':
        return <FileText className="h-6 w-6 text-library-blue-600" />;
      case 'paper':
        return <FileQuestion className="h-6 w-6 text-library-blue-600" />;
      default:
        return <FileText className="h-6 w-6 text-library-blue-600" />;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'high_school':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'undergraduate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'graduate':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatLevel = (level: string) => {
    switch (level) {
      case 'high_school':
        return 'High School';
      case 'undergraduate':
        return 'Undergraduate';
      case 'graduate':
        return 'Graduate';
      default:
        return level;
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading content...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-library-blue-700 hover:text-library-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Library
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="col-span-1 lg:col-span-2">
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <div className="mr-3">
                        {getTypeIcon(content.type)}
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-library-blue-900 font-serif">
                          {content.title}
                        </h1>
                        <p className="text-gray-600 mt-1">by {content.author}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge 
                      variant="outline" 
                      className="capitalize border-library-blue-200"
                    >
                      {content.type}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="bg-library-blue-50 text-library-blue-700 hover:bg-library-blue-100"
                    >
                      {content.subject}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={getLevelBadgeColor(content.level)}
                    >
                      {formatLevel(content.level)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Uploaded on {new Date(content.uploadDate).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{content.downloads} downloads</span>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                      <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="space-y-4">
                      <div className="bg-white border rounded-md p-4 min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Preview not available</p>
                          <p className="text-sm text-gray-400 mt-2">Please download the file to view contents</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-serif text-library-blue-900 mb-2">Description</h3>
                        <p className="text-gray-700">{content.description}</p>
                        
                        <h3 className="text-xl font-serif text-library-blue-900 mt-6 mb-2">Resource Information</h3>
                        <ul className="list-none space-y-2 pl-0">
                          <li>
                            <span className="font-semibold text-gray-700">Format:</span> PDF
                          </li>
                          <li>
                            <span className="font-semibold text-gray-700">Pages:</span> 124
                          </li>
                          <li>
                            <span className="font-semibold text-gray-700">Language:</span> English
                          </li>
                          <li>
                            <span className="font-semibold text-gray-700">Published:</span> 2023
                          </li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="flex flex-wrap gap-3 border-t pt-6">
                  <Button
                    onClick={handleDownload}
                    className="bg-library-blue-700 hover:bg-library-blue-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className={isBookmarked 
                      ? "bg-library-blue-50 text-library-blue-700 border-library-blue-200" 
                      : "text-gray-700 border-gray-200"
                    }
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="text-gray-700 border-gray-200"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="text-gray-700"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Related content sidebar */}
            <div className="col-span-1">
              <div className="sticky top-[100px]">
                <h3 className="text-lg font-medium text-library-blue-900 mb-4 font-serif">
                  Related Resources
                </h3>
                
                <div className="space-y-4">
                  {relatedContent.map((item) => (
                    <Link 
                      key={item.id} 
                      to={`/content/${item.id}`}
                      className="block"
                    >
                      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-library-blue-900 line-clamp-1">{item.title}</h4>
                              <p className="text-sm text-gray-600">by {item.author}</p>
                              <div className="flex mt-1 space-x-1">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs capitalize"
                                >
                                  {item.type}
                                </Badge>
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs bg-gray-100"
                                >
                                  {item.subject}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  
                  <Button
                    variant="outline"
                    className="w-full border-library-blue-200 text-library-blue-700"
                    asChild
                  >
                    <Link to="/dashboard">
                      Browse More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentView;

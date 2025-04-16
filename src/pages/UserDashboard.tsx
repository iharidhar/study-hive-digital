
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  BookmarkIcon, 
  Upload, 
  Settings, 
  LogOut,
  Edit,
  Save,
  Loader2
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
  }
];

// Mock user uploads
const MOCK_USER_UPLOADS = [
  {
    id: '101',
    title: 'Computer Networks Study Guide',
    author: 'John Doe',
    type: 'notes',
    subject: 'Computer Science',
    level: 'undergraduate',
    description: 'Comprehensive study notes covering OSI model, TCP/IP, routing protocols, and network security fundamentals.',
    uploadDate: '2023-10-01',
    downloads: 42,
    fileUrl: '/files/networks-guide.pdf'
  },
  {
    id: '102',
    title: 'Introduction to Algorithms',
    author: 'John Doe',
    type: 'book',
    subject: 'Computer Science',
    level: 'undergraduate',
    description: 'A practical introduction to algorithm design, analysis, and implementation with code examples in Python.',
    uploadDate: '2023-09-23',
    downloads: 87,
    fileUrl: '/files/algorithms-intro.pdf'
  }
];

// Mock saved content
const MOCK_SAVED_CONTENT = [
  MOCK_CONTENT[0],
  MOCK_CONTENT[1]
];

const UserDashboard = () => {
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [interests, setInterests] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedContent, setSavedContent] = useState<ContentItem[]>(MOCK_SAVED_CONTENT);
  const [userUploads, setUserUploads] = useState<ContentItem[]>(MOCK_USER_UPLOADS);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to view your dashboard.',
        variant: 'destructive',
        duration: 3000,
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setInstitution(user.institution || '');
      setInterests(user.interests ? user.interests.join(', ') : '');
    }
  }, [user]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Process interests string to array
    const interestsArray = interests
      .split(',')
      .map(interest => interest.trim())
      .filter(interest => interest.length > 0);
    
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name,
        institution,
        interests: interestsArray,
      });
      
      setIsSaving(false);
      setIsEditing(false);
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
        duration: 3000,
      });
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      duration: 3000,
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedContent(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: 'Item Removed',
      description: 'The item has been removed from your saved materials.',
      duration: 3000,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading user data...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-library-blue-900 font-serif">
                Your Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your profile, uploads, and saved materials
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-gray-700 border-gray-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* User profile card */}
            <div className="col-span-1">
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback className="bg-library-blue-100 text-library-blue-700 text-xl">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h2 className="text-xl font-bold text-library-blue-900 font-serif mb-1">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  
                  <div className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger 
                        value="profile" 
                        onClick={() => setActiveTab('profile')}
                        className={activeTab === 'profile' ? 'bg-library-blue-100 text-library-blue-700' : ''}
                      >
                        <User className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline lg:hidden xl:inline">Profile</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="saved" 
                        onClick={() => setActiveTab('saved')}
                        className={activeTab === 'saved' ? 'bg-library-blue-100 text-library-blue-700' : ''}
                      >
                        <BookmarkIcon className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline lg:hidden xl:inline">Saved</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="uploads" 
                        onClick={() => setActiveTab('uploads')}
                        className={activeTab === 'uploads' ? 'bg-library-blue-100 text-library-blue-700' : ''}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline lg:hidden xl:inline">Uploads</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/upload')} 
                  className="w-full bg-library-blue-700 hover:bg-library-blue-800"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Content
                </Button>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="col-span-1 lg:col-span-3">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-library-blue-900">
                    {activeTab === 'profile' && 'Profile Information'}
                    {activeTab === 'saved' && 'Saved Materials'}
                    {activeTab === 'uploads' && 'Your Uploads'}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'profile' && 'Manage your personal information and preferences'}
                    {activeTab === 'saved' && 'Materials you have saved for later reference'}
                    {activeTab === 'uploads' && 'Educational resources you have shared with the community'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Profile Tab Content */}
                  {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          {isEditing ? (
                            <div className="space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                className="text-gray-600"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                  </>
                                )}
                              </Button>
                            </div>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                              className="text-library-blue-700 border-library-blue-200"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Profile
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={user.email}
                            disabled
                            className="bg-gray-50"
                          />
                          <p className="text-xs text-gray-500">
                            Email address cannot be changed
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="institution">School/University</Label>
                          <Input
                            id="institution"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g., University of Technology"
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="interests">Areas of Interest</Label>
                          <Input
                            id="interests"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="e.g., Mathematics, Computer Science, Physics"
                            disabled={!isEditing}
                          />
                          <p className="text-xs text-gray-500">
                            Separate multiple interests with commas
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="profilePicture">Profile Picture</Label>
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={user.profilePicture} alt={user.name} />
                              <AvatarFallback className="bg-library-blue-100 text-library-blue-700 text-xl">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            {isEditing && (
                              <Button
                                type="button"
                                variant="outline"
                                className="text-gray-700"
                                disabled={!isEditing}
                              >
                                Change Picture
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  
                  {/* Saved Materials Tab Content */}
                  {activeTab === 'saved' && (
                    <div>
                      {savedContent.length === 0 ? (
                        <div className="text-center py-12">
                          <BookmarkIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved materials yet</h3>
                          <p className="text-gray-500 max-w-md mx-auto mb-6">
                            Materials you save will appear here for quick access.
                          </p>
                          <Button 
                            onClick={() => navigate('/dashboard')} 
                            className="bg-library-blue-700 hover:bg-library-blue-800"
                          >
                            Browse Library
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {savedContent.map((content) => (
                            <ContentCard
                              key={content.id}
                              content={content}
                              isSaved={true}
                              onSave={() => handleRemoveSaved(content.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Your Uploads Tab Content */}
                  {activeTab === 'uploads' && (
                    <div>
                      {userUploads.length === 0 ? (
                        <div className="text-center py-12">
                          <Upload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads yet</h3>
                          <p className="text-gray-500 max-w-md mx-auto mb-6">
                            Share your knowledge with the community by uploading study materials.
                          </p>
                          <Button 
                            onClick={() => navigate('/upload')} 
                            className="bg-library-blue-700 hover:bg-library-blue-800"
                          >
                            Upload Your First Resource
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              Your Uploaded Resources
                            </h3>
                            <Button 
                              onClick={() => navigate('/upload')} 
                              size="sm"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              New Upload
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {userUploads.map((content) => (
                              <ContentCard
                                key={content.id}
                                content={content}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;

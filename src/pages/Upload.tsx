
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileUp, 
  Upload as UploadIcon, 
  X, 
  File, 
  Loader2 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [academicLevel, setAcademicLevel] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    author: '',
    subject: '',
    resourceType: '',
    academicLevel: '',
    file: ''
  });
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set author name from authenticated user if available
  useState(() => {
    if (user?.name) {
      setAuthor(user.name);
    }
  });

  // Redirect if not authenticated
  useState(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to upload content.',
        variant: 'destructive',
        duration: 3000,
      });
      navigate('/login');
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      author: '',
      subject: '',
      resourceType: '',
      academicLevel: '',
      file: ''
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!author.trim()) {
      newErrors.author = 'Author name is required';
      isValid = false;
    }

    if (!subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!resourceType) {
      newErrors.resourceType = 'Resource type is required';
      isValid = false;
    }

    if (!academicLevel) {
      newErrors.academicLevel = 'Academic level is required';
      isValid = false;
    }

    if (!file) {
      newErrors.file = 'Please upload a file';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: 'Upload Successful!',
        description: 'Your content has been submitted and is awaiting approval.',
        duration: 5000,
      });
      
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-library-blue-900 font-serif mb-8 text-center">
            Upload Educational Content
          </h1>
          
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-library-blue-900">Content Details</CardTitle>
              <CardDescription>
                Fill in the information about the educational resource you're sharing.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Introduction to Quantum Mechanics"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs">{errors.title}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., Dr. Jane Smith"
                    className={errors.author ? 'border-red-500' : ''}
                  />
                  {errors.author && (
                    <p className="text-red-500 text-xs">{errors.author}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={subject} 
                      onValueChange={setSubject}
                    >
                      <SelectTrigger 
                        id="subject"
                        className={errors.subject ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="environmental-science">Environmental Science</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resourceType">Resource Type</Label>
                    <Select 
                      value={resourceType} 
                      onValueChange={setResourceType}
                    >
                      <SelectTrigger 
                        id="resourceType"
                        className={errors.resourceType ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="notes">Notes</SelectItem>
                        <SelectItem value="paper">Paper</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.resourceType && (
                      <p className="text-red-500 text-xs">{errors.resourceType}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="academicLevel">Academic Level</Label>
                    <Select 
                      value={academicLevel} 
                      onValueChange={setAcademicLevel}
                    >
                      <SelectTrigger 
                        id="academicLevel"
                        className={errors.academicLevel ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.academicLevel && (
                      <p className="text-red-500 text-xs">{errors.academicLevel}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed description of the content..."
                    className={`min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs">{errors.description}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>File Upload</Label>
                  
                  {!file ? (
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.file ? 'border-red-500' : 'border-gray-300'}`}>
                      <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Supports PDF, DOCX, PPTX (Max 50MB)
                      </p>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-8 w-8 text-library-blue-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px] md:max-w-xs">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  {errors.file && (
                    <p className="text-red-500 text-xs">{errors.file}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-library-blue-700 hover:bg-library-blue-800"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload Content
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  By uploading, you confirm that you have the rights to share this content and agree to our Terms of Service.
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  BookOpen, 
  FileText, 
  FileQuestion,
  Bookmark,
  BookmarkCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface ContentItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'notes' | 'paper';
  subject: string;
  level: 'high_school' | 'undergraduate' | 'graduate';
  description: string;
  uploadDate: string;
  downloads: number;
  fileUrl: string;
  thumbnailUrl?: string;
}

interface ContentCardProps {
  content: ContentItem;
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

const ContentCard = ({ content, isSaved = false, onSave }: ContentCardProps) => {
  const [bookmarked, setBookmarked] = useState(isSaved);
  
  const handleSave = () => {
    setBookmarked(!bookmarked);
    if (onSave) onSave(content.id);
  };

  const getTypeIcon = () => {
    switch (content.type) {
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

  const getLevelBadgeColor = () => {
    switch (content.level) {
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

  return (
    <Card className="h-full card-hover bg-white">
      <CardContent className="p-4 pb-0">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center">
            {getTypeIcon()}
            <Badge variant="outline" className="ml-2 capitalize">
              {content.type}
            </Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="h-8 w-8 text-gray-500 hover:text-library-blue-600"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-library-blue-600" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bookmarked ? 'Saved to your library' : 'Save to your library'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Link to={`/content/${content.id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 font-serif text-library-blue-900 hover:text-library-blue-700">
            {content.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">by {content.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="bg-library-blue-50 text-library-blue-700 hover:bg-library-blue-100">
            {content.subject}
          </Badge>
          <Badge variant="secondary" className={getLevelBadgeColor()}>
            {formatLevel(content.level)}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{content.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{new Date(content.uploadDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">{content.downloads} downloads</span>
          <Link to={`/content/${content.id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-library-blue-700 border-library-blue-200 hover:bg-library-blue-50"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;

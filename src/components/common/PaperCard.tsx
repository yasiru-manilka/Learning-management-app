import { FileText, Download, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Paper } from '../../context/PaperContext';

interface PaperCardProps {
  paper: Paper;
  actionLabel?: string;
  actionPath?: string;
  onDownload?: () => void;
  onDelete?: () => void;
}

const PaperCard = ({ 
  paper, 
  actionLabel = "Download", 
  actionPath,
  onDownload,
  onDelete
}: PaperCardProps) => {
  // Format date 
  const formattedDate = paper.uploadDate 
    ? format(new Date(paper.uploadDate), 'MMM dd, yyyy')
    : '';
  
  // Capitalize subject and grade
  const formattedSubject = paper.subject.charAt(0).toUpperCase() + paper.subject.slice(1);
  const formattedCategory = paper.category === 'past_paper' ? 'Past Paper' : 'Model Paper';
  
  // Handle download click
  const handleDownloadClick = (e: React.MouseEvent) => {
    if (!actionPath && onDownload) {
      e.preventDefault();
      onDownload();
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      {/* Paper thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={paper.thumbnailUrl} 
          alt={paper.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 m-2 rounded">
          {paper.grade ? `Grade ${paper.grade}` : ''}
        </div>
        <div className="absolute bottom-0 left-0 bg-primary-dark text-white text-xs font-medium px-3 py-1 m-2 rounded">
          {formattedCategory}
        </div>
      </div>
      
      {/* Paper details */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{paper.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{paper.description}</p>
        
        <div className="flex flex-col space-y-3">
          {/* Subject */}
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{formattedSubject}</span>
          </div>
          
          {/* Upload date */}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{formattedDate}</span>
          </div>
          
          {/* Uploaded by */}
          <div className="flex items-center">
            <User className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{paper.uploadedBy}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-5 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {paper.downloads} downloads
          </div>
          
          <div className="flex gap-2">
            {onDelete && (
              <button 
                onClick={onDelete}
                className="px-3 py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm transition-colors"
              >
                Delete
              </button>
            )}
            
            {actionPath ? (
              <Link 
                to={actionPath}
                className="px-3 py-1.5 bg-primary text-white rounded hover:bg-primary-dark text-sm transition-colors flex items-center"
                onClick={handleDownloadClick}
              >
                <Download className="w-4 h-4 mr-1" />
                {actionLabel}
              </Link>
            ) : (
              <button 
                className="px-3 py-1.5 bg-primary text-white rounded hover:bg-primary-dark text-sm transition-colors flex items-center"
                onClick={handleDownloadClick}
              >
                <Download className="w-4 h-4 mr-1" />
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
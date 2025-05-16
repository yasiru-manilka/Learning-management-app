import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePapers, Paper } from '../../context/PaperContext';
import PaperCard from '../../components/common/PaperCard';
import toast from 'react-hot-toast';

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { papers, incrementDownloads } = usePapers();
  const [recentPapers, setRecentPapers] = useState<Paper[]>([]);
  const [recommendedPapers, setRecommendedPapers] = useState<Paper[]>([]);
  
  // Get papers on component mount
  useEffect(() => {
    // Get recent papers (latest 3)
    const sorted = [...papers].sort((a, b) => {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });
    setRecentPapers(sorted.slice(0, 3));
    
    // Get recommended papers (random 3, excluding the recent ones)
    const remaining = sorted.slice(3);
    const shuffled = remaining.sort(() => 0.5 - Math.random());
    setRecommendedPapers(shuffled.slice(0, 3));
  }, [papers]);
  
  // Handle paper download
  const handleDownload = (id: string) => {
    incrementDownloads(id);
    toast.success('Paper downloaded successfully!');
  };
  
  // Activity data
  const activityData = [
    { subject: 'Mathematics', paperCount: 3, lastAccessed: '2 days ago' },
    { subject: 'Physics', paperCount: 2, lastAccessed: '1 week ago' },
    { subject: 'Chemistry', paperCount: 1, lastAccessed: '3 days ago' }
  ];
  
  return (
    <div>
      {/* Welcome section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Here's an overview of your learning resources and activity
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/student/papers"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Browse All Papers
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Papers Available */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Papers Available</p>
              <p className="text-2xl font-semibold">{papers.length}</p>
            </div>
          </div>
        </div>
        
        {/* Papers Viewed */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Papers Downloaded</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
        
        {/* Last Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Activity</p>
              <p className="text-2xl font-semibold">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Papers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Papers</h2>
          <Link to="/student/papers" className="text-primary hover:text-primary-dark flex items-center">
            <span className="mr-1">View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPapers.map(paper => (
            <PaperCard 
              key={paper.id} 
              paper={paper}
              onDownload={() => handleDownload(paper.id)}
            />
          ))}
        </div>
      </div>

      {/* Recommended Papers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recommended Papers</h2>
          <Link to="/student/papers" className="text-primary hover:text-primary-dark flex items-center">
            <span className="mr-1">View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedPapers.map(paper => (
            <PaperCard 
              key={paper.id} 
              paper={paper}
              onDownload={() => handleDownload(paper.id)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Papers Accessed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Accessed
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activityData.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{activity.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{activity.paperCount} papers</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{activity.lastAccessed}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/student/papers?subject=${activity.subject.toLowerCase()}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
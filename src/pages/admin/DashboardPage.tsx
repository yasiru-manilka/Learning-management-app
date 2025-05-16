import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Download, ArrowUpRight, UserPlus, FileUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePapers, Paper } from '../../context/PaperContext';

// Mock data for students
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    grade: '10',
    enrollmentDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    grade: '11',
    enrollmentDate: '2024-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    grade: '9',
    enrollmentDate: '2024-03-05',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    grade: '12',
    enrollmentDate: '2024-01-30',
    status: 'active'
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@example.com',
    grade: '10',
    enrollmentDate: '2024-02-10',
    status: 'active'
  }
];

// Mock data for recent activities
const MOCK_ACTIVITIES = [
  { type: 'upload', user: 'Admin User', description: 'Uploaded Chemistry Model Paper Grade 10', date: '2024-06-05' },
  { type: 'student', user: 'Admin User', description: 'Added new student: Sarah Thompson', date: '2024-06-04' },
  { type: 'upload', user: 'Admin User', description: 'Uploaded Biology Past Paper Grade 12 2024', date: '2024-06-01' },
  { type: 'student', user: 'Admin User', description: 'Updated student info: John Doe', date: '2024-05-30' },
  { type: 'upload', user: 'Admin User', description: 'Uploaded Mathematics Grade 10 Past Paper 2024', date: '2024-05-15' }
];

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { papers } = usePapers();
  const [students] = useState(MOCK_STUDENTS);
  const [recentStudents, setRecentStudents] = useState<typeof MOCK_STUDENTS>([]);
  const [activities] = useState(MOCK_ACTIVITIES);
  const [stats, setStats] = useState({
    totalPapers: 0,
    pastPapers: 0,
    modelPapers: 0,
    totalStudents: 0,
    totalDownloads: 0
  });
  
  // Calculate stats and get recent students on component mount
  useEffect(() => {
    // Calculate paper stats
    const pastPapers = papers.filter(paper => paper.category === 'past_paper').length;
    const modelPapers = papers.filter(paper => paper.category === 'model_paper').length;
    const totalDownloads = papers.reduce((sum, paper) => sum + paper.downloads, 0);
    
    setStats({
      totalPapers: papers.length,
      pastPapers,
      modelPapers,
      totalStudents: students.length,
      totalDownloads
    });
    
    // Get recent students (latest 5)
    const sorted = [...students].sort((a, b) => {
      return new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime();
    });
    setRecentStudents(sorted.slice(0, 5));
  }, [papers, students]);
  
  // Get popular papers (top 5 by downloads)
  const popularPapers = [...papers]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);
  
  return (
    <div>
      {/* Welcome section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-gray-600">
              Here's an overview of your learning management system
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Link
              to="/admin/papers"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Add Paper
            </Link>
            <Link
              to="/admin/students"
              className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:bg-opacity-5 transition-colors flex items-center justify-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Papers Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Papers</p>
              <p className="text-2xl font-semibold">{stats.totalPapers}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">Past Papers:</span>
              <span className="ml-1 font-medium">{stats.pastPapers}</span>
            </div>
            <div>
              <span className="text-gray-500">Model Papers:</span>
              <span className="ml-1 font-medium">{stats.modelPapers}</span>
            </div>
          </div>
        </div>
        
        {/* Students Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Students</p>
              <p className="text-2xl font-semibold">{stats.totalStudents}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">Active:</span>
              <span className="ml-1 font-medium">{students.filter(s => s.status === 'active').length}</span>
            </div>
            <div>
              <span className="text-gray-500">New this month:</span>
              <span className="ml-1 font-medium">2</span>
            </div>
          </div>
        </div>
        
        {/* Downloads Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Downloads</p>
              <p className="text-2xl font-semibold">{stats.totalDownloads}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">This week:</span>
              <span className="ml-1 font-medium">36</span>
            </div>
            <div>
              <span className="text-gray-500">This month:</span>
              <span className="ml-1 font-medium">128</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Papers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Popular Papers</h2>
            <Link to="/admin/papers" className="text-primary hover:text-primary-dark flex items-center text-sm">
              <span className="mr-1">View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {popularPapers.map(paper => (
              <div key={paper.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="h-10 w-10 flex-shrink-0 bg-primary bg-opacity-10 rounded flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{paper.title}</p>
                  <p className="text-xs text-gray-500">
                    {paper.subject.charAt(0).toUpperCase() + paper.subject.slice(1)} | Grade {paper.grade}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{paper.downloads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Students</h2>
            <Link to="/admin/students" className="text-primary hover:text-primary-dark flex items-center text-sm">
              <span className="mr-1">View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentStudents.map(student => (
              <div key={student.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                  <p className="text-xs text-gray-500">
                    Grade {student.grade} | {student.email}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {student.enrollmentDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          activity.type === 'upload' 
                            ? 'bg-primary bg-opacity-10' 
                            : 'bg-blue-100'
                        }`}>
                          {activity.type === 'upload' ? (
                            <FileUp className={`h-4 w-4 text-primary`} />
                          ) : (
                            <UserPlus className={`h-4 w-4 text-blue-600`} />
                          )}
                        </div>
                        <div className="text-sm text-gray-900">{activity.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{activity.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{activity.date}</div>
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

export default AdminDashboardPage;
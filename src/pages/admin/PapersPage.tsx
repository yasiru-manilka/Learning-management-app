import { useState } from 'react';
import { Plus, Search, Filter, FileText } from 'lucide-react';
import { usePapers, PaperCategory, PaperSubject, PaperGrade } from '../../context/PaperContext';
import { useAuth } from '../../context/AuthContext';
import PaperCard from '../../components/common/PaperCard';
import toast from 'react-hot-toast';

const AdminPapersPage = () => {
  const { papers, addPaper, deletePaper, filterPapers } = usePapers();
  const { user } = useAuth();
  
  // State for form visibility
  const [showForm, setShowForm] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'past_paper' as PaperCategory,
    subject: 'mathematics' as PaperSubject,
    grade: '10' as PaperGrade,
    fileUrl: '',
    thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg'
  });
  
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: '' as PaperCategory | '',
    subject: '' as PaperSubject | '',
    grade: '' as PaperGrade | ''
  });
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    filterPapers({
      search: filters.search,
      category: filters.category as PaperCategory | undefined,
      subject: filters.subject as PaperSubject | undefined,
      grade: filters.grade as PaperGrade | undefined
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      subject: '',
      grade: ''
    });
    filterPapers({});
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file upload (mock)
  const handleFileUpload = () => {
    // In a real app, this would upload the file to a server
    // For now, we'll just set a dummy URL
    const timestamp = new Date().getTime();
    setFormData(prev => ({
      ...prev,
      fileUrl: `/papers/mock_paper_${timestamp}.pdf`
    }));
    toast.success('File uploaded successfully!');
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fileUrl) {
      toast.error('Please upload a file first');
      return;
    }
    
    // Add the new paper
    addPaper({
      ...formData,
      uploadedBy: user?.name || 'Admin'
    });
    
    // Reset form and hide it
    setFormData({
      title: '',
      description: '',
      category: 'past_paper',
      subject: 'mathematics',
      grade: '10',
      fileUrl: '',
      thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg'
    });
    setShowForm(false);
    toast.success('Paper added successfully!');
  };
  
  // Handle paper deletion
  const handleDeletePaper = (id: string) => {
    if (confirm('Are you sure you want to delete this paper?')) {
      deletePaper(id);
      toast.success('Paper deleted successfully!');
    }
  };
  
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Papers</h1>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Paper
            </>
          )}
        </button>
      </div>

      {/* Add Paper Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Paper</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="past_paper">Past Paper</option>
                  <option value="model_paper">Model Paper</option>
                </select>
              </div>
              
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject*
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>
              
              {/* Grade */}
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  Grade*
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              
              {/* Thumbnail URL */}
              <div>
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use default thumbnail</p>
              </div>
              
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Paper*
                </label>
                <div className="flex">
                  <input
                    type="file"
                    className="sr-only"
                    id="paper-file"
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="paper-file"
                    className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex-grow"
                  >
                    Choose File
                  </label>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Upload
                  </button>
                </div>
                {formData.fileUrl && (
                  <p className="text-xs text-green-600 mt-1">
                    File uploaded successfully!
                  </p>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            
            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Add Paper
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search bar */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search papers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          {/* Category filter */}
          <div className="w-full md:w-40">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              <option value="past_paper">Past Papers</option>
              <option value="model_paper">Model Papers</option>
            </select>
          </div>
          
          {/* Subject filter */}
          <div className="w-full md:w-40">
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English</option>
              <option value="history">History</option>
            </select>
          </div>
          
          {/* Grade filter */}
          <div className="w-full md:w-40">
            <select
              name="grade"
              value={filters.grade}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          
          {/* Filter buttons */}
          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Papers List */}
      {papers.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Papers Found</h3>
          <p className="text-gray-500">
            There are no papers in the system yet. Add your first paper to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map(paper => (
            <PaperCard 
              key={paper.id} 
              paper={paper} 
              actionLabel="Download" 
              onDownload={() => {
                // In a real app, this would download the file
                toast.success('Paper downloaded successfully!');
              }}
              onDelete={() => handleDeletePaper(paper.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Import required icons that were missing
import { X } from 'lucide-react';

export default AdminPapersPage;
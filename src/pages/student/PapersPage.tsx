import { useState } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { usePapers, PaperCategory, PaperSubject, PaperGrade } from '../../context/PaperContext';
import PaperCard from '../../components/common/PaperCard';
import toast from 'react-hot-toast';

const StudentPapersPage = () => {
  const { filteredPapers, filterPapers, incrementDownloads } = usePapers();
  
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
  
  // Handle paper download
  const handleDownload = (id: string) => {
    incrementDownloads(id);
    toast.success('Paper downloaded successfully!');
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Browse Papers</h1>
        <p className="text-gray-600 mt-2">
          Access past papers and model papers to help with your exam preparation
        </p>
      </div>

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
      {filteredPapers.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Papers Found</h3>
          <p className="text-gray-500">
            No papers match your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map(paper => (
            <PaperCard 
              key={paper.id} 
              paper={paper}
              onDownload={() => handleDownload(paper.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentPapersPage;
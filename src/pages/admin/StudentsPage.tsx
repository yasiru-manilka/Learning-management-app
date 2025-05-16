import { useState } from 'react';
import { Search, UserPlus, Users, Filter, MoreHorizontal, Edit, Trash, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data for students
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    grade: '10',
    enrollmentDate: '2024-01-15',
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    grade: '11',
    enrollmentDate: '2024-02-20',
    profileImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    status: 'active'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    grade: '9',
    enrollmentDate: '2024-03-05',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    grade: '12',
    enrollmentDate: '2024-01-30',
    profileImage: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg',
    status: 'active'
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@example.com',
    grade: '10',
    enrollmentDate: '2024-02-10',
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    status: 'active'
  }
];

const AdminStudentsPage = () => {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: '10',
    enrollmentDate: '',
    profileImage: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg',
    status: 'active'
  });
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    grade: '',
    status: 'active'
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
    let result = [...students];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        student => 
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply grade filter
    if (filters.grade) {
      result = result.filter(student => student.grade === filters.grade);
    }
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(student => student.status === filters.status);
    }
    
    setFilteredStudents(result);
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      grade: '',
      status: 'active'
    });
    setFilteredStudents(students);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Edit student
  const handleEditStudent = (student: any) => {
    setIsEditMode(true);
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
      enrollmentDate: student.enrollmentDate,
      profileImage: student.profileImage,
      status: student.status
    });
    setShowForm(true);
    setDropdownOpen(null);
  };
  
  // Delete student
  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      toast.success('Student deleted successfully!');
    }
    setDropdownOpen(null);
  };
  
  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setDropdownOpen(prev => prev === id ? null : id);
  };
  
  // Add or update student
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && selectedStudent) {
      // Update existing student
      const updatedStudents = students.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, ...formData }
          : student
      );
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      toast.success('Student updated successfully!');
    } else {
      // Add new student
      const newStudent = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        enrollmentDate: formData.enrollmentDate || new Date().toISOString().split('T')[0]
      };
      const updatedStudents = [newStudent, ...students];
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      toast.success('Student added successfully!');
    }
    
    // Reset form and state
    setFormData({
      name: '',
      email: '',
      grade: '10',
      enrollmentDate: '',
      profileImage: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg',
      status: 'active'
    });
    setShowForm(false);
    setIsEditMode(false);
    setSelectedStudent(null);
  };
  
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md flex items-center"
          onClick={() => {
            setShowForm(!showForm);
            if (isEditMode) {
              setIsEditMode(false);
              setSelectedStudent(null);
              setFormData({
                name: '',
                email: '',
                grade: '10',
                enrollmentDate: '',
                profileImage: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg',
                status: 'active'
              });
            }
          }}
        >
          {showForm ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </>
          )}
        </button>
      </div>

      {/* Add/Edit Student Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isEditMode ? 'Edit Student' : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
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
              
              {/* Enrollment Date */}
              <div>
                <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Date
                </label>
                <input
                  type="date"
                  id="enrollmentDate"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Profile Image */}
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                {isEditMode ? 'Update Student' : 'Add Student'}
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
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
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
          
          {/* Status filter */}
          <div className="w-full md:w-40">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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

      {/* Students List */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Students Found</h3>
          <p className="text-gray-500">
            There are no students matching your filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={student.profileImage}
                            alt={student.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Grade {student.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{student.enrollmentDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => toggleDropdown(student.id)}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                        
                        {dropdownOpen === student.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleEditStudent(student)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Import X icon
import { X } from 'lucide-react';

export default AdminStudentsPage;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';

const EnrollmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    grade: '',
    parentName: '',
    parentPhone: '',
    address: '',
    previousSchool: '',
    heardFrom: '',
    subjects: {
      mathematics: false,
      physics: false,
      chemistry: false,
      biology: false,
      english: false,
      history: false
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [name]: checked
      }
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log(formData);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Student Enrollment</h1>
            <p className="text-xl opacity-90">
              Join our learning community and get access to quality educational resources
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Enrollment Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for enrolling with EduLearn. We have received your application and will contact you shortly with next steps.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Proceed to Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Step {step} of 3</span>
                    <span className="text-sm font-medium">{Math.round((step / 3) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-500"
                      style={{width: `${(step / 3) * 100}%`}}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
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
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth*
                          </label>
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                            Grade Level*
                          </label>
                          <select
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select Grade</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Parent Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Parent/Guardian Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                            Parent/Guardian Name*
                          </label>
                          <input
                            type="text"
                            id="parentName"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                            Parent/Guardian Phone*
                          </label>
                          <input
                            type="tel"
                            id="parentPhone"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Home Address*
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-1">
                          Previous School (if applicable)
                        </label>
                        <input
                          type="text"
                          id="previousSchool"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="heardFrom" className="block text-sm font-medium text-gray-700 mb-1">
                          How did you hear about us?
                        </label>
                        <select
                          id="heardFrom"
                          name="heardFrom"
                          value={formData.heardFrom}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select Option</option>
                          <option value="friend">Friend or Family</option>
                          <option value="search">Search Engine</option>
                          <option value="social">Social Media</option>
                          <option value="ad">Advertisement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Subject Selection */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Subject Selection</h2>
                      <p className="text-gray-600 mb-4">
                        Please select the subjects you are interested in:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="mathematics"
                            name="mathematics"
                            checked={formData.subjects.mathematics}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="mathematics" className="ml-2 text-gray-700">
                            Mathematics
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="physics"
                            name="physics"
                            checked={formData.subjects.physics}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="physics" className="ml-2 text-gray-700">
                            Physics
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="chemistry"
                            name="chemistry"
                            checked={formData.subjects.chemistry}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="chemistry" className="ml-2 text-gray-700">
                            Chemistry
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="biology"
                            name="biology"
                            checked={formData.subjects.biology}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="biology" className="ml-2 text-gray-700">
                            Biology
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="english"
                            name="english"
                            checked={formData.subjects.english}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="english" className="ml-2 text-gray-700">
                            English
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="history"
                            name="history"
                            checked={formData.subjects.history}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label htmlFor="history" className="ml-2 text-gray-700">
                            History
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600">
                          By submitting this enrollment form, you agree to our <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="ml-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="ml-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Submit Enrollment
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {!submitted && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Enrolling</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our learning community and enjoy these advantages
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Comprehensive Resources</h3>
                <p className="text-gray-600 text-center">
                  Access to a vast library of past papers, model papers, and study materials across all subjects.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Expert Guidance</h3>
                <p className="text-gray-600 text-center">
                  Learn from experienced educators who provide valuable insights and exam strategies.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Supportive Community</h3>
                <p className="text-gray-600 text-center">
                  Join a community of like-minded students, sharing knowledge and supporting each other.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Import required icons
import { GraduationCap, Users } from 'lucide-react';

export default EnrollmentPage;
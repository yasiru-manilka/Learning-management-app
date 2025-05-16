import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import PaperCard from '../components/common/PaperCard';

const HomePage = () => {
  const { papers } = usePapers();
  const featuredPapers = papers.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Empowering Students with Quality Learning Resources
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white opacity-90">
              Access past papers, model papers, and study materials to excel in your academic journey.
              Prepare better, score higher, and achieve your educational goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/enrollment"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Enroll Now
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Student Login
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose EduLearn?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide comprehensive educational resources to help students excel in their academic journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Past Exam Papers</h3>
              <p className="text-gray-600">
                Access a comprehensive collection of past examination papers to understand exam patterns and practice effectively.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Model Papers</h3>
              <p className="text-gray-600">
                Study with our expertly crafted model papers designed to simulate real exam conditions and help you prepare better.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Get guidance from experienced educators to navigate through complex topics and develop effective study strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Papers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Papers</h2>
            <Link to="/login" className="flex items-center text-primary hover:text-primary-dark transition-colors">
              <span className="mr-2">View All Papers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPapers.map(paper => (
              <PaperCard key={paper.id} paper={paper} actionLabel="Login to Download" actionPath="/login" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from the students who have benefited from our educational resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg" 
                  alt="Student" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Grade 12 Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The past papers helped me understand the exam pattern and prepare effectively. I improved my grades significantly in just a few months."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                  alt="Student" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">Grade 11 Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The model papers were exactly what I needed to prepare for my exams. The format and difficulty level matched perfectly with the actual exams."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" 
                  alt="Student" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Grade 10 Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Access to quality study materials made all the difference in my academic performance. I'm grateful for this platform."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Excel in Your Academic Journey?
            </h2>
            <p className="mt-4 text-lg text-white text-opacity-90">
              Join EduLearn today and get access to high-quality educational resources
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/enrollment"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Enroll Now
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Import FileText and GraduationCap at the top of the file
import { FileText, GraduationCap } from 'lucide-react';

export default HomePage;
import { GraduationCap as Graduation, Users, Award, BookOpen, School, BookCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EducaLearn</h1>
            <p className="text-xl text-white text-opacity-90">
              We're dedicated to helping students achieve academic excellence through comprehensive learning resources.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600">
                To provide high-quality educational resources that empower students to reach their full 
                academic potential. We strive to make learning accessible, engaging, and effective for students 
                at all levels by offering comprehensive past papers, model papers, and expert guidance.
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-600">
                To become the leading educational platform that transforms how students prepare for 
                examinations, fostering a generation of confident, knowledgeable, and successful 
                individuals who are well-equipped for their future academic and professional endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>
            
            <div className="prose prose-lg mx-auto">
              <p>
                EduLearn was founded in 2020 by a group of passionate educators who recognized the need for 
                quality exam preparation materials. What began as a small collection of resources for a 
                local school has now grown into a comprehensive platform serving thousands of students nationwide.
              </p>
              
              <p>
                Our team of dedicated education specialists works tirelessly to develop and curate the best 
                past papers, model papers, and study guides. We understand the challenges students face 
                during exam preparation and are committed to addressing these needs through our platform.
              </p>
              
              <p>
                Over the years, we've expanded our offerings to cover more subjects and grade levels, 
                always maintaining our commitment to quality and academic excellence. Our platform has 
                helped countless students improve their grades and achieve their academic goals.
              </p>
              
              <p>
                As we continue to grow, we remain focused on our core mission: empowering students 
                through education. We believe that access to quality educational resources should be 
                available to all students, regardless of their background or circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our approach to education and service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">
                We strive for excellence in all our educational resources, ensuring they meet the highest standards of quality and accuracy.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Accessibility</h3>
              <p className="text-gray-600 text-center">
                We believe in making quality education accessible to all students, breaking down barriers to academic success.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <School className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                We continuously innovate our educational approach, embracing new technologies and methodologies to enhance learning.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                We operate with honesty and transparency, building trust with students, parents, and educational institutions.
              </p>
            </div>
            
            {/* Value 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Graduation className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Student-Centered</h3>
              <p className="text-gray-600 text-center">
                We place students at the center of everything we do, focusing on their needs, goals, and academic growth.
              </p>
            </div>
            
            {/* Value 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Continuous Learning</h3>
              <p className="text-gray-600 text-center">
                We believe in lifelong learning and encourage a growth mindset in both our students and our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind EduLearn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg" 
                alt="Dr. James Wilson" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. James Wilson</h3>
                <p className="text-primary mb-4">Founder & Education Director</p>
                <p className="text-gray-600">
                  Former university professor with over 20 years of experience in education and curriculum development.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg" 
                alt="Sarah Thompson" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Thompson</h3>
                <p className="text-primary mb-4">Chief Academic Officer</p>
                <p className="text-gray-600">
                  Experienced educator specializing in exam preparation and assessment methodologies.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="David Lee" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">David Lee</h3>
                <p className="text-primary mb-4">Technology Director</p>
                <p className="text-gray-600">
                  Tech enthusiast focused on creating innovative educational platforms and digital learning tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Join Our Learning Community
            </h2>
            <p className="mt-4 text-lg text-white text-opacity-90">
              Become part of EduLearn and access quality educational resources
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/enrollment"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Enroll Now
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
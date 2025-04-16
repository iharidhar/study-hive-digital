
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Upload, BookOpen, Users, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-library-blue-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-library-blue-900 font-serif">
                Welcome to <span className="text-library-accent">StudyHive</span>
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-library-blue-700">
                Your free digital study companion for accessing and sharing educational materials.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                {isAuthenticated ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-library-blue-700 hover:bg-library-blue-800 text-white px-6 py-3 rounded-md"
                    size="lg"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Library
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/register')}
                    className="bg-library-blue-700 hover:bg-library-blue-800 text-white px-6 py-3 rounded-md"
                    size="lg"
                  >
                    Get Started
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/about')}
                  className="px-6 py-3 rounded-md border-library-blue-300 text-library-blue-700 hover:bg-library-blue-50"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-library-blue-900 font-serif">
                Why Choose StudyHive?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform makes studying easier, more collaborative, and accessible to everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BookOpen className="h-12 w-12 text-library-blue-700" />}
                title="Free Study Resources"
                description="Access thousands of study materials spanning various subjects and academic levels, completely free."
              />
              <FeatureCard 
                icon={<Upload className="h-12 w-12 text-library-blue-700" />}
                title="Share Your Knowledge"
                description="Upload your notes, papers, and study guides to help others and build your academic portfolio."
              />
              <FeatureCard 
                icon={<Users className="h-12 w-12 text-library-blue-700" />}
                title="Learning Community"
                description="Join a community of students and educators sharing quality educational resources."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-library-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-library-blue-900 font-serif">
                How StudyHive Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our simple process makes it easy to find and share educational materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StepCard 
                number="1"
                title="Sign Up"
                description="Create your free account to get full access to our digital library."
              />
              <StepCard 
                number="2"
                title="Browse Library"
                description="Search and filter through study materials by subject, type, or level."
              />
              <StepCard 
                number="3"
                title="Download Resources"
                description="Find what you need and download it for your studies."
              />
              <StepCard 
                number="4"
                title="Upload & Share"
                description="Contribute your own notes and materials to help others learn."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-library-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Ready to Enhance Your Learning Journey?
            </h2>
            <p className="mt-4 text-lg text-library-blue-100 max-w-2xl mx-auto">
              Join thousands of students who are already using StudyHive to improve their academic performance.
            </p>
            <div className="mt-10">
              {isAuthenticated ? (
                <Button 
                  onClick={() => navigate('/upload')}
                  className="bg-white text-library-blue-900 hover:bg-library-blue-50 px-8 py-3 rounded-md"
                  size="lg"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Your First Resource
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-white text-library-blue-900 hover:bg-library-blue-50 px-8 py-3 rounded-md"
                  size="lg"
                >
                  Join StudyHive Now
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-library-blue-900 mb-2 font-serif">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="relative">
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center h-full">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-library-blue-100 text-library-blue-800 font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-library-blue-900 mb-2 font-serif">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    {number !== "4" && (
      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-library-blue-200"></div>
    )}
  </div>
);

export default Index;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-library-blue-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-6">
              About StudyHive
            </h1>
            <p className="text-xl text-library-blue-100 max-w-3xl mx-auto">
              Our mission is to make quality educational resources freely accessible to everyone,
              promoting knowledge sharing and academic success.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-library-blue-900 font-serif mb-6">
                  Our Story
                </h2>
                <p className="text-gray-700 mb-4">
                  StudyHive was born from a simple observation: students everywhere struggle to find quality study materials that are accessible, organized, and relevant to their courses.
                </p>
                <p className="text-gray-700 mb-4">
                  Founded in 2023 by a group of university students and educators, we set out to create a platform where knowledge could be freely shared across academic disciplines and institutions.
                </p>
                <p className="text-gray-700">
                  Our goal is to democratize education by removing barriers to accessing quality learning resources, regardless of a student's location or financial situation.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Students studying together" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 md:py-24 bg-library-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-library-blue-900 font-serif mb-4">
                Our Values
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                The core principles that guide our platform and community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard 
                title="Access for All"
                description="We believe quality educational resources should be available to everyone, regardless of financial or geographical constraints."
              />
              <ValueCard 
                title="Community Collaboration"
                description="We foster a collaborative environment where students and educators can share knowledge and support each other's learning journey."
              />
              <ValueCard 
                title="Quality & Relevance"
                description="We strive to provide well-organized, accurate, and curriculum-relevant materials that truly help students succeed."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-library-blue-900 font-serif mb-4">
                How StudyHive Works
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                A simple process designed to connect students with the resources they need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StepCard 
                number="01"
                title="Create an Account"
                description="Sign up for free to get full access to our growing library of educational resources."
              />
              <StepCard 
                number="02"
                title="Search & Filter"
                description="Easily find the materials you need by subject, type, academic level, or keywords."
              />
              <StepCard 
                number="03"
                title="Download Resources"
                description="Get instant access to notes, textbooks, papers, and more for your studies."
              />
              <StepCard 
                number="04"
                title="Contribute"
                description="Share your own study materials to help others and build a collaborative learning community."
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-library-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-library-blue-900 font-serif mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Dedicated educators and students passionate about making education accessible
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMemberCard 
                name="Sarah Johnson, Ph.D."
                role="Founder & Education Director"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                description="Former professor with 15 years of experience in educational technology and curriculum development."
              />
              <TeamMemberCard 
                name="Michael Chen"
                role="Technical Lead"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                description="Computer science graduate passionate about using technology to solve educational challenges."
              />
              <TeamMemberCard 
                name="Emily Thompson"
                role="Community Manager"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
                description="Education policy expert focused on building supportive learning communities."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-library-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">
              Join Our Learning Community Today
            </h2>
            <p className="text-xl text-library-blue-100 max-w-3xl mx-auto mb-10">
              Be part of a growing network of students and educators sharing knowledge and resources.
            </p>
            
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-library-blue-900 hover:bg-library-blue-50"
                >
                  <Link to="/dashboard">
                    Browse Library
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/upload">
                    Upload Content
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-library-blue-900 hover:bg-library-blue-50"
                >
                  <Link to="/register">
                    Sign Up Now
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/login">
                    Log In
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const ValueCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <h3 className="text-xl font-semibold text-library-blue-800 mb-3 font-serif">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-library-blue-100 text-library-blue-800 font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-library-blue-800 mb-2 font-serif">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamMemberCard = ({ name, role, image, description }: { name: string, role: string, image: string, description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center">
    <div className="mb-4">
      <img 
        src={image} 
        alt={name} 
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />
    </div>
    <h3 className="text-xl font-semibold text-library-blue-800 mb-1 font-serif">{name}</h3>
    <p className="text-library-blue-600 font-medium mb-3">{role}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;

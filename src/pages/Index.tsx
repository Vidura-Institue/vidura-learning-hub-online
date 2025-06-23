import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Star, ChevronRight, Menu, X, Phone, Mail, MapPin, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dashboard } from "@/components/Dashboard";
import { TeacherRecruitmentModal } from "@/components/TeacherRecruitmentModal";
import { HeroCarousel } from "@/components/HeroCarousel";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-blue-900">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <TeacherRecruitmentModal />
        <Dashboard />
      </>
    );
  }

  const subjects = [
    { name: "Mathematics", icon: "🔢", grades: "1-13" },
    { name: "Sinhala", icon: "🇱🇰", grades: "1-13" },
    { name: "English", icon: "📚", grades: "1-13" },
    { name: "Science", icon: "🔬", grades: "6-13" },
    { name: "History", icon: "🏛️", grades: "6-13" },
    { name: "ICT", icon: "💻", grades: "6-13" }
  ];

  const features = [
    {
      title: "Grade 1-5 (Primary)",
      description: "Foundation subjects including Mathematics, Sinhala, English, and Environmental Studies",
      icon: "👶",
      materials: "Basic concepts and interactive learning materials"
    },
    {
      title: "Grade 6-11 (Secondary)", 
      description: "Core subjects for O/L preparation including all major subjects",
      icon: "📖",
      materials: "Comprehensive study materials and practice exercises"
    },
    {
      title: "Grade 12-13 (A/L)",
      description: "Advanced Level subjects for university preparation",
      icon: "🎓",
      materials: "In-depth content and exam-focused materials"
    }
  ];

  return (
    <div className="min-h-screen">
      <TeacherRecruitmentModal />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-900" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Vidura
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('grades')} className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                Grades
              </button>
              <button onClick={() => scrollToSection('subjects')} className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                Subjects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                Contact
              </button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-yellow-100 text-blue-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 border-t-2 border-yellow-400">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Home
                </button>
                <button onClick={() => scrollToSection('grades')} className="text-left text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Grades
                </button>
                <button onClick={() => scrollToSection('subjects')} className="text-left text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Subjects
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-blue-900 hover:text-yellow-600 transition-colors font-medium">
                  Contact
                </button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-semibold w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Carousel Section */}
      <section id="home" className="pt-16">
        <HeroCarousel />
      </section>

      {/* Grade Levels Section */}
      <section id="grades" className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Learning for Every Grade</h2>
            <p className="text-xl text-blue-800 max-w-2xl mx-auto">
              Comprehensive educational materials tailored for Sri Lankan curriculum from Grade 1 to 13
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-yellow-200 hover:border-yellow-400">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-blue-900">{feature.title}</CardTitle>
                  <CardDescription className="text-blue-700">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-blue-600 mb-4">{feature.materials}</p>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-semibold"
                  >
                    Access Materials
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-16 px-4 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Available Subjects</h2>
            <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
              All major subjects covered according to Sri Lankan education curriculum
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/95 hover:bg-white border-yellow-300 hover:border-yellow-400">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h3 className="font-semibold text-blue-900 mb-2">{subject.name}</h3>
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-blue-900 hover:bg-yellow-200">
                    Grade {subject.grades}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Learning Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Have questions about our learning platform? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-yellow-200 hover:border-yellow-400">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Call Us</h3>
                <p className="text-blue-700">+94 11 234 5678</p>
                <p className="text-blue-700">+94 77 123 4567</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-yellow-200 hover:border-yellow-400">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Email Us</h3>
                <p className="text-blue-700">info@vidura.lk</p>
                <p className="text-blue-700">support@vidura.lk</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-yellow-200 hover:border-yellow-400">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Visit Us</h3>
                <p className="text-blue-700">123 Education Street</p>
                <p className="text-blue-700">Colombo 07, Sri Lanka</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-900" />
                </div>
                <span className="text-2xl font-bold text-yellow-400">Vidura</span>
              </div>
              <p className="text-yellow-100 leading-relaxed">
                Providing quality education for all Sri Lankan students from Grade 1 to 13.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2 text-yellow-100">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-yellow-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('grades')} className="hover:text-yellow-400 transition-colors">Grade Levels</button></li>
                <li><button onClick={() => scrollToSection('subjects')} className="hover:text-yellow-400 transition-colors">Subjects</button></li>
                <li><button onClick={() => navigate('/auth')} className="hover:text-yellow-400 transition-colors">Sign Up</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Grade Levels</h4>
              <ul className="space-y-2 text-yellow-100">
                <li><span className="hover:text-yellow-400 transition-colors">Primary (1-5)</span></li>
                <li><span className="hover:text-yellow-400 transition-colors">Secondary (6-11)</span></li>
                <li><span className="hover:text-yellow-400 transition-colors">Advanced Level (12-13)</span></li>
                <li><span className="hover:text-yellow-400 transition-colors">Open Access</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h4>
              <ul className="space-y-2 text-yellow-100">
                <li>📞 +94 11 234 5678</li>
                <li>✉️ info@vidura.lk</li>
                <li>📍 Colombo 07, Sri Lanka</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-yellow-600 mt-8 pt-8 text-center text-yellow-200">
            <p>&copy; 2024 Vidura Educational Platform. All rights reserved. Quality education for all Sri Lankan students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

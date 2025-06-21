
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, GraduationCap, Users, Award, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroCarousel = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  const slides = [
    {
      id: 1,
      title: "Vidura Educational Institute",
      subtitle: "Excellence in Private Tuition",
      description: "Join Sri Lanka's premier tuition institute with experienced teachers and proven results for Grade 1-13 students.",
      buttonText: "Enroll Now",
      buttonAction: () => navigate('/auth'),
      background: "from-blue-600 to-indigo-700",
      icon: <GraduationCap className="w-16 h-16 text-white mb-4" />,
      features: ["Expert Teachers", "Small Batch Sizes", "Proven Track Record"]
    },
    {
      id: 2,
      title: "Master Every Subject",
      subtitle: "Vidura Institute's Comprehensive Classes",
      description: "From Mathematics to Science, Literature to ICT - our specialized teachers guide you to academic excellence.",
      buttonText: "View Subjects",
      buttonAction: () => navigate('/auth'),
      background: "from-emerald-600 to-teal-700",
      icon: <BookOpen className="w-16 h-16 text-white mb-4" />,
      features: ["All Subjects Covered", "Grade-wise Classes", "Exam Focused"]
    },
    {
      id: 3,
      title: "O/L & A/L Success",
      subtitle: "Vidura's Specialized Programs",
      description: "Achieve outstanding results in your O/L and A/L examinations with our targeted coaching programs.",
      buttonText: "Join Classes",
      buttonAction: () => navigate('/auth'),
      background: "from-purple-600 to-violet-700",
      icon: <Award className="w-16 h-16 text-white mb-4" />,
      features: ["O/L Preparation", "A/L Excellence", "University Entry"]
    },
    {
      id: 4,
      title: "Small Batch Learning",
      subtitle: "Personalized Attention at Vidura",
      description: "Experience quality education with small batch sizes ensuring every student gets individual attention.",
      buttonText: "Register Today",
      buttonAction: () => navigate('/auth'),
      background: "from-rose-600 to-pink-700",
      icon: <Users className="w-16 h-16 text-white mb-4" />,
      features: ["Small Batches", "Personal Attention", "Interactive Learning"]
    },
    {
      id: 5,
      title: "Free Online Resources",
      subtitle: "Access Learning Materials Anytime",
      description: "Complement your tuition classes with our comprehensive online learning platform - completely accessible to all students.",
      buttonText: "Start Learning",
      buttonAction: () => navigate('/auth'),
      background: "from-amber-600 to-orange-700",
      icon: <Star className="w-16 h-16 text-white mb-4" />,
      features: ["24/7 Access", "Comprehensive Materials", "All Grade Levels"]
    }
  ];

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className={`min-h-[600px] bg-gradient-to-br ${slide.background} flex items-center justify-center px-4`}>
                <div className="container mx-auto">
                  <div className="text-center max-w-4xl mx-auto text-white">
                    <div className="flex justify-center mb-6">
                      {slide.icon}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90">
                      {slide.subtitle}
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/80">
                      {slide.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {slide.features.map((feature, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-white font-medium">✓ {feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 font-semibold"
                      onClick={slide.buttonAction}
                    >
                      {slide.buttonText} <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

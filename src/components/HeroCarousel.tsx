
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

    // Auto-play functionality with loop
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
      background: "from-yellow-400 via-yellow-500 to-amber-600",
      icon: <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-navy-900 mb-4" />,
      features: ["Expert Teachers", "Small Batch Sizes", "Proven Track Record"]
    },
    {
      id: 2,
      title: "Master Every Subject",
      subtitle: "Vidura Institute's Comprehensive Classes",
      description: "From Mathematics to Science, Literature to ICT - our specialized teachers guide you to academic excellence.",
      buttonText: "View Subjects",
      buttonAction: () => navigate('/auth'),
      background: "from-blue-900 via-blue-800 to-indigo-900",
      icon: <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 mb-4" />,
      features: ["All Subjects Covered", "Grade-wise Classes", "Exam Focused"]
    },
    {
      id: 3,
      title: "O/L & A/L Success",
      subtitle: "Vidura's Specialized Programs",
      description: "Achieve outstanding results in your O/L and A/L examinations with our targeted coaching programs.",
      buttonText: "Join Classes",
      buttonAction: () => navigate('/auth'),
      background: "from-yellow-500 via-amber-500 to-orange-500",
      icon: <Award className="w-12 h-12 md:w-16 md:h-16 text-blue-900 mb-4" />,
      features: ["O/L Preparation", "A/L Excellence", "University Entry"]
    },
    {
      id: 4,
      title: "Small Batch Learning",
      subtitle: "Personalized Attention at Vidura",
      description: "Experience quality education with small batch sizes ensuring every student gets individual attention.",
      buttonText: "Register Today",
      buttonAction: () => navigate('/auth'),
      background: "from-blue-800 via-indigo-800 to-blue-900",
      icon: <Users className="w-12 h-12 md:w-16 md:h-16 text-yellow-300 mb-4" />,
      features: ["Small Batches", "Personal Attention", "Interactive Learning"]
    },
    {
      id: 5,
      title: "Online Resources",
      subtitle: "Access Learning Materials Anytime",
      description: "Complement your tuition classes with our comprehensive online learning platform - accessible to all students.",
      buttonText: "Start Learning",
      buttonAction: () => navigate('/auth'),
      background: "from-amber-400 via-yellow-500 to-yellow-600",
      icon: <Star className="w-12 h-12 md:w-16 md:h-16 text-blue-900 mb-4" />,
      features: ["24/7 Access", "Comprehensive Materials", "All Grade Levels"]
    }
  ];

  return (
    <div className="relative w-full">
      <Carousel 
        setApi={setApi} 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className={`min-h-[500px] md:min-h-[600px] bg-gradient-to-br ${slide.background} flex items-center justify-center px-4 py-8`}>
                <div className="container mx-auto">
                  <div className="text-center max-w-4xl mx-auto text-white">
                    <div className="flex justify-center mb-4 md:mb-6">
                      {slide.icon}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-white/90">
                      {slide.subtitle}
                    </h2>
                    <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed text-white/90 px-2">
                      {slide.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8 px-2">
                      {slide.features.map((feature, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 border border-white/30">
                          <span className="text-white font-medium text-sm md:text-base">✓ {feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-yellow-50 hover:text-blue-900 text-base md:text-lg px-6 py-4 md:px-8 md:py-6 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={slide.buttonAction}
                    >
                      {slide.buttonText} <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-2 md:right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
      </Carousel>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              current === index ? 'bg-white shadow-lg' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};


import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Award } from "lucide-react";

export const TeacherRecruitmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('hasSeenTeacherModal');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenTeacherModal', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Calling for Teachers!
            </DialogTitle>
          </div>
          
          <DialogDescription className="text-left">
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/93eb4d4b-7987-4284-b55c-412ed1254e6d.png" 
                  alt="Teaching opportunity" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700 font-medium mb-4">
                  Join Vidura and help shape the future of education in Sri Lanka!
                </p>
                <p className="text-gray-600">
                  Be part of our mission to provide quality education to thousands of students across the country.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Create Content</h4>
                  <p className="text-sm text-gray-600">
                    Develop engaging learning materials for Grade 1-13 students following Sri Lankan curriculum
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Make an Impact</h4>
                  <p className="text-sm text-gray-600">
                    Help thousands of students achieve their academic goals and build a brighter future
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-center">Ready to Join Our Team?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">@</span>
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">teachers@vidura.lk</p>
                      <p className="text-sm text-blue-600">Send us your CV and teaching portfolio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">📞</span>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">+94 11 234 5678</p>
                      <p className="text-sm text-green-600">Call us for immediate opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleClose}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg font-semibold"
          >
            Continue to Website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

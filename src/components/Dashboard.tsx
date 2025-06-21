
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User, BookOpen, Play, FileText, Brain, Trophy } from "lucide-react";
import { toast } from "sonner";

interface Subject {
  id: string;
  name: string;
  grade_level: number;
  description: string;
  icon_emoji: string;
}

interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  content_type: string;
  grade_level: number;
  subject_id: string;
}

interface Profile {
  full_name: string;
  grade_level: number;
  school: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
    fetchSubjects();
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (profile?.grade_level) {
      setSelectedGrade(profile.grade_level);
    }
  }, [profile]);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      fetchProfile(user.id);
    }
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('grade_level', { ascending: true });
    
    if (data) {
      setSubjects(data);
    }
  };

  const fetchMaterials = async () => {
    const { data, error } = await supabase
      .from('learning_materials')
      .select('*')
      .order('grade_level', { ascending: true });
    
    if (data) {
      setMaterials(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'exercise': return <Trophy className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredSubjects = selectedGrade 
    ? subjects.filter(subject => subject.grade_level === selectedGrade)
    : subjects;

  const filteredMaterials = selectedGrade
    ? materials.filter(material => material.grade_level === selectedGrade)
    : materials;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Vidura
                </h1>
                <p className="text-sm text-gray-600">Education for All</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {profile?.full_name || user?.email}
                </span>
                {profile?.grade_level && (
                  <Badge variant="secondary">Grade {profile.grade_level}</Badge>
                )}
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}!
          </h2>
          <p className="text-xl text-gray-600">
            Continue your learning journey with educational materials
          </p>
        </div>

        {/* Grade Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGrade === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGrade(null)}
            >
              All Grades
            </Button>
            {Array.from({ length: 13 }, (_, i) => i + 1).map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedGrade ? `Grade ${selectedGrade} Subjects` : 'All Subjects'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{subject.icon_emoji}</div>
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                  <Badge variant="secondary">Grade {subject.grade_level}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Materials */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedGrade ? `Grade ${selectedGrade} Learning Materials` : 'All Learning Materials'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => {
              const subject = subjects.find(s => s.id === material.subject_id);
              return (
                <Card key={material.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getContentIcon(material.content_type)}
                        {material.content_type}
                      </Badge>
                      <Badge variant="secondary">Grade {material.grade_level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                    {subject && (
                      <p className="text-sm text-blue-600 font-medium">
                        {subject.icon_emoji} {subject.name}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Access Material
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

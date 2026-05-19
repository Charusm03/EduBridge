import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useAppStore } from '@/store/useAppStore';
import { StudentProfile, StudyDay } from '@/types/types';
import { toast } from 'sonner';

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'History', 'Geography', 'English', 'Computer Science', 
  'Economics', 'Other'
];

const grades = [
  'Class 6-8', 'Class 9-10', 'Class 11-12', 
  'Undergraduate', 'Other'
];

import { generateStudyPlan } from '@/services/planGenerator';

export default function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((state) => state.setProfile);
  const setStudyPlan = useAppStore((state) => state.setStudyPlan);

  const [formData, setFormData] = useState<StudentProfile>({
    name: '',
    subject: '',
    grade: '',
    goal: '',
    hoursPerDay: 2,
    targetDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.subject || !formData.grade || !formData.goal || !formData.targetDate) {
      toast.error('Please fill in all fields');
      return;
    }

    // Save profile
    setProfile(formData);

    // Generate study plan using service
    const plan = generateStudyPlan(formData);
    setStudyPlan(plan);
    
    toast.success('Your intelligent study plan has been generated!');
    navigate('/plan');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Let's Get Started</CardTitle>
            <CardDescription>Tell us about your learning goals</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, subject: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Grade / Level</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, grade: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Study Goal</Label>
                <Textarea 
                  id="goal" 
                  placeholder="e.g. Pass my board exam in 30 days"
                  className="min-h-[100px]"
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Available Hours Per Day</Label>
                  <Input 
                    id="hours" 
                    type="number" 
                    min="1" 
                    max="8"
                    value={formData.hoursPerDay}
                    onChange={(e) => setFormData({...formData, hoursPerDay: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">Target Date</Label>
                  <Input 
                    id="target" 
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold">
                Generate My Study Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

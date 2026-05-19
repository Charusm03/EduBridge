import { Layout } from "@/components/layouts/Layout";
import { GraduationCap, BookOpen, MessageSquare, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);

  const floatingIcons = ['📚', '🎓', '✏️', '📖', '🌟', '💡'];

  const features = [
    {
      title: "Study Plans",
      description: "Get a personalized 7-day study roadmap tailored to your goals.",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Ask AI",
      description: "Instant, clear explanations for any subject question you have.",
      icon: MessageSquare,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Track Progress",
      description: "Monitor your scores and streaks to stay motivated every day.",
      icon: LineChart,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <Layout>
      <div className="relative space-y-12 py-8 overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="floating-icon text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            >
              {floatingIcons[i % floatingIcons.length]}
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative text-center space-y-6 z-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            EduBridge
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your Personal AI Study Coach
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              className="px-8 h-12 text-lg rounded-full"
              onClick={() => navigate(profile ? '/plan' : '/onboarding')}
            >
              {profile ? "Continue Learning" : "Start Learning"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-2`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Motivational Quote or Additional Info */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-balance">
            "Education is the most powerful weapon which you can use to change the world."
          </h2>
          <p className="text-primary font-medium">— Nelson Mandela</p>
        </section>
      </div>
    </Layout>
  );
}

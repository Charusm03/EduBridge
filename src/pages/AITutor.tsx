import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, GraduationCap, User, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ChatMessage } from '@/types/types';

const suggestions = [
  "Explain photosynthesis in simple terms",
  "How do I solve quadratic equations?",
  "What was the main cause of World War I?",
  "Difference between DNA and RNA",
];

export default function AITutor() {
  const { chatHistory, addChatMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socraticStage, setSocraticStage] = useState(0); // 0: None, 1: Waiting for initial knowledge, 2: Waiting for guiding answers
  const [currentTopic, setCurrentTopic] = useState('');
  const [socraticMode, setSocraticMode] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory, isTyping]);

  const addAIMessage = (content: string) => {
    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addChatMessage(aiMsg);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    // AI Logic for Socratic Dialogue
    setTimeout(() => {
      setIsTyping(false);

      if (!socraticMode) {
        addAIMessage(`As your EduBridge Tutor, regarding "${text}": [Direct Answer Explanation]. Do you have more questions?`);
        return;
      }

      if (socraticStage === 0) {
        setCurrentTopic(text);
        setSocraticStage(1);
        addAIMessage(`Before I explain, what do you already know about "${text}"? Even a rough idea is fine.`);
      } else if (socraticStage === 1) {
        setSocraticStage(2);
        // Stage 2: Guiding questions based on currentTopic
        if (currentTopic.toLowerCase().includes('newton')) {
          addAIMessage("Interesting! If you push a heavy box vs a light box with the same force, which moves faster? And what do you think that tells us about the relationship between force, mass and motion?");
        } else {
          addAIMessage(`Good start. Let's dig deeper: Why do you think "${currentTopic}" is important in this context? And what would happen if we changed the core elements involved?`);
        }
      } else if (socraticStage === 2) {
        setSocraticStage(0);
        setCurrentTopic('');
        addAIMessage(`Exactly — here's how it works: [Full, clear explanation reinforcing what student figured out]. Great job connecting the dots! What's next?`);
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-6rem)] max-w-3xl mx-auto py-4">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EduBridge Tutor</h1>
              <p className="text-sm text-muted-foreground">Interactive Socratic Learning</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSocraticMode(!socraticMode);
              setSocraticStage(0);
            }}
            className={socraticMode ? "text-primary bg-primary/10" : "text-muted-foreground"}
          >
            {socraticMode ? "Socratic Mode ON" : "Skip Socratic mode"}
          </Button>
        </div>

        <Card className="flex-1 flex flex-col min-h-0 shadow-lg border-none">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6">
              {chatHistory.length === 0 && (
                <div className="text-center py-12 space-y-4">
                  <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">How can I help you today?</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Ask any question about your subjects and let's explore the answers together.
                  </p>
                </div>
              )}

              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-muted' : 'bg-primary/10 text-primary'
                    }`}>
                      {msg.role === 'user' ? <User className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                    </div>
                    <div className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <p className="text-[10px] font-semibold text-muted-foreground px-1 mb-0.5">
                        {msg.role === 'user' ? 'You' : 'EduBridge Tutor'}
                      </p>
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-white text-slate-800 border rounded-tr-none' 
                          : 'bg-blue-50 text-slate-800 border-blue-100 border rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground px-1">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
            
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
            >
              <Input 
                placeholder="Type your question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full px-6 h-12"
              />
              <Button type="submit" size="icon" className="rounded-full h-12 w-12 shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

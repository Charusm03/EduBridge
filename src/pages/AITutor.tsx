import { useState, useRef, useEffect, useCallback } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, GraduationCap, User, Sparkles, Mic, MicOff, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ChatMessage } from '@/types/types';
import { searchWikipedia, extractKeywords, WikipediaSummary } from '@/services/wikipedia';

const suggestions = [
  "Explain photosynthesis in simple terms",
  "How do I solve quadratic equations?",
  "What was the main cause of World War I?",
  "Difference between DNA and RNA",
];

const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'fr-FR', name: 'French' },
  { code: 'es-ES', name: 'Spanish' },
];

// SpeechRecognition types
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
}

function getSocraticQuestions(topic: string, wikiData: WikipediaSummary | null): string[] {
  const t = topic.toLowerCase();
  const questions: Record<string, string[]> = {
    newton: [
      "If you push a heavy box and a light box with the same force, which accelerates more?",
      "What does that tell you about the relationship between mass and acceleration?"
    ],
    photosynthesis: [
      "Plants appear green — what colour of light are they NOT absorbing?",
      "If plants take in CO₂ and release O₂, where does the carbon go?"
    ],
    gravity: [
      "Why does a feather fall slower than a stone on Earth, but they fall at the same speed on the Moon?",
      "What role does air resistance play?"
    ],
    dna: [
      "DNA has a double-helix shape — why might two strands be more stable than one?",
      "If A always pairs with T, and C with G, how does that help copying?"
    ],
    rna: [
      "RNA is single-stranded — how might that make it more flexible than DNA?",
      "Why do you think cells use RNA as a messenger instead of sending DNA directly?"
    ],
    war: [
      "If countries were economically linked before the war, why might trade conflicts escalate?",
      "How do alliances turn a local conflict into a global one?"
    ],
    quadratic: [
      "A quadratic graph is a parabola — what does the vertex represent?",
      "If x² = 9, why are there two solutions? What does that mean on a graph?"
    ],
    evolution: [
      "If a giraffe stretches its neck to reach leaves, will its offspring have longer necks? Why or why not?",
      "What is the difference between adaptation over generations and individual change?"
    ],
    atom: [
      "Most of an atom is empty space — why don't objects pass through each other?",
      "What keeps electrons from crashing into the nucleus?"
    ],
    cell: [
      "A cell is like a tiny factory — what part acts as the 'control room'?",
      "Mitochondria produce energy — what would happen to a muscle cell without them?"
    ],
  };

  for (const key of Object.keys(questions)) {
    if (t.includes(key)) return questions[key];
  }

  // Fallback based on Wikipedia extract
  if (wikiData?.extract) {
    const ex = wikiData.extract.toLowerCase();
    if (ex.includes('force') && ex.includes('mass')) return questions.newton;
    if (ex.includes('plant') && ex.includes('light')) return questions.photosynthesis;
    if (ex.includes('gravity') || ex.includes('fall')) return questions.gravity;
    if (ex.includes('molecule') && ex.includes('acid')) return questions.dna;
    if (ex.includes('equation') && ex.includes('degree')) return questions.quadratic;
    if (ex.includes('evolution') || ex.includes('natural selection')) return questions.evolution;
  }

  return [
    `Think about "${topic}" — what is the most important thing someone should know about it?`,
    "Can you connect this idea to something you experience in everyday life?"
  ];
}

function buildRealAnswer(topic: string, wikiData: WikipediaSummary | null, stage: number): string {
  const title = wikiData?.title || topic;
  const extract = wikiData?.extract;

  if (stage === 0) {
    if (extract) {
      return `Before I explain **${title}**, tell me — what do you already know about it? Even a rough idea is fine.`;
    }
    return `Before I explain "${topic}", what do you already know about it? Even a rough idea is fine.`;
  }

  if (stage === 1) {
    const qs = getSocraticQuestions(topic, wikiData);
    return `Good start! Let's think deeper:\n\n1. ${qs[0]}\n2. ${qs[1]}\n\nTake your time — there are no wrong answers here.`;
  }

  if (stage === 2) {
    if (extract) {
      return `Great thinking! Here's how it actually works:\n\n**${title}**: ${extract}\n\nYou were on the right track — keep making those connections! Want to explore another topic?`;
    }
    return `Great thinking! Here's the full picture:\n\n**${title}** is an important concept. While I couldn't fetch detailed sources right now, the key idea is that understanding comes from asking "why" and "how." You did exactly that — keep it up! Want to explore another topic?`;
  }

  return "I'm here to help! What would you like to learn?";
}

export default function AITutor() {
  const { chatHistory, addChatMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socraticStage, setSocraticStage] = useState(0);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentWikiData, setCurrentWikiData] = useState<WikipediaSummary | null>(null);
  const [socraticMode, setSocraticMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [micError, setMicError] = useState('');
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setHasSpeechSupport(true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory, isTyping]);

  const addAIMessage = useCallback((content: string) => {
    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addChatMessage(aiMsg);
  }, [addChatMessage]);

  const handleMicToggle = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    setMicError('');
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLang;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setMicError('Microphone access denied. Please allow microphone permission.');
      } else if (event.error === 'no-speech') {
        setMicError('No speech detected. Please try again.');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSend = async (text: string) => {
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

    if (!socraticMode) {
      // Direct mode: fetch Wikipedia and answer immediately
      try {
        const keyword = extractKeywords(text);
        const wikiData = await searchWikipedia(keyword);
        setIsTyping(false);
        if (wikiData) {
          addAIMessage(`According to **${wikiData.title}** (validated from Wikipedia):\n\n${wikiData.extract}\n\nWould you like me to break this down further?`);
        } else {
          addAIMessage(`I couldn't find a verified source for "${text}" right now. Could you rephrase or ask something more specific?`);
        }
      } catch {
        setIsTyping(false);
        addAIMessage('Sorry, I had trouble fetching real-world data. Please try again.');
      }
      return;
    }

    // Socratic mode
    if (socraticStage === 0) {
      const keyword = extractKeywords(text);
      try {
        const wikiData = await searchWikipedia(keyword);
        setCurrentWikiData(wikiData);
        setCurrentTopic(text);
        setSocraticStage(1);
        setIsTyping(false);
        addAIMessage(buildRealAnswer(text, wikiData, 0));
      } catch {
        setCurrentTopic(text);
        setSocraticStage(1);
        setIsTyping(false);
        addAIMessage(buildRealAnswer(text, null, 0));
      }
    } else if (socraticStage === 1) {
      setSocraticStage(2);
      setIsTyping(false);
      addAIMessage(buildRealAnswer(currentTopic, currentWikiData, 1));
    } else if (socraticStage === 2) {
      setSocraticStage(0);
      setIsTyping(false);
      addAIMessage(buildRealAnswer(currentTopic, currentWikiData, 2));
      setCurrentTopic('');
      setCurrentWikiData(null);
    }
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
                          ? 'bg-primary/5 text-foreground border rounded-tr-none' 
                          : 'bg-secondary text-foreground border rounded-tl-none'
                      }`}>
                        {msg.role === 'assistant' && msg.content.includes('Wikipedia') && (
                          <div className="flex items-center gap-1 mb-1.5">
                            <Globe className="h-3 w-3 text-emerald-500" />
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified from Wikipedia</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
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
                    <div className="bg-secondary border border-border px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
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
            
            <div className="space-y-2">
              {micError && (
                <div className="flex items-center gap-2 text-sm text-red-500 font-medium px-2">
                  <span>{micError}</span>
                </div>
              )}
              {isListening && (
                <div className="flex items-center gap-2 text-sm text-red-500 font-medium px-2">
                  <Mic className="h-4 w-4 animate-pulse" />
                  Listening…
                </div>
              )}
              <form 
                className="flex flex-col md:flex-row gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
              >
                <div className="flex gap-2 shrink-0">
                  {hasSpeechSupport && (
                    <Button
                      type="button"
                      variant={isListening ? "destructive" : "ghost"}
                      size="icon"
                      onClick={handleMicToggle}
                      className="rounded-full h-12 w-12 shrink-0 border"
                    >
                      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  )}
                  <Select value={selectedLang} onValueChange={setSelectedLang}>
                    <SelectTrigger className="w-[100px] md:w-[140px] h-12 rounded-full shrink-0">
                      <SelectValue placeholder="Lang" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 flex-1 min-w-0">
                  <Input 
                    placeholder="Type your question..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="rounded-full px-6 h-12 flex-1 min-w-0"
                  />
                  <Button type="submit" size="icon" className="rounded-full h-12 w-12 shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, ArrowRight, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your Guardian AI assistant. I can help with travel safety information, destination recommendations, and answer questions about current events. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('paris')) {
        response = "Paris is currently rated as 'Exercise Caution' due to occasional protests and pickpocketing in tourist areas. However, most visits are trouble-free. The Louvre Museum will be partially closed for renovations next month.";
      } else if (input.toLowerCase().includes('tokyo')) {
        response = "Tokyo is rated 'Safe to Travel' with very low crime rates. There's currently a cherry blossom festival happening in several parks across the city. It's an excellent time to visit!";
      } else if (input.toLowerCase().includes('safety') || input.toLowerCase().includes('safe')) {
        response = "I can provide safety information for any destination. Just let me know where you're planning to visit, and I'll share current safety ratings and events happening there.";
      } else {
        response = "I'd be happy to help with that. For specific destination safety information, just mention the city or country you're interested in. I can provide safety ratings, current events, and travel tips.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-brand-purple hover:bg-brand-purple-dark text-white"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[320px] md:w-[400px] p-0 mr-6 mb-6" 
          align="end"
        >
          <div className="bg-brand-purple text-white p-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              <span className="font-medium">Guardian AI Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[350px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-brand-purple text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 block text-right mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t">
            <form 
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Ask about travel safety..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit"
                size="icon" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AIAssistant;


import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

// Map English words to image URLs (replace with your own images or use Unsplash, etc.)
const iconImageMap: Record<string, string> = {
  cat: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80",
  dog: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=200&q=80",
  house: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
  bicycle: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80",
  car: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=200&q=80",
  book: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80",
  coffee: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
  apple: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=200&q=80",
  tree: "https://images.unsplash.com/photo-1465101178521-c1a9136a3a16?auto=format&fit=crop&w=200&q=80",
  sun: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=200&q=80",
  moon: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=200&q=80",
  water: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
  bread: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80",
  milk: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=200&q=80",
  cheese: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80",
  hello: "https://images.unsplash.com/photo-1465101178521-c1a9136a3a16?auto=format&fit=crop&w=200&q=80",
  "thank you": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80",
  red: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
  blue: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=200&q=80",
  green: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=200&q=80",
  yellow: "https://images.unsplash.com/photo-1465101178521-c1a9136a3a16?auto=format&fit=crop&w=200&q=80",
  // Add more mappings as needed
};
const defaultIconImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80";

interface WordCardProps {
  word: {
    dutch: string;
    english: string;
    category: string;
  };
  onNext: () => void;
  onSpeak: (word: string) => void;
}

const WordCard = ({ word, onNext, onSpeak }: WordCardProps) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate a placeholder image URL based on the English word
  const getImageUrl = (englishWord: string) => {
    // Use a simple hash to get consistent images for the same word
    const hash = englishWord.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const imageId = Math.abs(hash) % 1000;
    return `https://picsum.photos/400/300?random=${imageId}`;
  };

  // Handle touch/mouse events for swipe gesture
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = clientX - centerX;
    
    setDragOffset({ x: deltaX * 0.5, y: 0 });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If swiped right enough (threshold: 100px), go to next word
    if (dragOffset.x > 100) {
      toast.success("Great! Next word coming up!");
      setTimeout(onNext, 200);
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      };
      
      const handleGlobalMouseUp = () => {
        handleEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragOffset.x]);

  const cardStyle = {
    transform: `translateX(${dragOffset.x}px) rotate(${dragOffset.x * 0.1}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    opacity: Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300),
  };

  return (
    <Card 
      ref={cardRef}
      className="relative overflow-hidden bg-white shadow-xl border-0 cursor-grab active:cursor-grabbing"
      style={cardStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe indicator */}
      {dragOffset.x > 50 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Release to continue!
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
        {word.category}
      </div>

      {/* Image with emoji fallback */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src={getImageUrl(word.english)}
          alt={word.english}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide the broken image
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100">
          {/* Overlay image for the word */}
          <img
            src={iconImageMap[word.english] || defaultIconImage}
            alt={word.english + ' visual'}
            className="w-[30rem] h-[25rem] object-contain drop-shadow-lg"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Dutch Word with Pronunciation */}
        <div className="text-center space-y-3">
          <h2 className="text-5xl font-bold text-gray-900 mb-3">{word.dutch}</h2>
          <Button
            variant="default"
            size="lg"
            onClick={() => onSpeak(word.dutch)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold"
          >
            <Volume2 className="w-6 h-6 mr-2" />
            Hear Pronunciation
          </Button>
        </div>

        {/* Translation Section */}
        <div className="text-center space-y-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowTranslation(!showTranslation)}
            className="px-6 py-3 text-lg border-2"
          >
            {showTranslation ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </Button>
          
          {showTranslation && (
            <div className="bg-gray-50 rounded-lg p-4 animate-in fade-in duration-300">
              <p className="text-3xl font-semibold text-gray-700">
                {word.english}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold"
          >
            Next Word
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>

        {/* Swipe hint */}
        <p className="text-center text-sm text-gray-500 mt-4">
          💡 Swipe right or tap "Next Word" to continue
        </p>
      </div>
    </Card>
  );
};

export default WordCard;

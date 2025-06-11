
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

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
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 text-6xl">
          {word.english === 'cat' && '🐱'}
          {word.english === 'dog' && '🐕'}
          {word.english === 'house' && '🏠'}
          {word.english === 'bicycle' && '🚲'}
          {word.english === 'car' && '🚗'}
          {word.english === 'book' && '📚'}
          {word.english === 'coffee' && '☕'}
          {word.english === 'apple' && '🍎'}
          {word.english === 'tree' && '🌳'}
          {word.english === 'sun' && '☀️'}
          {word.english === 'moon' && '🌙'}
          {word.english === 'water' && '💧'}
          {word.english === 'bread' && '🍞'}
          {word.english === 'milk' && '🥛'}
          {word.english === 'cheese' && '🧀'}
          {word.english === 'hello' && '👋'}
          {word.english === 'thank you' && '🙏'}
          {word.english === 'red' && '🔴'}
          {word.english === 'blue' && '🔵'}
          {word.english === 'green' && '🟢'}
          {word.english === 'yellow' && '🟡'}
          {word.english === 'big' && '📏'}
          {word.english === 'small' && '🔸'}
          {word.english === 'beautiful' && '🌺'}
          {word.english === 'fast' && '💨'}
          {word.english === 'slow' && '🐌'}
          {word.english === 'warm' && '🔥'}
          {word.english === 'cold' && '❄️'}
          {word.english === 'new' && '✨'}
          {word.english === 'old' && '📜'}
          {word.english === 'good' && '👍'}
          {word.english === 'bad' && '👎'}
          {word.english === 'yes' && '✅'}
          {word.english === 'no' && '❌'}
          {word.english === 'please' && '🙏'}
          {word.english === 'sorry' && '😔'}
          {word.english === 'goodbye' && '👋'}
          {word.english === 'good morning' && '🌅'}
          {word.english === 'good evening' && '🌆'}
          {word.english === 'good night' && '🌙'}
          {word.english === 'to eat' && '🍽️'}
          {word.english === 'to drink' && '🥤'}
          {word.english === 'to sleep' && '😴'}
          {word.english === 'to walk' && '🚶'}
          {word.english === 'to run' && '🏃'}
          {word.english === 'to talk' && '💬'}
          {word.english === 'to listen' && '👂'}
          {word.english === 'to look' && '👀'}
          {!['cat', 'dog', 'house', 'bicycle', 'car', 'book', 'coffee', 'apple', 'tree', 'sun', 'moon', 'water', 'bread', 'milk', 'cheese', 'hello', 'thank you', 'red', 'blue', 'green', 'yellow', 'big', 'small', 'beautiful', 'fast', 'slow', 'warm', 'cold', 'new', 'old', 'good', 'bad', 'yes', 'no', 'please', 'sorry', 'goodbye', 'good morning', 'good evening', 'good night', 'to eat', 'to drink', 'to sleep', 'to walk', 'to run', 'to talk', 'to listen', 'to look'].includes(word.english) && '🎯'}
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

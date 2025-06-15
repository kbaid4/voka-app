import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import WordCard from "@/components/WordCard";

export default function Learn() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

  React.useEffect(() => {
    if (!category) {
      navigate("/dashboard");
    }
  }, [category, navigate]);
  if (!category) return null;

  // Adapt category.words to match WordCard's prop requirements
  const words = category.words.map((w: any) => ({
    ...w,
    dutch: w.dutch,
    english: w.english,
    category: category.key,
  }));
  const currentWord = words[currentWordIndex];
  const totalWords = words.length;
  const progress = ((currentWordIndex) / totalWords) * 100;

  const handleNext = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSpeak = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/dashboard')}>
            VOKA
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1"
            >
              Change Category
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWordIndex(0)}
              className="flex items-center gap-1"
            >
              Restart
            </Button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-md mx-auto w-full p-4">
        <ProgressBar progress={progress} wordsLearned={currentWordIndex} totalWords={totalWords} />
      </div>

      {/* Main Learning Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <WordCard 
            word={currentWord}
            onNext={handleNext}
            onSpeak={handleSpeak}
          />
        </div>
      </div>
    </div>
  );
}

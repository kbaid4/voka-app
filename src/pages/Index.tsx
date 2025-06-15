import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AuthModal from "@/components/AuthModal";
import WordCard from "@/components/WordCard";
import ProgressBar from "@/components/ProgressBar";
import { Volume2, RotateCcw, Globe, Check } from "lucide-react";
import { toast } from "sonner";

// Sample Dutch vocabulary for MVP
const dutchWords = [
  { dutch: "hallo", english: "hello", category: "greetings" },
  { dutch: "dank je", english: "thank you", category: "greetings" },
  { dutch: "water", english: "water", category: "food" },
  { dutch: "brood", english: "bread", category: "food" },
  { dutch: "fiets", english: "bicycle", category: "transport" },
  { dutch: "huis", english: "house", category: "home" },
  { dutch: "kat", english: "cat", category: "animals" },
  { dutch: "hond", english: "dog", category: "animals" },
  { dutch: "auto", english: "car", category: "transport" },
  { dutch: "boek", english: "book", category: "objects" },
  { dutch: "koffie", english: "coffee", category: "food" },
  { dutch: "melk", english: "milk", category: "food" },
  { dutch: "kaas", english: "cheese", category: "food" },
  { dutch: "appel", english: "apple", category: "food" },
  { dutch: "boom", english: "tree", category: "nature" },
  { dutch: "zon", english: "sun", category: "nature" },
  { dutch: "maan", english: "moon", category: "nature" },
  { dutch: "rood", english: "red", category: "colors" },
  { dutch: "blauw", english: "blue", category: "colors" },
  { dutch: "groen", english: "green", category: "colors" },
  { dutch: "geel", english: "yellow", category: "colors" },
  { dutch: "groot", english: "big", category: "adjectives" },
  { dutch: "klein", english: "small", category: "adjectives" },
  { dutch: "mooi", english: "beautiful", category: "adjectives" },
  { dutch: "lelijk", english: "ugly", category: "adjectives" },
  { dutch: "snel", english: "fast", category: "adjectives" },
  { dutch: "langzaam", english: "slow", category: "adjectives" },
  { dutch: "warm", english: "warm", category: "adjectives" },
  { dutch: "koud", english: "cold", category: "adjectives" },
  { dutch: "nieuw", english: "new", category: "adjectives" },
  { dutch: "oud", english: "old", category: "adjectives" },
  { dutch: "goed", english: "good", category: "adjectives" },
  { dutch: "slecht", english: "bad", category: "adjectives" },
  { dutch: "ja", english: "yes", category: "basics" },
  { dutch: "nee", english: "no", category: "basics" },
  { dutch: "misschien", english: "maybe", category: "basics" },
  { dutch: "alsjeblieft", english: "please", category: "greetings" },
  { dutch: "sorry", english: "sorry", category: "greetings" },
  { dutch: "dag", english: "goodbye", category: "greetings" },
  { dutch: "goedemorgen", english: "good morning", category: "greetings" },
  { dutch: "goedenavond", english: "good evening", category: "greetings" },
  { dutch: "welterusten", english: "good night", category: "greetings" },
  { dutch: "eten", english: "to eat", category: "verbs" },
  { dutch: "drinken", english: "to drink", category: "verbs" },
  { dutch: "slapen", english: "to sleep", category: "verbs" },
  { dutch: "lopen", english: "to walk", category: "verbs" },
  { dutch: "rennen", english: "to run", category: "verbs" },
  { dutch: "praten", english: "to talk", category: "verbs" },
  { dutch: "luisteren", english: "to listen", category: "verbs" },
  { dutch: "kijken", english: "to look", category: "verbs" }
];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(dutchWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordsLearned, setWordsLearned] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      
      // Check if language has been selected
      const language = localStorage.getItem('selectedLanguage');
      if (language) {
        setSelectedLanguage(language);
        setHasSelectedLanguage(true);
      }
    }
    
    // Shuffle words on app load
    const shuffled = [...dutchWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('isAuthenticated', 'true');
    toast.success("Welcome to VOKA! Please select a language to start learning");
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setHasSelectedLanguage(true);
    localStorage.setItem('selectedLanguage', language);
    toast.success(`You've selected ${language}! Ready to learn?`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500); // Give a brief moment for the toast to show
  };

  const handleNextWord = () => {
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setWordsLearned(wordsLearned + 1);
    } else {
      // Completed all words
      toast.success(`Congratulations! You've completed all ${shuffledWords.length} words!`);
      handleRestart();
    }
  };

  const handleRestart = () => {
    const shuffled = [...dutchWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentWordIndex(0);
    setWordsLearned(0);
    toast.success("New round started!");
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Speech synthesis not supported in this browser");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              VOKA
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn vocabulary with visual associations
            </p>
          </div>
          
          <Card className="p-6 space-y-4 shadow-lg">
            <h2 className="text-2xl font-semibold">Quick & Effective Learning</h2>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>• 🎯 50 essential Dutch words</li>
              <li>• 🖼️ Visual associations with images</li>
              <li>• 🔊 Audio pronunciation</li>
              <li>• 📱 Swipe-based learning (like Tinder!)</li>
              <li>• ⚡ Perfect for commutes & breaks</li>
            </ul>
          </Card>

          <Button 
            onClick={() => setShowAuthModal(true)}
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
          >
            Start Learning
          </Button>
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  // Show language selection if authenticated but language not selected
  if (!hasSelectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              VOKA
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose a language to start learning
            </p>
          </div>
          
          <Card className="p-6 space-y-6 shadow-lg">
            <h2 className="text-2xl font-semibold">Available Languages</h2>
            
            <div className="grid gap-4">
              <Button 
                onClick={() => handleLanguageSelect("Dutch")}
                size="lg"
                className="flex items-center justify-between px-6 py-8 bg-white hover:bg-gray-50 text-left border text-gray-800 shadow-sm"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Dutch</p>
                    <p className="text-sm text-muted-foreground">Nederlands</p>
                  </div>
                </div>
                <Check className="w-5 h-5 text-blue-500" />
              </Button>
              
              {/* Additional language options can be added here in the future */}
              <Button 
                disabled
                size="lg"
                className="flex items-center justify-between px-6 py-8 bg-white text-left border text-gray-400 opacity-60"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">German</p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </Button>
              
              <Button 
                disabled
                size="lg"
                className="flex items-center justify-between px-6 py-8 bg-white text-left border text-gray-400 opacity-60"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Spanish</p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentWord = shuffledWords[currentWordIndex];
  const progress = ((wordsLearned) / shuffledWords.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            VOKA
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHasSelectedLanguage(false)}
              className="flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              Change Language
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </Button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-md mx-auto w-full p-4">
        <ProgressBar progress={progress} wordsLearned={wordsLearned} totalWords={shuffledWords.length} />
      </div>

      {/* Main Learning Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <WordCard 
            word={currentWord}
            onNext={handleNextWord}
            onSpeak={speakWord}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

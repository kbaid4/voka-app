
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  wordsLearned: number;
  totalWords: number;
}

const ProgressBar = ({ progress, wordsLearned, totalWords }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Progress</span>
        <span>{wordsLearned} / {totalWords} words</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-gray-200"
      />
      <div className="text-center text-xs text-gray-500">
        {Math.round(progress)}% complete
      </div>
    </div>
  );
};

export default ProgressBar;

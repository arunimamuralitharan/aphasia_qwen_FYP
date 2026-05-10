import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Progress } from './ui/Progress';
import { Brain, Activity, FileSearch, CheckCircle2 } from 'lucide-react';

interface ProcessingProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, text: "Extracting acoustic features...", icon: Activity },
  { id: 2, text: "Running classification model...", icon: Brain },
  { id: 3, text: "Generating explainability insights...", icon: FileSearch },
  { id: 4, text: "Finalizing report...", icon: CheckCircle2 },
];

export function Processing({ onComplete }: ProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 6000; // 6 seconds mock processing
    const intervalTime = 50;
    const stepsCount = steps.length;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);

      const stepIndex = Math.min(
        Math.floor((elapsed / totalDuration) * stepsCount),
        stepsCount - 1
      );
      setCurrentStep(stepIndex);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center space-y-8"
      >
        <div className="relative w-24 h-24 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-primary opacity-50"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-accent opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return index === currentStep ? (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight text-foreground">
            Analyzing Speech
          </h2>
          <div className="h-6 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-muted-foreground absolute w-full"
              >
                {steps[currentStep].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right font-mono">
            {Math.round(progress)}%
          </p>
        </div>
      </motion.div>
    </div>
  );
}

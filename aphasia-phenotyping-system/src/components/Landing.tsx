import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { BrainCircuit, ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  // Memoize random values for the audio visualizer to prevent jitter on re-renders
  const bars = useMemo(() => 
    [...Array(40)].map(() => ({
      min: Math.random() * 20 + 5,
      max: Math.random() * 50 + 30,
      dur: Math.random() * 2 + 2,
      del: Math.random() * 2
    }))
  , []);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-background">


      {/* Pulsing Audio Rings */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/30 dark:border-primary/20"
            initial={{ width: "10vw", height: "10vw", opacity: 0.8 }}
            animate={{ width: "150vw", height: "150vw", opacity: 0 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3,
            }}
          />
        ))}
      </div>

      {/* Abstract Audio Visualizer (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] flex items-end justify-center gap-1 sm:gap-2 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_top,white,transparent)] z-0">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-2 sm:w-3 md:w-5 bg-primary rounded-t-full"
            animate={{
              height: [`${bar.min}%`, `${bar.max}%`, `${bar.min}%`]
            }}
            transition={{
              duration: bar.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.del
            }}
          />
        ))}
      </div>



      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10 text-center w-full">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm mb-6 md:mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            AI-Powered Analysis
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 leading-tight md:leading-snug max-w-4xl mx-auto px-2 md:px-6 text-balance break-words"
          >
            AI-Powered Aphasia Phenotyping
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6 px-4"
          >
            Upload speech audio. Get a precise diagnosis. Understand the underlying acoustic and linguistic features.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="pt-10 md:pt-12"
          >
            <Button 
              size="lg" 
              onClick={onStart} 
              className="rounded-full px-8 h-14 text-base gap-2 shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-105"
            >
              Upload Audio <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Progress } from './ui/Progress';
import { FileText, BrainCircuit, Activity, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react';

interface ResultsProps {
  onRestart: () => void;
  onViewReport: (id: string) => void;
}

export function Results({ onRestart, onViewReport }: ResultsProps) {
  const diagnosis = "Broca's Aphasia";
  const confidence = 92.4;
  const reportId = "AP-2026-0325";

  const features = [
    { name: "Speech Pauses", weight: 85, description: "Increased frequency and duration of pauses between words." },
    { name: "Word Repetition", weight: 60, description: "Occasional repetition of syllables or short words." },
    { name: "Fluency Score", weight: 90, description: "Significantly reduced speech rate and effortful articulation." },
    { name: "Syntactic Complexity", weight: 75, description: "Simplified sentence structures, agrammatism." },
  ];

  return (
    <div className="flex-1 bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Analysis Results</h1>
            <p className="text-muted-foreground mt-1">Session ID: #{reportId} &bull; Date: Mar 25, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" /> New Analysis
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Diagnosis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="glass h-full border-primary/20 shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Prediction</span>
                </div>
                <CardTitle className="text-4xl font-bold text-foreground">{diagnosis}</CardTitle>
                <CardDescription className="text-base mt-2">
                  Non-fluent aphasia characterized by partial loss of the ability to produce language.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Confidence Score</span>
                    <span className="font-mono text-foreground">{confidence}%</span>
                  </div>
                  <Progress value={confidence} className="h-2 bg-secondary" />
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      The model detected significant effortful speech and agrammatism, strongly correlating with patterns typical of Broca's aphasia.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Explainability Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Feature Importance</CardTitle>
                <CardDescription>Key acoustic and linguistic features contributing to the diagnosis.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{feature.name}</h4>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{feature.weight}% impact</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${feature.weight}%` }}
                          transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                          className="h-full bg-primary/80 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline / Audio Insights (Mock) */}
            <Card className="glass border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-medium">Audio Analysis Timeline</CardTitle>
                    <CardDescription>Highlighted segments showing critical speech patterns.</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Activity className="w-4 h-4 mr-2" /> View Waveform
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-24 bg-secondary/30 rounded-lg border border-border overflow-hidden flex items-center px-4">
                  {/* Mock Waveform */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-30">
                    {[40, 60, 30, 80, 50, 90, 45, 70, 20, 85, 65, 35, 75, 55, 95, 25, 60, 40, 80, 50, 70, 30, 90, 45, 85, 65, 20, 75, 55, 95, 35, 60, 40, 80, 50, 70, 30, 90, 45, 85].map((height, i) => (
                      <div key={i} className="w-1 bg-foreground rounded-full" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  
                  {/* Highlighted Segments */}
                  <div className="absolute left-[15%] w-[10%] h-full bg-destructive/20 border-x border-destructive/50 group cursor-pointer transition-colors hover:bg-destructive/30">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-md">
                      Long Pause (2.4s)
                    </div>
                  </div>
                  
                  <div className="absolute left-[45%] w-[15%] h-full bg-accent/20 border-x border-accent/50 group cursor-pointer transition-colors hover:bg-accent/30">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-md">
                      Agrammatic Phrasing
                    </div>
                  </div>

                  <div className="absolute left-[75%] w-[8%] h-full bg-destructive/20 border-x border-destructive/50 group cursor-pointer transition-colors hover:bg-destructive/30">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-md">
                      Phonemic Paraphasia
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
                  <span>0:00</span>
                  <span>0:15</span>
                  <span>0:30</span>
                  <span>0:45</span>
                  <span>1:00</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Summary Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-border">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> Detailed Insights
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The analyzed speech sample exhibits hallmark features of non-fluent aphasia. The user demonstrates significantly reduced speech rate, marked by frequent and prolonged pauses. Articulation appears effortful, and syntactic structures are simplified, consistent with agrammatism. Comprehension indicators appear relatively preserved compared to expressive deficits. These acoustic and linguistic markers strongly align with a diagnosis of Broca's Aphasia.
                </p>
              </div>
              <Button 
                variant="secondary" 
                className="shrink-0 group"
                onClick={() => onViewReport(reportId)}
              >
                See Full Report <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

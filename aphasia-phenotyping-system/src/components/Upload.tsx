import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { UploadCloud, FileAudio, X, Activity } from 'lucide-react';

interface UploadProps {
  onAnalyze: (file: File) => void;
  onBack: () => void;
}

export function Upload({ onAnalyze, onBack }: UploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.includes('audio')) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
          &larr; Back
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass border-white/10 shadow-2xl bg-card/40">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-medium tracking-tight">Upload Speech Audio</CardTitle>
            <CardDescription className="text-base mt-2">
              Supported formats: WAV, MP3. Maximum duration: 10 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ease-in-out ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-white/[0.02]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="audio/wav, audio/mp3, audio/mpeg"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-1">
                  Drag and drop your audio file here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your computer
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/50 rounded-xl p-6 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileAudio className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile} className="text-muted-foreground hover:text-destructive">
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            )}

            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                disabled={!file}
                onClick={() => file && onAnalyze(file)}
                className="w-full sm:w-auto"
              >
                Analyze Speech
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

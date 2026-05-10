import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { Upload } from './components/Upload';
import { Processing } from './components/Processing';
import { Results } from './components/Results';
import { Report } from './components/Report';

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Landing onStart={() => navigate('/upload')} />} />
          <Route path="/upload" element={<Upload onAnalyze={() => navigate('/processing')} onBack={() => navigate('/')} />} />
          <Route path="/processing" element={<Processing onComplete={() => navigate('/results')} />} />
          <Route path="/results" element={<Results onRestart={() => navigate('/')} onViewReport={(id) => navigate(`/report/${id}`)} />} />
          <Route path="/report/:id" element={<Report onBack={() => navigate('/results')} />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}


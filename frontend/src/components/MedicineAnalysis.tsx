import { useState } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2, Languages,
  Activity,
  Facebook,
  Twitter,
  Instagram,
  Linkedin} from 'lucide-react';
import { Button } from './ui/button';
import { FileUpload } from './FileUpload';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface MedicineAnalysisProps {
  onBack: () => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function MedicineAnalysis({ onBack }: MedicineAnalysisProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [file, setFile] = useState<File | null>(null);
  const [medicineName, setMedicineName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);


const handleAnalyze = async () => {
  if (!file && !medicineName.trim()) return;

  setIsAnalyzing(true);

  try {
    const formData = new FormData();
    if (medicineName.trim()) formData.append("medicineName", medicineName);
    if (selectedLanguage) formData.append("language", selectedLanguage);
    if (file) formData.append("image", file);

    

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/medicine/decode`, {
     method: "POST",
     body: formData,
     headers: {
     Authorization: `Bearer ${token}`,
  },
});


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${errorText}`);
    }

    const data = await response.json();

    
    setResults({
      medicineName: data.medicineName || "Unknown Medicine",
      genericName: data.genericName || "N/A",
      category: data.category || "N/A",
      manufacturer: data.manufacturer || "N/A",
      uses: data.uses ? data.uses.split(",") : [],
      dosage: data.dosage || "Not available",
      sideEffects: data.sideEffects ? data.sideEffects.split(",") : [],
      precautions: data.precautions ? data.precautions.split(",") : [],
      interactions: data.interactions ? data.interactions.split(",") : [],
      storage: data.storage || "Not available",
      confidenceScore: data.confidenceScore ? Number(data.confidenceScore) : 90,
    });
  } catch (error) {
    console.error("Error analyzing medicine:", error);
    alert("Failed to analyze medicine. Please try again.");
  } finally {
    setIsAnalyzing(false);
  }
};




  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1675851143055-23ae996bb212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGlsbHMlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjA1NDg0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/70 via-green-600/70 to-teal-700/70 dark:from-emerald-900/85 dark:via-green-900/85 dark:to-teal-900/85" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-2xl">Medicine Analysis</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-300" />
              <h2 className="text-white text-xl">Upload Medicine Image</h2>
            </div>

            {/* Medicine Name Input */}
            <div className="mb-6">
              <Label htmlFor="medicine-name" className="text-white/90 mb-2 block">
                Medicine Name (Optional)
              </Label>
              <Input
                id="medicine-name"
                type="text"
                placeholder="Enter medicine name if known"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 backdrop-blur-md"
              />
            </div>

            {/* Language Selector */}
            <div className="mb-6">
              <Label htmlFor="language" className="text-white/90 mb-2 block flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Preferred Language
              </Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-md">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 max-h-60">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hindi">Hindi (हिन्दी)</SelectItem>
                  <SelectItem value="es">Spanish (Español)</SelectItem>
                  <SelectItem value="fr">French (Français)</SelectItem>
                  <SelectItem value="de">German (Deutsch)</SelectItem>
                  <SelectItem value="it">Italian (Italiano)</SelectItem>
                  <SelectItem value="pt">Portuguese (Português)</SelectItem>
                  <SelectItem value="ru">Russian (Русский)</SelectItem>
                  <SelectItem value="zh">Chinese (中文)</SelectItem>
                  <SelectItem value="ja">Japanese (日本語)</SelectItem>
                  <SelectItem value="ko">Korean (한국어)</SelectItem>
                  <SelectItem value="ar">Arabic (العربية)</SelectItem>
                  <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                  <SelectItem value="ur">Urdu (اردو)</SelectItem>
                  <SelectItem value="ta">Tamil (தமிழ்)</SelectItem>
                  <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                  <SelectItem value="mr">Marathi (मराठी)</SelectItem>
                  <SelectItem value="gu">Gujarati (ગુજરાતી)</SelectItem>
                  <SelectItem value="kn">Kannada (ಕನ್ನಡ)</SelectItem>
                  <SelectItem value="ml">Malayalam (മലയാളം)</SelectItem>
                  <SelectItem value="pa">Punjabi (ਪੰਜਾਬੀ)</SelectItem>
                  <SelectItem value="tr">Turkish (Türkçe)</SelectItem>
                  <SelectItem value="nl">Dutch (Nederlands)</SelectItem>
                  <SelectItem value="pl">Polish (Polski)</SelectItem>
                  <SelectItem value="vi">Vietnamese (Tiếng Việt)</SelectItem>
                  <SelectItem value="th">Thai (ไทย)</SelectItem>
                  <SelectItem value="id">Indonesian (Bahasa Indonesia)</SelectItem>
                  <SelectItem value="ms">Malay (Bahasa Melayu)</SelectItem>
                  <SelectItem value="fa">Persian (فارسی)</SelectItem>
                  <SelectItem value="he">Hebrew (עברית)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <FileUpload onFileSelect={setFile} />
            
            <div className="mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={(!file && !medicineName.trim()) || isAnalyzing}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Medicine
                  </>
                )}
              </Button>
              {!file && !medicineName.trim() && (
                <p className="text-white/60 text-sm mt-2 text-center">
                  Upload an image or enter medicine name to analyze
                </p>
              )}
            </div>
          </Card>

          {/* Results Section */}
          {results && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Confidence Score */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <span className="text-white">Analysis Complete</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {results.confidenceScore}% Confidence
                  </Badge>
                </div>
              </Card>

              {/* Medicine Info */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-2xl mb-2">{results.medicineName}</h3>
                <p className="text-white/70 mb-4">Generic: {results.genericName}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    {results.category}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {results.manufacturer}
                  </Badge>
                </div>
              </Card>

              {/* Uses */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">Uses</h3>
                <ul className="space-y-2">
                  {results.uses.map((use: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Dosage */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-2">Recommended Dosage</h3>
                <p className="text-white/80">{results.dosage}</p>
              </Card>

              {/* Side Effects */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-white text-xl">Possible Side Effects</h3>
                </div>
                <ul className="space-y-2">
                  {results.sideEffects.map((effect: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Precautions */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">Precautions</h3>
                <ul className="space-y-2">
                  {results.precautions.map((precaution: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Drug Interactions */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">Drug Interactions</h3>
                <ul className="space-y-2">
                  {results.interactions.map((interaction: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>{interaction}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Storage */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-2">Storage Instructions</h3>
                <p className="text-white/80">{results.storage}</p>
              </Card>
            </div>
          )}
        </div>
      </div>
       {/* Footer - Updated to Force Left/Right Alignment */}
      <footer className="relative z-10 backdrop-blur-xl bg-black/40 border-t border-white/10 text-white py-12 mt-auto">
        <div className="container mx-auto px-6">
          
          {/* Changed 'flex-col md:flex-row' to 'flex-row' to force horizontal layout */}
          {/* Added 'flex-wrap' so it doesn't break on extremely small phones */}
          <div className="w-full flex flex-row flex-wrap justify-between items-start gap-6 mb-8">
            
            {/* Left Side: Brand & Description */}
            {/* Removed 'items-center text-center' to force left alignment */}
            <div className="flex flex-col items-start text-left max-w-md">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Medilytics</span>
              </div>
              <p className="text-white/60 text-sm">
                Advanced AI-powered medical report analysis. 
                Providing insights on test parameters and health trends instantly.
              </p>
            </div>

            {/* Right Side: Social Media Icons */}
            {/* Removed 'items-center' and 'md:' prefixes to force right alignment */}
            <div className="flex flex-col items-end">
              <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider text-mid">Connect With Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-600 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-600 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-600 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-600 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2025 Medilytics. All rights reserved. reliable medical analysis powered by AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

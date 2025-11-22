import { useState } from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, TrendingUp, TrendingDown, Minus, AlertTriangle, Languages,
  Activity,
  Facebook,
  Twitter,
  Instagram,
  Linkedin} from 'lucide-react';
import { Button } from './ui/button';
import { FileUpload } from './FileUpload';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ReportAnalysisProps {
  onBack: () => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function ReportAnalysis({ onBack }: ReportAnalysisProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [file, setFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  

const handleAnalyze = async () => {
  if (!file) return;
  setIsAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", "deepanshu"); // You can later replace with logged-in user
    if (selectedLanguage) formData.append("language", selectedLanguage);

    // Detect if the file is an image or PDF
    const isImage = file.type.startsWith("image/");
    // const endpoint = isImage
    //   ? "http://localhost:8080/api/report/image-analyze"
    //   : "http://localhost:8080/api/report/analyze";
    const endpoint = isImage
      ? `${BASE_URL}/api/report/image-analyze`
      : `${BASE_URL}/api/report/analyze`;

    // ✅ Get the JWT token from localStorage (after login)
    const token = localStorage.getItem("token");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Required for protected endpoints
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access denied: Unauthorized or missing token");
      }
      throw new Error("Failed to analyze report");
    }

    // Read backend response
    const data = await response.json();

    setResults({
      reportType: file.name.endsWith(".pdf")
        ? "PDF Medical Report"
        : "Image Medical Report",
      patientInfo: {
        name: data.name || "Unknown",
        age: data.age || "—",
        gender: data.gender || "—",
        date: new Date().toLocaleDateString(),
      },
      parameters: data.testparameters || [],
      summary: data.summaryText,
      recommendations: data.recommendations || [
        "Consult your healthcare provider for confirmation.",
        "Maintain healthy diet and hydration.",
        "Monitor for any symptoms or changes.",
      ],
      alerts: data.alerts || [],
    });
  } catch (error: any) {
    console.error("Error analyzing report:", error);
    alert(`❌ ${error.message}`);
  } finally {
    setIsAnalyzing(false);
  }
};


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-400';
      case 'low':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'low':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMHRlc3RzfGVufDF8fHx8MTc2MDQxNjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 via-red-500/60 to-rose-600/60 dark:from-orange-900/80 dark:via-red-900/80 dark:to-rose-900/80" />
        <div className="absolute inset-0 backdrop-blur-md" />
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
          <h1 className="text-white text-2xl">Report Analysis</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-orange-300" />
              <h2 className="text-white text-xl">Upload Medical Report</h2>
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
            
            <FileUpload onFileSelect={setFile} acceptedTypes="image/*,.pdf" />
            
            <div className="mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Report
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          {results && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Alerts */}
              {results.alerts.length > 0 && (
                <Card className="backdrop-blur-xl bg-red-500/10 dark:bg-red-900/20 border-red-500/30 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white mb-2">Alerts</h3>
                      <ul className="space-y-1">
                        {results.alerts.map((alert: string, index: number) => (
                          <li key={index} className="text-red-200 text-sm">
                            {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {/* Report Info */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-2xl mb-4">{results.reportType}</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <p className="text-white/60 text-sm">Patient Name</p>
                    <p>{results.patientInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Date</p>
                    <p>{results.patientInfo.date}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Age</p>
                    <p>{results.patientInfo.age} years</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Gender</p>
                    <p>{results.patientInfo.gender}</p>
                  </div>
                </div>
              </Card>

              {/* Parameters */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-6">Test Parameters</h3>
                <div className="space-y-4">
                  {results.parameters.map((param: any, index: number) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white mb-1">{param.name}</h4>
                          <p className="text-white/60 text-sm">
                            Normal Range: {param.normalRange} {param.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusBadge(param.status)}>
                            {param.status.toUpperCase()}
                          </Badge>
                          <span className={getStatusColor(param.status)}>
                            {getTrendIcon(param.trend)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl ${getStatusColor(param.status)}`}>
                          {param.value}
                        </span>
                        <span className="text-white/60">{param.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Summary */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">AI Analysis Summary</h3>
                <p className="text-white/80 leading-relaxed">{results.summary}</p>
              </Card>

              {/* Recommendations */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-300 text-sm">{index + 1}</span>
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Disclaimer */}
              <Card className="backdrop-blur-xl bg-yellow-500/10 dark:bg-yellow-900/20 border-yellow-500/30 p-4">
                <p className="text-yellow-200 text-sm text-center">
                  ⚠️ This is an AI-generated analysis. Please consult with a qualified healthcare professional for proper diagnosis and treatment.
                </p>
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
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

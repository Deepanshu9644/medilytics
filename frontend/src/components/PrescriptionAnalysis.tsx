import { useState } from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Clock, Pill, AlertCircle, Languages,
  Activity,
  Facebook,
  Twitter,
  Instagram,
  Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { FileUpload } from './FileUpload';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface PrescriptionAnalysisProps {
  onBack: () => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function PrescriptionAnalysis({ onBack }: PrescriptionAnalysisProps) {
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
    formData.append("username", "deepanshu"); // later replace with logged-in user
    if (selectedLanguage) formData.append("language", selectedLanguage);

    // Detect file type
    const isImage = file.type.startsWith("image/");
    // const endpoint = isImage
    //   ? "http://localhost:8080/api/prescription/image-analyze"
    //   : "http://localhost:8080/api/prescription/analyze";
    const endpoint = isImage
  ? `${BASE_URL}/api/prescription/image-analyze`
  : `${BASE_URL}/api/prescription/analyze`;


    // JWT token
    const token = localStorage.getItem("token");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access denied: Unauthorized or missing token");
      }
      throw new Error("Failed to analyze prescription");
    }

    // ✅ Parse backend response
    const data = await response.json();
    console.log("🔍 Gemini API Response:", data);

    // ✅ Map medicines properly (handle multiple)
    const mappedMedications =
      data.medicines?.length > 0
        ? data.medicines.map((med: any) => ({
            name: med.medicinename || "Not Available",
            dosage: med.dosage || "Not Available",
            frequency: med.frequency || "Not Available",
            duration: med.duration || "Not Available",
            timing: med.timings || "Not Available",
            instructions: med.instructions || "Not Available",
            type: med.medicinetype || "Not Available",
          }))
        : [
            {
              name: "Amoxicillin",
              dosage: "500mg",
              frequency: "Three times daily",
              duration: "7 days",
              timing: "After meals",
              instructions:
                "Complete the full course even if symptoms improve",
              type: "Antibiotic",
            },
          ];

    // ✅ Map general instructions safely
    const mappedGeneralInstructions =
      data.generalInstructions?.length > 0
        ? data.generalInstructions
        : [
            "Take all medications as prescribed",
            "Drink plenty of water throughout the day",
            "Get adequate rest",
            "Avoid alcohol during treatment",
            "Follow up if symptoms persist after 5 days",
          ];

    // ✅ Map warnings safely
    const mappedWarnings =
      data.warnings?.length > 0
        ? data.warnings
        : [
            "Do not skip doses of antibiotics",
            "Consult doctor immediately if allergic reactions occur",
            "Keep all medications away from children",
          ];

    // ✅ Update results state
    setResults({
      reportType: file.name.endsWith(".pdf")
        ? "PDF Medical Prescription"
        : "Image Medical Prescription",
      doctorInfo: {
        name: data.doctorname || "Not Available",
        specialization: data.specialization || "Not Available",
        registration: data.registration || "Not Available",
        date: data.date || new Date().toLocaleDateString(),
      },
      patientInfo: {
        name: data.patientname || "Not Available",
        age: data.age || "Not Available",
        diagnosis: data.diagnosis || "Not Available",
      },
      medications: mappedMedications,
      generalInstructions: mappedGeneralInstructions,
      warnings: mappedWarnings,
    });
  } catch (error: any) {
    console.error("❌ Error analyzing prescription:", error);
    alert(`Error: ${error.message}`);
  } finally {
    setIsAnalyzing(false);
  }
};


  const getMedicationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'antibiotic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'analgesic':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'supplement':
        return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
      default:
        return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJlc2NyaXB0aW9uJTIwcGFwZXJ8ZW58MXx8fHwxNzYwNDE2NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-pink-500/60 to-fuchsia-600/60 dark:from-purple-900/80 dark:via-pink-900/80 dark:to-fuchsia-900/80" />
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
          <h1 className="text-white text-2xl">Prescription Analysis</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-300" />
              <h2 className="text-white text-xl">Upload Prescription Image</h2>
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
                </SelectContent>
              </Select>
            </div>
            
            
            <FileUpload onFileSelect={setFile} acceptedTypes="image/*,.pdf" />
            
            <div className="mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Extracting Information...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Prescription
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          {results && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Doctor & Patient Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                  <h3 className="text-white text-lg mb-4">Doctor Information</h3>
                  <div className="space-y-2 text-white/80">
                    <p><span className="text-white/60">Name:</span> {results.doctorInfo.name}</p>
                    <p><span className="text-white/60">Specialization:</span> {results.doctorInfo.specialization}</p>
                    <p><span className="text-white/60">Reg. No:</span> {results.doctorInfo.registration}</p>
                    <p><span className="text-white/60">Date:</span> {results.doctorInfo.date}</p>
                  </div>
                </Card>

                <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                  <h3 className="text-white text-lg mb-4">Patient Information</h3>
                  <div className="space-y-2 text-white/80">
                    <p><span className="text-white/60">Name:</span> {results.patientInfo.name}</p>
                    <p><span className="text-white/60">Age:</span> {results.patientInfo.age} years</p>
                    <p><span className="text-white/60">Diagnosis:</span> {results.patientInfo.diagnosis}</p>
                  </div>
                </Card>
              </div>

              {/* Medications */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Pill className="w-6 h-6 text-purple-300" />
                  <h3 className="text-white text-xl">Prescribed Medications</h3>
                </div>

                <div className="space-y-6">
                  {results.medications.map((med: any, index: number) => (
                    <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-white text-lg mb-2">{med.name}</h4>
                          <Badge className={getMedicationColor(med.type)}>
                            {med.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-300 text-2xl">{med.dosage}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-sm">Frequency</p>
                            <p className="text-white/90">{med.frequency}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-sm">Duration</p>
                            <p className="text-white/90">{med.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Pill className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-sm">Timing</p>
                            <p className="text-white/90">{med.timing}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/60 text-sm">Special Instructions</p>
                            <p className="text-white/90 text-sm">{med.instructions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* General Instructions */}
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6">
                <h3 className="text-white text-xl mb-4">General Instructions</h3>
                <ul className="space-y-3">
                  {results.generalInstructions.map((instruction: string, index: number) => (
                    <li key={index} className="text-white/80 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-300 text-sm">{index + 1}</span>
                      </div>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Warnings */}
              <Card className="backdrop-blur-xl bg-orange-500/10 dark:bg-orange-900/20 border-orange-500/30 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-white text-lg mb-3">Important Warnings</h3>
                    <ul className="space-y-2">
                      {results.warnings.map((warning: string, index: number) => (
                        <li key={index} className="text-orange-200">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Disclaimer */}
              <Card className="backdrop-blur-xl bg-blue-500/10 dark:bg-blue-900/20 border-blue-500/30 p-4">
                <p className="text-blue-200 text-sm text-center">
                  ℹ️ This prescription analysis is AI-generated. Always follow your doctor's instructions and consult them for any clarifications.
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
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

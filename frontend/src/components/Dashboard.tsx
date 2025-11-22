import { 
  Pill, 
  FileText, 
  ClipboardList, 
  User, 
  LogOut, 
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Brain,
  Activity,
  BarChart3,
  FolderOpen
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


interface DashboardProps {
  user: { email: string; name: string };
  onNavigate: (page: 'medicine' | 'report' | 'prescription' | 'documents') => void;
  onLogout: () => void;
}

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
 /* const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);*/
   const [stats, setStats] = useState({
    totalAnalyses: 0,
    accuracyRate: "0%",
    avgAnalysisTime: "0s"
  });

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const statsRes = await axios.get(
        //   `http://localhost:8080/api/activity/stats?username=${user.email}`
        // );

        // const activityRes = await axios.get(
        //   `http://localhost:8080/api/activity/recent?username=${user.email}`
        // );

       const statsRes = await axios.get(
  `${BASE_URL}/api/activity/stats?username=${user.email}`
);

const activityRes = await axios.get(
  `${BASE_URL}/api/activity/recent?username=${user.email}`
);
        

        setStats(statsRes.data);
        setActivity(activityRes.data);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ KEEP THE REST OF YOUR CODE BELOW
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-black/90 border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-gray-900 dark:text-white">Medilytics</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer ring-2 ring-gray-200 dark:ring-white/20 hover:ring-blue-500 dark:hover:ring-blue-400 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-gray-200 dark:border-white/20"
              >
                <div className="px-2 py-2">
                  <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => onNavigate('documents')}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Documents
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 dark:text-red-400"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section with Background */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYwNDE3NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-cyan-500/95 to-blue-700/95 dark:from-blue-900/95 dark:via-cyan-900/95 dark:to-blue-900/95" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Analytics Dashboard
              </Badge>
              <h1 className="text-5xl text-white mb-4">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Your intelligent medical analytics platform is ready. Start analyzing medicines, reports, or prescriptions with advanced AI.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6 text-center">
                <div className="text-3xl text-white mb-2">{stats.totalAnalyses}</div>
                <p className="text-blue-100 text-sm">Analyses Done</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6 text-center">
                <div className="text-3xl text-white mb-2">98%</div>
                <p className="text-blue-100 text-sm">Accuracy Rate</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6 text-center">
                <div className="text-3xl text-white mb-2">3.2s</div>
                <p className="text-blue-100 text-sm">Avg. Analysis Time
</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-white/20 p-6 text-center">
                <div className="text-3xl text-white mb-2">24/7</div>
                <p className="text-blue-100 text-sm">Available</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Analysis Services */}
        <section className="py-16 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 dark:text-white mb-4">
              Choose Your Analysis Type
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select a service below to start analyzing your medical data with AI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Medicine Analysis Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              onClick={() => onNavigate('medicine')}>
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljaW5lJTIwY29sb3JmdWx8ZW58MXx8fHwxNzYwNDE3NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medicine Analysis"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Pill className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl text-white mb-2">
                    Medicine Analysis
                  </h3>
                  <Badge className="bg-emerald-500/80 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Upload medicine images and get comprehensive AI-powered analysis including identification, usage guidelines, side effects, and precautions.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Medicine identification & details</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dosage & usage instructions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Side effects & precautions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Drug interactions analysis</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onNavigate('medicine')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white group-hover:shadow-lg transition-all"
                >
                  Start Medicine Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Report Analysis Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              onClick={() => onNavigate('report')}>
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-500 to-red-600">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691462814-485c3672e447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVwb3J0JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYwNDE3NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Report Analysis"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl text-white mb-2">
                    Report Analysis
                  </h3>
                  <Badge className="bg-orange-500/80 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Smart Insights
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Upload medical reports and receive detailed AI analysis with parameter insights, trend detection, and personalized health recommendations.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Test parameter analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Normal range comparison</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Health trend detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">AI-powered recommendations</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onNavigate('report')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white group-hover:shadow-lg transition-all"
                >
                  Start Report Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Prescription Analysis Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              onClick={() => onNavigate('prescription')}>
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1550572017-54b7f54d1f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBwYXBlciUyMG1lZGljaW5lfGVufDF8fHx8MTc2MDQxNzU0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Prescription Analysis"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl text-white mb-2">
                    Prescription Analysis
                  </h3>
                  <Badge className="bg-purple-500/80 text-white border-0">
                    <Brain className="w-3 h-3 mr-1" />
                    OCR Enabled
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Upload prescription images to extract and analyze medicine details, dosages, frequency, and timing instructions automatically.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Text extraction (OCR)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Medicine & dosage details</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Timing & frequency tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Doctor & patient info extraction</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onNavigate('prescription')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white group-hover:shadow-lg transition-all"
                >
                  Start Prescription Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Highlight Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-gray-900 dark:text-white mb-4">
                Why Choose Medilytics?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Advanced AI technology for accurate medical analytics
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">AI-Powered</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Advanced machine learning for accurate analysis
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get results in seconds, not hours
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your data is encrypted and protected
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">Detailed Insights</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive reports with actionable data
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Three simple steps to get your medical analysis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  1
                </div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Upload</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your analysis type and upload your medical document or image
                </p>
              </Card>

              <Card className="p-8 text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  2
                </div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Analyze</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI processes your data with advanced algorithms in seconds
                </p>
              </Card>

              <Card className="p-8 text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  3
                </div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-3">Get Results</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Review comprehensive insights and recommendations instantly
                </p>
              </Card>
            </div>
          </div>
        </section>

       
        <section className="py-16 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-gray-900 dark:text-white mb-8">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg text-gray-900 dark:text-white">Medicine Analysis</h3>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Analyzed Amoxicillin 500mg - Complete information retrieved
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg text-gray-900 dark:text-white">Blood Test Report</h3>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      CBC Report analyzed - 5 parameters checked
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>1 day ago</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg text-gray-900 dark:text-white">Prescription Analysis</h3>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      Extracted 3 medicines with dosage information
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
       {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">Medilytics</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered medical analytics platform for smarter healthcare decisions.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-blue-400">Features</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-blue-400">Services</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-400">How It Works</button></li>
                <li><button onClick={onGetStarted} className="hover:text-blue-400">Get Started</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-blue-400 cursor-pointer">About Us</li>
                <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-blue-400">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Medilytics. All rights reserved. Built with AI for better healthcare.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

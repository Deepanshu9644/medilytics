import { useState } from 'react';
import { 
  Activity,
  Pill,
  FileText,
  ClipboardList,
  Sparkles,
  Shield,
  Zap,
  Brain,
  ChevronRight,
  Check,
  Menu,
  X,
  Star,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedilyticsLandingProps {
  onGetStarted: () => void;
}

export function MedilyticsLanding({ onGetStarted }: MedilyticsLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl text-white">Medilytics</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                How It Works
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-cyan-400 transition-colors">
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button 
                onClick={onGetStarted}
                className="hidden lg:flex bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-4 pb-2 border-t border-gray-800 mt-4">
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('home')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  Home
                </button>
                <button onClick={() => scrollToSection('features')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  Features
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  Services
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-gray-300 hover:text-cyan-400">
                  Contact
                </button>
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white mt-2"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-cyan-500 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Medical Analytics
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl text-white mb-6">
                Your Health Analytics<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Powered by AI.
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform the way you analyze medical information with Medilytics. Get instant AI-powered insights for medicines, medical reports, and prescriptions.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8"
                  size="lg"
                >
                  Start Analyzing Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl text-cyan-400 mb-1">98%</div>
                  <p className="text-gray-400 text-sm">Accuracy Rate</p>
                </div>
                <div>
                  <div className="text-3xl text-cyan-400 mb-1">10K+</div>
                  <p className="text-gray-400 text-sm">Users</p>
                </div>
                <div>
                  <div className="text-3xl text-cyan-400 mb-1">50K+</div>
                  <p className="text-gray-400 text-sm">Analyses</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/30">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758202292826-c40e172eed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQUklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDQwNzQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical AI Technology"
                  className="w-full"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-gray-800 border border-cyan-500/30 p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">AI Powered</div>
                    <div className="text-white">Smart Analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">Why Choose Medilytics</Badge>
            <h2 className="text-4xl text-white mb-4">
              Powerful Features for Better Healthcare
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the future of medical analytics with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-gray-900 border-gray-700 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-400">
                Advanced machine learning algorithms provide accurate and instant medical insights.
              </p>
            </Card>

            <Card className="p-6 bg-gray-900 border-gray-700 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Instant Results</h3>
              <p className="text-gray-400">
                Get comprehensive analysis results in seconds, not hours or days.
              </p>
            </Card>

            <Card className="p-6 bg-gray-900 border-gray-700 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Secure & Private</h3>
              <p className="text-gray-400">
                Your medical data is encrypted and stored securely with enterprise-grade security.
              </p>
            </Card>

            <Card className="p-6 bg-gray-900 border-gray-700 hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3">Easy to Use</h3>
              <p className="text-gray-400">
                Simple drag-and-drop interface makes medical analysis accessible to everyone.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">Our Services</Badge>
            <h2 className="text-4xl text-white mb-4">
              Comprehensive Medical Analytics
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Three powerful tools to help you understand your medical information better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Medicine Analysis */}
            <Card className="overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all group bg-gray-800 border-gray-700">
              <div className="h-56 overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1644562209388-077ae6bf2a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGlkZW50aWZpY2F0aW9uJTIwYXBwfGVufDF8fHx8MTc2MDQxNzE0MXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Medicine Analysis"
                    className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Pill className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white mb-3">Medicine Analysis</h3>
                <p className="text-gray-400 mb-4">
                  Upload medicine images and get detailed information including uses, dosage, side effects, and precautions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Medicine identification
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Usage guidelines
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Side effects info
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    Drug interactions
                  </li>
                </ul>
                <Button 
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                >
                  Try Now
                </Button>
              </div>
            </Card>

            {/* Report Analysis */}
            <Card className="overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all group bg-gray-800 border-gray-700">
              <div className="h-56 overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1691934286085-c88039d93dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVwb3J0JTIwc2Nhbm5pbmd8ZW58MXx8fHwxNzYwNDE3MTQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Report Analysis"
                    className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white mb-3">Report Analysis</h3>
                <p className="text-gray-400 mb-4">
                  Upload medical reports and receive comprehensive AI analysis with parameter insights and recommendations.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-orange-500" />
                    Parameter analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-orange-500" />
                    Trend detection
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-orange-500" />
                    Health insights
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-orange-500" />
                    AI recommendations
                  </li>
                </ul>
                <Button 
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Try Now
                </Button>
              </div>
            </Card>

            {/* Prescription Analysis */}
            <Card className="overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all group bg-gray-800 border-gray-700">
              <div className="h-56 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBkaWdpdGFsJTIwaGVhbHRofGVufDF8fHx8MTc2MDQxNzE0Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Prescription Analysis"
                    className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <ClipboardList className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white mb-3">Prescription Analysis</h3>
                <p className="text-gray-400 mb-4">
                  Extract and analyze prescription details including medicine names, dosages, and timing instructions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-500" />
                    Text extraction
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-500" />
                    Dosage details
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-500" />
                    Schedule tracking
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-500" />
                    Instructions summary
                  </li>
                </ul>
                <Button 
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Try Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">Simple Process</Badge>
            <h2 className="text-4xl text-white mb-4">
              How Medilytics Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps and receive instant medical insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl text-white">1</span>
                </div>
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
              <h3 className="text-xl text-white mb-3">Upload Your File</h3>
              <p className="text-gray-400">
                Simply drag and drop or browse to upload your medicine image, medical report, or prescription.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl text-white">2</span>
                </div>
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
              <h3 className="text-xl text-white mb-3">AI Analysis</h3>
              <p className="text-gray-400">
                Our advanced AI algorithms process and analyze your medical data in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl text-white mb-3">Get Results</h3>
              <p className="text-gray-400">
                Receive comprehensive analysis with actionable insights and recommendations instantly.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8"
              size="lg"
            >
              Start Your Free Analysis
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">Testimonials</Badge>
            <h2 className="text-4xl text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust Medilytics for their medical analytics needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Medilytics has been a game-changer for understanding my medical reports. The AI analysis is incredibly accurate and easy to understand."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  SJ
                </div>
                <div>
                  <div className="text-white">Sarah Johnson</div>
                  <div className="text-sm text-gray-400">Healthcare Professional</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The prescription analysis feature helps me keep track of my medications perfectly. Highly recommended for anyone managing multiple prescriptions!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white">
                  MC
                </div>
                <div>
                  <div className="text-white">Michael Chen</div>
                  <div className="text-sm text-gray-400">Patient</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-800 border-gray-700">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "As a doctor, I find Medilytics incredibly useful for quickly reviewing patient reports. The AI insights are spot-on and save me valuable time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                  ED
                </div>
                <div>
                  <div className="text-white">Dr. Emily Davis</div>
                  <div className="text-sm text-gray-400">Medical Practitioner</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl mb-6">
            Ready to Transform Your Medical Analytics?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Medilytics for accurate, instant medical insights powered by AI.
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8"
            size="lg"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">Contact Us</Badge>
            <h2 className="text-4xl text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions? We're here to help you make the most of Medilytics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center hover:shadow-xl hover:shadow-cyan-500/20 transition-shadow bg-gray-900 border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Email</h3>
              <p className="text-gray-400 mb-2">Send us a message</p>
              <a href="mailto:support@medilytics.ai" className="text-cyan-400 hover:text-cyan-300">
                support@medilytics.ai
              </a>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl hover:shadow-cyan-500/20 transition-shadow bg-gray-900 border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Phone</h3>
              <p className="text-gray-400 mb-2">Call us anytime</p>
              <a href="tel:+15551234567" className="text-cyan-400 hover:text-cyan-300">
                +1 (555) 123-4567
              </a>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl hover:shadow-cyan-500/20 transition-shadow bg-gray-900 border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Office</h3>
              <p className="text-gray-400 mb-2">Visit us at</p>
              <p className="text-cyan-400">
                Greater Noida, India
              </p>
            </Card>
          </div>
        </div>
      </section>

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

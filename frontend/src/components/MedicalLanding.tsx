import { useState } from 'react';
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Pill, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Award,
  Users,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MedicalLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    date: '',
    time: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment request submitted! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl text-gray-800">MediCare</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                About Us
              </button>
              <button onClick={() => scrollToSection('doctors')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                Our Doctors
              </button>
              <button onClick={() => scrollToSection('appointment')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                Appointment
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-cyan-500 transition-colors">
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button 
                onClick={() => scrollToSection('appointment')}
                className="hidden lg:flex bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
              >
                Book An Appointment
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-4 pb-2 border-t mt-4">
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('home')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  Services
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  About Us
                </button>
                <button onClick={() => scrollToSection('doctors')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  Our Doctors
                </button>
                <button onClick={() => scrollToSection('appointment')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  Appointment
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-gray-700 hover:text-cyan-500">
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('appointment')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white mt-2"
                >
                  Book An Appointment
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full" />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl mb-6">
                Your Healthy Is<br />
                <span className="text-cyan-100">Our Priority.</span>
              </h1>
              <p className="text-lg text-cyan-50 mb-8 leading-relaxed">
                We provide comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals dedicated to your wellbeing. Your health and comfort are our top priorities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => scrollToSection('appointment')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8"
                  size="lg"
                >
                  Book An Appointment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-cyan-600"
                  size="lg"
                >
                  Our Services
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3JzJTIwdGVhbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MDQxNzI3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical Team"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Social Media Icons */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 bg-pink-500 rounded-full p-3">
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5 text-pink-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5 text-pink-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-pink-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5 text-pink-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800 mb-2">Expert Doctors</h3>
                  <p className="text-gray-600 text-sm">
                    Our team consists of highly qualified and experienced medical professionals.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800 mb-2">24/7 Emergency</h3>
                  <p className="text-gray-600 text-sm">
                    Round-the-clock emergency services with immediate medical attention.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800 mb-2">Quality Care</h3>
                  <p className="text-gray-600 text-sm">
                    State-of-the-art facilities ensuring the highest quality of patient care.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-cyan-600 mb-2">500+</div>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-cyan-600 mb-2">10,000+</div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-cyan-600 mb-2">25+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-cyan-600 mb-2">50+</div>
              <p className="text-gray-600">Medical Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-600 hover:bg-cyan-100">Our Services</Badge>
            <h2 className="text-4xl text-gray-800 mb-4">
              Comprehensive Healthcare Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of medical services to meet all your healthcare needs under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cardiology */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwaGVhcnQlMjBoZWFsdGh8ZW58MXx8fHwxNzYwNDE3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cardiology"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">Cardiology</h3>
                <p className="text-gray-600 mb-4">
                  Advanced heart care with cutting-edge technology and experienced cardiologists.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Dental Care */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjYXJlJTIwY2xpbmljfGVufDF8fHx8MTc2MDQxNzI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dental Care"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">Dental Care</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive dental services from routine check-ups to cosmetic procedures.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Pediatrics */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBjaGlsZHJlbiUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzYwNDE3Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Pediatrics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">Pediatrics</h3>
                <p className="text-gray-600 mb-4">
                  Specialized care for children with a child-friendly environment and approach.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Surgery */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZXJ5JTIwb3BlcmF0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjA0MTcyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Surgery"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">Surgery</h3>
                <p className="text-gray-600 mb-4">
                  Modern surgical facilities with minimally invasive techniques and expert surgeons.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Laboratory */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwbWVkaWNhbCUyMHJlc2VhcmNofGVufDF8fHx8MTc2MDQxNzI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Laboratory"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">Laboratory</h3>
                <p className="text-gray-600 mb-4">
                  State-of-the-art diagnostic lab with accurate and quick test results.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* General Medicine */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9uJTIwZG9jdG9yJTIwcGF0aWVudHxlbnwxfHx8fDE3NjA0MTcyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="General Medicine"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-800 mb-3">General Medicine</h3>
                <p className="text-gray-600 mb-4">
                  Primary care and treatment for a wide range of medical conditions.
                </p>
                <button className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-cyan-100 text-cyan-600 hover:bg-cyan-100">About Us</Badge>
              <h2 className="text-4xl text-gray-800 mb-6">
                Leading Healthcare Provider Since 1999
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                MediCare has been at the forefront of healthcare excellence for over two decades. We are committed to providing world-class medical services with compassion and care.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team of highly qualified doctors, nurses, and support staff work tirelessly to ensure every patient receives personalized attention and the best possible treatment outcomes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">State-of-the-art medical equipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">Experienced healthcare professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">Patient-centered approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="text-gray-700">24/7 emergency services</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                Learn More About Us
              </Button>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc2MDQxNzI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="About MediCare"
                className="rounded-2xl shadow-xl"
              />
              
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-800">50+</div>
                    <p className="text-gray-600 text-sm">Medical Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-600 hover:bg-cyan-100">Our Team</Badge>
            <h2 className="text-4xl text-gray-800 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of dedicated healthcare professionals is here to provide you with the best medical care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <div className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RhZmYlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDE3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dr. Sarah Johnson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-gray-800 mb-1">Dr. Sarah Johnson</h3>
                <p className="text-cyan-600 mb-4">Cardiologist</p>
                <p className="text-gray-600 text-sm mb-4">
                  15 years of experience in cardiovascular medicine
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <div className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwc3RhZmYlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDE3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dr. Michael Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-gray-800 mb-1">Dr. Michael Chen</h3>
                <p className="text-cyan-600 mb-4">Pediatrician</p>
                <p className="text-gray-600 text-sm mb-4">
                  12 years specializing in child healthcare
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <div className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwc3RhZmYlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDE3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dr. Emily Davis"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-gray-800 mb-1">Dr. Emily Davis</h3>
                <p className="text-cyan-600 mb-4">Surgeon</p>
                <p className="text-gray-600 text-sm mb-4">
                  18 years of surgical excellence and innovation
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <div className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwc3RhZmYlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNDE3Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dr. James Wilson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-gray-800 mb-1">Dr. James Wilson</h3>
                <p className="text-cyan-600 mb-4">Dentist</p>
                <p className="text-gray-600 text-sm mb-4">
                  10 years creating beautiful, healthy smiles
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-20 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">
              Book An Appointment
            </h2>
            <p className="text-cyan-50 max-w-2xl mx-auto">
              Schedule your visit with our expert doctors. We're here to help you maintain your health.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number *</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-gray-700 mb-2">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange as any}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">Select Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dental">Dental Care</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="surgery">Surgery</option>
                    <option value="laboratory">Laboratory</option>
                    <option value="general">General Medicine</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">Preferred Date *</label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">Preferred Time *</label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Additional Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your symptoms or concerns..."
                  rows={4}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-6"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-600 hover:bg-cyan-100">Contact Us</Badge>
            <h2 className="text-4xl text-gray-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Contact us through any of the following methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">Call us anytime</p>
              <a href="tel:+15551234567" className="text-cyan-600 hover:text-cyan-700">
                +1 (555) 123-4567
              </a>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">Send us a message</p>
              <a href="mailto:info@medicare.com" className="text-cyan-600 hover:text-cyan-700">
                info@medicare.com
              </a>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 mb-2">Visit us at</p>
              <p className="text-cyan-600">
                123 Healthcare Ave,<br />
                Medical District, NY 10001
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
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-2xl">MediCare</span>
              </div>
              <p className="text-gray-400 text-sm">
                Providing quality healthcare services with compassion and excellence since 1999.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-cyan-400">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-400">About Us</button></li>
                <li><button onClick={() => scrollToSection('doctors')} className="hover:text-cyan-400">Our Doctors</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer">Cardiology</li>
                <li className="hover:text-cyan-400 cursor-pointer">Dental Care</li>
                <li className="hover:text-cyan-400 cursor-pointer">Pediatrics</li>
                <li className="hover:text-cyan-400 cursor-pointer">Surgery</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Working Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                <li>Saturday: 9:00 AM - 5:00 PM</li>
                <li>Sunday: 10:00 AM - 4:00 PM</li>
                <li className="text-cyan-400">Emergency: 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 MediCare. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

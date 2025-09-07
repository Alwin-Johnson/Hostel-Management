
import { Button } from "../../components/admin/button";
import { Card, CardContent } from "../../components/admin/card";
import { Badge } from "../../components/landing/badge";

import { Bell, Mail, Phone, MapPin, Users, Shield, ArrowRight} from 'lucide-react';
import { ImageWithFallback } from '../../assests/ImageWithFallback';
import exampleImage from '../../assests/img1.png';


interface LandingPageProps {
  onPageChange: (target: 'admin' | 'student') => void;
}

export function LandingPage({ onPageChange }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg text-gray-800 px-6 py-4 shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">Campus Hostel</h1>
              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50 font-medium">Gallery</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50 font-medium">Contact</a>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">3 New</Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background with cityscape */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-indigo-700/85 to-purple-800/90 z-10"></div>
          <img 
            src={exampleImage} 
            alt="Modern cityscape" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px] z-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-30">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h2 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    "Your Home
                  </span>
                  <br />
                  on Campus"
                </h2>
                <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
                  Experience comfortable living with modern amenities, nutritious meals, 
                  and a supportive community environment for your academic journey.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="#gallery" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Right content - Portal Cards */}
<div className="space-y-6">
  <Card
    className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
    onClick={() => onPageChange('student')} // just call the callback
  >
    <CardContent className="p-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Student Portal</h3>
          <p className="text-blue-200">Dashboard & Services</p>
        </div>
      </div>
      <p className="text-blue-100 leading-relaxed mb-6">
        Access your dashboard, view attendance, manage payments, and connect with the hostel community
      </p>
      <Button
        variant="outline"
        className="border-white/30 text-white hover:bg-white/20 rounded-xl group-hover:scale-105 transition-all duration-300"
      >
        Get Started
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </CardContent>
  </Card>

  <Card
    className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
    onClick={() => onPageChange('admin')} // callback only
  >
    <CardContent className="p-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Admin Dashboard</h3>
          <p className="text-blue-200">Management Portal</p>
        </div>
      </div>
      <p className="text-blue-100 leading-relaxed mb-6">
        Comprehensive management tools for students, fees, mess operations, and hostel administration
      </p>
      <Button
        variant="outline"
        className="border-white/30 text-white hover:bg-white/20 rounded-xl group-hover:scale-105 transition-all duration-300"
      >
        Admin Access
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
</div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">Campus Gallery</h3>
            <p className="text-xl text-gray-600">Explore our modern facilities and vibrant campus life</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-6 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwaG9zdGVsfGVufDF8fHx8MTc1NzEzMTI5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Campus Building"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Modern Campus</h4>
              <p className="text-gray-600 leading-relaxed">State-of-the-art hostel facilities with contemporary architecture and sustainable design</p>
            </div>
            
            <div className="space-y-6 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjByb29tJTIwZG9ybWl0b3J5fGVufDF8fHx8MTc1NzEzMTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Hostel Room"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Comfortable Rooms</h4>
              <p className="text-gray-600 leading-relaxed">Well-furnished rooms with dedicated study areas, high-speed internet, and modern amenities</p>
            </div>
            
            <div className="space-y-6 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1708901141722-d5b0583407b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZGluaW5nJTIwaGFsbHxlbnwxfHx8fDE3NTcxMzEzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dining Hall"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Dining Hall</h4>
              <p className="text-gray-600 leading-relaxed">Spacious dining area serving nutritious vegetarian and non-vegetarian meals with hygiene standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Contact Information</h3>
            <p className="text-xl text-blue-100">Get in touch with us for any queries or assistance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold">Phone</h4>
              <div className="space-y-2">
                <p className="text-blue-100 text-lg">+91 98765 43210</p>
                <p className="text-blue-100 text-lg">+91 87654 32109</p>
              </div>
            </div>
            
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold">Email</h4>
              <div className="space-y-2">
                <p className="text-blue-100 text-lg">hostel@campus.edu</p>
                <p className="text-blue-100 text-lg">admin@campus.edu</p>
              </div>
            </div>
            
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold">Address</h4>
              <div className="space-y-2">
                <p className="text-blue-100 text-lg">Campus Hostel Block A</p>
                <p className="text-blue-100 text-lg">University Campus, City 123456</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Campus Hostel</h4>
                <p className="text-gray-500">Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-colors">Gallery</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-gray-600">&copy; 2024 Campus Hostel Management</p>
              <p className="text-gray-500 text-sm">Your comfort and safety is our priority</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare,
  User,
  Building,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  Headset,
  Globe,
  TrendingUp,
  ChevronRight,
  Eye,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ContactClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Office Address',
      details: ['123 Investment Plaza', 'Victoria Island', 'Lagos, Nigeria'],
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Phone Numbers',
      details: ['+234 800 123 4567', '+234 900 987 6543'],
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email Address',
      details: ['info@watergrove.com', 'support@watergrove.com'],
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Working Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
      color: 'from-rose-500/20 to-pink-500/20'
    }
  ];

  const contactCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'investment', label: 'Investment Information' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'other', label: 'Other' }
  ];

  const teamDepartments = [
    {
      department: 'Investment Advisory',
      contact: 'advisory@watergrove.com',
      phone: '+234 800 123 4001',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      department: 'Client Relations',
      contact: 'clients@watergrove.com',
      phone: '+234 800 123 4002',
      icon: <Users className="h-6 w-6" />,
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      department: 'Technical Support',
      contact: 'support@watergrove.com',
      phone: '+234 800 123 4003',
      icon: <Headset className="h-6 w-6" />,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      department: 'Compliance',
      contact: 'compliance@watergrove.com',
      phone: '+234 800 123 4004',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-rose-500/20 to-pink-500/20'
    }
  ];

  // Fixed floating particle positions (no random values)
  const fixedParticles = [
    { left: 10, top: 20, size: 8 },
    { left: 25, top: 60, size: 12 },
    { left: 40, top: 30, size: 10 },
    { left: 60, top: 70, size: 15 },
    { left: 75, top: 40, size: 9 },
    { left: 85, top: 25, size: 11 },
    { left: 15, top: 75, size: 14 },
    { left: 50, top: 15, size: 7 },
    { left: 35, top: 85, size: 13 },
    { left: 90, top: 55, size: 10 },
    { left: 20, top: 45, size: 12 },
    { left: 65, top: 90, size: 8 }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        category: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section - Same as homepage */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>
        
        {/* Floating particles - FIXED: Use static values */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden">
            {fixedParticles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-wg-accent/10 animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${10 + (i % 5) * 2}s`, // Fixed pattern, not random
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-wg-secondary/90 text-wg-primary hover:bg-wg-secondary/80 border-none animate-pulse animate-duration-2000">
              <MessageSquare className="mr-2 h-4 w-4" />
              GET IN TOUCH WITH US
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6 leading-tight">
              Connect With
              <span className="block text-wg-secondary mt-2">Water Grove</span>
            </h1>
            
            <p className="text-lg md:text-xl text-wg-neutral/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Have questions about investments, need support, or want to explore partnership opportunities? 
              Our team is ready to assist you on your investment journey with transparency and expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact-form">
                <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+2348001234567">
                <Button variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-wg-primary2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-xl group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-wg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-wg-primary">{info.icon}</div>
                    </div>
                    <h3 className="font-bold text-wg-primary mb-3 text-lg">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-wg-primary/70">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="bg-white border border-wg-primary/10 hover:shadow-xl transition-all duration-300" id="contact-form">
                <CardHeader>
                  <CardTitle className="text-2xl text-wg-primary">Send Us a Message</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary/10 to-wg-secondary/10 mb-6">
                        <CheckCircle className="h-8 w-8 text-wg-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold text-wg-primary mb-3">Message Sent Successfully!</h3>
                      <p className="text-wg-primary/70 mb-6">
                        Thank you for contacting Water Grove. Our team will respond to your inquiry within 24 hours.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral font-bold px-8 py-6 rounded-xl"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-wg-primary font-medium">
                            Full Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-wg-primary font-medium">
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-wg-primary font-medium">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+234 800 123 4567"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-wg-primary font-medium">
                            Company
                          </Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your company name"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-wg-primary font-medium">
                          Inquiry Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-wg-primary font-medium">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-wg-primary font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[150px] bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="rounded border-wg-primary/20 text-wg-primary focus:ring-wg-primary"
                          required
                        />
                        <Label htmlFor="privacy" className="text-sm text-wg-primary/70">
                          I agree to the privacy policy and terms of service
                        </Label>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Details & Departments */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 border border-wg-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">Quick Contact Options</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Prefer to reach out directly? Here are quick ways to connect
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                      <Phone className="h-5 w-5 text-wg-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Call Us Now</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Speak directly with our investment specialists
                      </p>
                      <a href="tel:+2348001234567" className="text-wg-primary font-medium hover:text-wg-accent transition-colors">
                        +234 800 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10">
                      <Mail className="h-5 w-5 text-wg-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Email Support</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Get detailed responses via email
                      </p>
                      <a href="mailto:support@watergrove.com" className="text-wg-primary font-medium hover:text-wg-accent transition-colors">
                        support@watergrove.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                      <Clock className="h-5 w-5 text-wg-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Live Chat</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Chat with our support team in real-time
                      </p>
                      <Button variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/10 mt-2 hover:border-wg-accent">
                        Start Live Chat
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Department Contacts */}
              <Card className="bg-white border border-wg-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">Department Contacts</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Reach out to specific teams for specialized assistance
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {teamDepartments.map((dept, index) => (
                      <div key={index} className="p-4 rounded-lg border border-wg-primary/10 hover:border-wg-accent/50 transition-colors group">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${dept.color}`}>
                              <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                                {dept.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-wg-primary">{dept.department}</h4>
                              <div className="space-y-1 mt-2">
                                <a href={`mailto:${dept.contact}`} className="text-sm text-wg-primary/70 hover:text-wg-accent block transition-colors">
                                  {dept.contact}
                                </a>
                                <a href={`tel:${dept.phone}`} className="text-sm text-wg-primary/70 hover:text-wg-accent block transition-colors">
                                  {dept.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
              Visit Our <span className="text-wg-secondary">Office</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
              Schedule an in-person consultation at our headquarters in Lagos
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-wg-primary/20 shadow-xl">
              <div className="h-[400px] bg-gradient-to-br from-wg-primary/10 to-wg-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-4">
                    <MapPin className="h-12 w-12 text-wg-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-wg-primary mb-2">Water Grove Headquarters</h3>
                  <p className="text-wg-primary/70">123 Investment Plaza, Victoria Island, Lagos</p>
                  <Button className="mt-6 bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Globe className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Location Details */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Parking Information</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-wg-secondary mt-0.5 flex-shrink-0" />
                      <span>Dedicated visitor parking available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-wg-secondary mt-0.5 flex-shrink-0" />
                      <span>Underground parking with security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-wg-secondary mt-0.5 flex-shrink-0" />
                      <span>Free parking for scheduled meetings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Security Protocol</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-wg-accent mt-0.5 flex-shrink-0" />
                      <span>Photo ID required for entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-wg-accent mt-0.5 flex-shrink-0" />
                      <span>Pre-registration recommended</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-wg-accent mt-0.5 flex-shrink-0" />
                      <span>Security screening at entrance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Best Time to Visit</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-wg-primary mt-0.5 flex-shrink-0" />
                      <span>Weekdays: 9 AM - 5 PM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-wg-primary mt-0.5 flex-shrink-0" />
                      <span>Schedule appointments in advance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-wg-primary mt-0.5 flex-shrink-0" />
                      <span>Allow 30 minutes before meeting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Same as homepage */}
      <section className="py-20 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-wg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-neutral mb-6">
              Ready to <span className="text-wg-secondary">Connect</span> With Us?
            </h2>
            
            <div className="bg-wg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-wg-accent/20 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 mb-8 leading-relaxed">
                Whether you're ready to start investing or have questions about our platform, 
                our team is here to help you every step of the way with transparency and expertise.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Target className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">Clear Communication</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-accent/20">
                    <Clock className="h-5 w-5 text-wg-accent" />
                  </div>
                  <span className="text-wg-neutral font-medium">24/7 Response</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Eye className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">Transparent Support</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Investing Today
                </Button>
              </Link>
              <a href="mailto:info@watergrove.com">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  Email Our Team
                </Button>
              </a>
            </div>
            
            {/* Risk disclaimer */}
            <div className="mt-10 pt-8 border-t border-wg-neutral/20">
              <p className="text-wg-neutral/80 text-sm mb-2">
                <span className="font-bold">Important:</span> All investments carry risk. Water Grove does not guarantee profits but applies structured risk management.
              </p>
              <p className="text-wg-neutral/60 text-xs">
                Past performance is not indicative of future results. Please review investment terms carefully.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactClient;
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Metadata } from 'next';

const ContactUs = () => {
  const metadata: Metadata ={
    title: "Contact Us | WG"
  }
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

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Office Address',
      details: ['123 Investment Plaza', 'Victoria Island', 'Lagos, Nigeria'],
      color: 'bg-blue-500/10'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Numbers',
      details: ['+234 800 123 4567', '+234 900 987 6543'],
      color: 'bg-green-500/10'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Address',
      details: ['info@watergrove.com', 'support@watergrove.com'],
      color: 'bg-purple-500/10'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Working Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
      color: 'bg-orange-500/10'
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
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      department: 'Client Relations',
      contact: 'clients@watergrove.com',
      phone: '+234 800 123 4002',
      icon: <Users className="h-5 w-5" />
    },
    {
      department: 'Technical Support',
      contact: 'support@watergrove.com',
      phone: '+234 800 123 4003',
      icon: <Headset className="h-5 w-5" />
    },
    {
      department: 'Compliance',
      contact: 'compliance@watergrove.com',
      phone: '+234 800 123 4004',
      icon: <Shield className="h-5 w-5" />
    }
  ];

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
    <div className="min-h-screen bg-sidebar">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sidebar via-wg-primary/5 to-sidebar"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-wg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-wg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-wg-primary/10 to-wg-secondary/10 border border-wg-primary/20 mb-6">
              <MessageSquare className="h-4 w-4 text-wg-primary" />
              <span className="text-sm font-medium text-wg-primary">We're Here to Help</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-wg-primary mb-6">
              Get in Touch with
              <span className="text-wg-secondary block">Water Grove</span>
            </h1>
            
            <p className="text-xl text-wg-primary/80 mb-10 max-w-3xl mx-auto">
              Have questions about investments, need support, or want to explore partnership opportunities? 
              Our team is ready to assist you on your investment journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gradient-to-r from-wg-primary/5 to-wg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-sidebar/80 backdrop-blur-sm border-sidebar-border hover:border-wg-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${info.color}`}>
                      <div className="text-wg-primary">{info.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-wg-primary mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-wg-primary/70">{detail}</p>
                        ))}
                      </div>
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-sidebar/80 backdrop-blur-sm border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-wg-primary">Send Us a Message</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-wg-primary mb-3">Message Sent Successfully!</h3>
                      <p className="text-wg-primary/70 mb-6">
                        Thank you for contacting Water Grove. Our team will respond to your inquiry within 24 hours.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        className="bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-wg-primary">
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
                              className="pl-10 bg-sidebar border-sidebar-border text-wg-primary"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-wg-primary">
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
                              className="pl-10 bg-sidebar border-sidebar-border text-wg-primary"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-wg-primary">
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
                              className="pl-10 bg-sidebar border-sidebar-border text-wg-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-wg-primary">
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
                              className="pl-10 bg-sidebar border-sidebar-border text-wg-primary"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-wg-primary">
                          Inquiry Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="bg-sidebar border-sidebar-border text-wg-primary">
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
                        <Label htmlFor="subject" className="text-wg-primary">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="bg-sidebar border-sidebar-border text-wg-primary"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-wg-primary">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[150px] bg-sidebar border-sidebar-border text-wg-primary"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="rounded border-sidebar-border text-wg-primary focus:ring-wg-primary"
                          required
                        />
                        <Label htmlFor="privacy" className="text-sm text-wg-primary/70">
                          I agree to the privacy policy and terms of service
                        </Label>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary"
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
              <Card className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">Quick Contact Options</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Prefer to reach out directly? Here are quick ways to connect
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-sidebar/50">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Phone className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Call Us Now</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Speak directly with our investment specialists
                      </p>
                      <a href="tel:+2348001234567" className="text-wg-primary font-medium hover:text-wg-secondary">
                        +234 800 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-sidebar/50">
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <Mail className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Email Support</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Get detailed responses via email
                      </p>
                      <a href="mailto:support@watergrove.com" className="text-wg-primary font-medium hover:text-wg-secondary">
                        support@watergrove.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-sidebar/50">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <Clock className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Live Chat</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Chat with our support team in real-time
                      </p>
                      <Button variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/10 mt-2">
                        Start Live Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Department Contacts */}
              <Card className="bg-sidebar/80 backdrop-blur-sm border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">Department Contacts</CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Reach out to specific teams for specialized assistance
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {teamDepartments.map((dept, index) => (
                      <div key={index} className="p-4 rounded-lg border border-sidebar-border hover:border-wg-primary/30 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-wg-primary/10">
                              <div className="text-wg-primary">{dept.icon}</div>
                            </div>
                            <div>
                              <h4 className="font-bold text-wg-primary">{dept.department}</h4>
                              <div className="space-y-1 mt-2">
                                <a href={`mailto:${dept.contact}`} className="text-sm text-wg-primary/70 hover:text-wg-secondary block">
                                  {dept.contact}
                                </a>
                                <a href={`tel:${dept.phone}`} className="text-sm text-wg-primary/70 hover:text-wg-secondary block">
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
              
              {/* FAQ Link */}
              <Card className="bg-gradient-to-r from-wg-primary/5 to-wg-secondary/5 border-sidebar-border">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-wg-primary mb-3">Before You Contact</h3>
                    <p className="text-wg-primary/70 mb-4">
                      Check our FAQ section for quick answers to common questions
                    </p>
                    <Link href="/faq">
                      <Button variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary/10">
                        Visit FAQ Page
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 bg-gradient-to-b from-sidebar to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">Visit Our Office</h2>
            <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
              Schedule an in-person consultation at our headquarters in Lagos
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-sidebar-border shadow-xl">
              <div className="h-[400px] bg-gradient-to-br from-wg-primary/10 to-wg-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-4">
                    <MapPin className="h-12 w-12 text-wg-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-wg-primary mb-2">Water Grove Headquarters</h3>
                  <p className="text-wg-primary/70">123 Investment Plaza, Victoria Island, Lagos</p>
                  <Button className="mt-6 bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary">
                    <Globe className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Location Details */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Parking Information</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li>• Dedicated visitor parking available</li>
                    <li>• Underground parking with security</li>
                    <li>• Free parking for scheduled meetings</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Security Protocol</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li>• Photo ID required for entry</li>
                    <li>• Pre-registration recommended</li>
                    <li>• Security screening at entrance</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Best Time to Visit</h4>
                  <ul className="space-y-2 text-sm text-wg-primary/70">
                    <li>• Weekdays: 9 AM - 5 PM</li>
                    <li>• Schedule appointments in advance</li>
                    <li>• Allow 30 minutes before meeting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-wg-primary to-wg-secondary border-0 overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 border border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 border border-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <CardContent className="p-12 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Start Your Investment Journey?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Contact us today to schedule a consultation with our investment specialists
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/register">
                    <Button size="lg" className="bg-white text-wg-primary hover:bg-white/90 px-8">
                      Create Account
                    </Button>
                  </Link>
                  <a href="tel:+2348001234567">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="h-5 w-5" />
                      <span>Secure Communication</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>24/7 Response Time</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>Expert Consultation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add TrendingUp icon component
const TrendingUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default ContactUs;
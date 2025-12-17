/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  LogIn, 
  Shield, 
  Lock, 
  Eye, 
  Mail, 
  ArrowRight,
  CheckCircle,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Sign In | Water Grove Investment Platform',
  description: 'Access your Water Grove investment dashboard to manage your portfolio and track returns.'
};

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-wg-primary mb-4">
              Access Your Investment Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sign in to manage your investments, track returns, and explore new opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Login Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-2xl text-wg-primary">Sign In to Your Account</CardTitle>
                  <CardDescription className="text-gray-600">
                    Enter your credentials to access your investment dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 border-gray-300 focus:border-wg-primary focus:ring-wg-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-gray-700">
                          Password
                        </Label>
                        <Link 
                          href="/forgot-password" 
                          className="text-sm text-wg-primary hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 border-gray-300 focus:border-wg-primary focus:ring-wg-primary"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 text-wg-primary border-gray-300 rounded focus:ring-wg-primary"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700">
                          Remember this device
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-wg-primary hover:bg-wg-primary/90 text-white py-6 text-base"
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <div className="text-center">
                      <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-wg-primary font-semibold hover:underline">
                          Create Investment Account
                        </Link>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Security Notice</h4>
                    <p className="text-sm text-blue-700">
                      Always ensure you're on the official Water Grove platform. Never share your 
                      login credentials with anyone. Our support team will never ask for your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Preview & Features */}
            <div className="space-y-6">
              <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-wg-primary/5 to-wg-primary/10">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wg-primary/20 mb-4">
                      <BarChart3 className="h-8 w-8 text-wg-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-wg-primary mb-2">
                      Investment Dashboard
                    </h3>
                    <p className="text-sm text-gray-700">
                      Track your portfolio performance and returns in real-time
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Current Balance</span>
                      <span className="font-semibold text-wg-primary">₦--</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Monthly ROI</span>
                      <span className="font-semibold text-green-600">₦--</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Total Returns</span>
                      <span className="font-semibold text-blue-600">₦--</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Access Features Card - This is where we stop */}
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-xl text-wg-primary">
                    Quick Access Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-lg bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">View Investment History</h4>
                      <p className="text-xs text-gray-600">Complete transaction records</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Track Performance</h4>
                      <p className="text-xs text-gray-600">Real-time ROI monitoring</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Contact Support</h4>
                      <p className="text-xs text-gray-600">24/7 investment support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Everything after this card has been removed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
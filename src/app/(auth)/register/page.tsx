import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  UserPlus, 
  Shield, 
  Lock, 
  Eye, 
  Mail, 
  Phone, 
  User,
  Building,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Create Account | Water Grove Investment Platform',
  description: 'Register for a professional investment account to start your journey with Water Grove.'
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-wg-primary mb-4">
              Create Your Investment Account
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Water Grove to access professional investment opportunities with transparent returns
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-2xl text-wg-primary">Account Registration</CardTitle>
                  <CardDescription className="text-gray-600">
                    Complete your profile to begin investing
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 border-gray-300 focus:border-wg-primary focus:ring-wg-primary"
                          required
                        />
                      </div>
                    </div>

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

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          className="pl-10 border-gray-300 focus:border-wg-primary focus:ring-wg-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Investment Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="investmentInterest" className="text-gray-700">
                        Investment Category Interest
                      </Label>
                      <select
                        id="investmentInterest"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-wg-primary focus:ring-wg-primary focus:outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>Select preferred investment category</option>
                        <option value="starter">Starter Groove (₦100K – ₦499K)</option>
                        <option value="growth">Growth Groove (₦500K – ₦1M)</option>
                        <option value="premium">Premium Groove (₦1M – ₦5M)</option>
                        <option value="elite">Elite Groove (₦5M – ₦10M)</option>
                        <option value="executive">Executive Groove (₦10M+)</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
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
                      <p className="text-xs text-gray-500">
                        Minimum 8 characters with uppercase, lowercase, and numbers
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
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

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 h-4 w-4 text-wg-primary border-gray-300 rounded focus:ring-wg-primary"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-wg-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-wg-primary hover:underline">
                          Privacy Policy
                        </Link>
                        . I understand that all investments involve risk.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-wg-primary hover:bg-wg-primary/90 text-white py-6 text-base"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Create Investment Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                      Already have an account?{' '}
                      <Link href="/login" className="text-wg-primary font-semibold hover:underline">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-xl text-wg-primary">
                    Why Invest With Water Grove
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Asset-Backed Investments</h4>
                      <p className="text-sm text-gray-600">All investments secured by tangible assets</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Monthly ROI Returns</h4>
                      <p className="text-sm text-gray-600">Consistent monthly returns on your investment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Secure & Regulated</h4>
                      <p className="text-sm text-gray-600">Full regulatory compliance and security protocols</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Expert Management</h4>
                      <p className="text-sm text-gray-600">Professional portfolio management and support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice Card - This is where we stop */}
              <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-wg-primary/5 to-wg-primary/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wg-primary/20 mb-4">
                      <Lock className="h-8 w-8 text-wg-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-wg-primary mb-2">
                      Secure Registration
                    </h3>
                    <p className="text-sm text-gray-700">
                      Your information is protected with bank-level security and encryption
                    </p>
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

export default RegisterPage;
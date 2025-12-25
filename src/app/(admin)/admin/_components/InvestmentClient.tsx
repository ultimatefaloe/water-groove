"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { StatsCard } from "@/components/ui/StatsCard";
import { Search, Filter, TrendingUp, AlertCircle, PlayCircle, PauseCircle, CheckCircle } from "lucide-react";
import { AdminInvestmentRow, AdminInvestmentQueryParams, PaginatedResponse } from "@/types/adminType";
import { InvestmentStatus } from "@prisma/client";
import InvestmentTable from "@/components/investment/InvestmentTable";
import InvestmentDetailsModal from "@/components/investment/InvestmentDetailsModal";
import { formatCurrency } from "@/lib/utils";

interface InvestmentClientProps {
  initialTransactions: AdminInvestmentRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isAdmin: boolean;
}

// Stats Icons
const StatsIcons = {
  total: (
    <TrendingUp className="w-6 h-6 text-wg-accent" />
  ),
  active: (
    <PlayCircle className="w-6 h-6 text-green-500" />
  ),
  pending: (
    <AlertCircle className="w-6 h-6 text-yellow-500" />
  ),
  completed: (
    <CheckCircle className="w-6 h-6 text-purple-500" />
  ),
  paused: (
    <PauseCircle className="w-6 h-6 text-blue-500" />
  ),
};

const InvestmentClient: React.FC<InvestmentClientProps> = ({
  initialTransactions,
  total,
  page: initialPage,
  limit: initialLimit,
  totalPages,
  isAdmin,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [investments, setInvestments] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<AdminInvestmentRow | null>(null);
  
  const [filters, setFilters] = useState<AdminInvestmentQueryParams>({
    userId: searchParams.get('userId') || undefined,
    categoryId: searchParams.get('categoryId') || undefined,
    status: searchParams.get('status') as InvestmentStatus || undefined,
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
  }); 
  
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Calculate stats
  const totalInvestments = total;
  const activeInvestments = investments.filter(i => i.status === 'ACTIVE').length;
  const pendingInvestments = investments.filter(i => i.status === 'PENDING_PAYMENT').length;
  const completedInvestments = investments.filter(i => i.status === 'COMPLETED').length;
  const pausedInvestments = investments.filter(i => i.status === 'PAUSED').length;
  const totalPrincipal = investments.reduce((sum, i) => sum + i.principalAmount, 0);

  // Update URL with filters and pagination
  const updateURL = useCallback((newFilters: AdminInvestmentQueryParams, newPage: number, newLimit: number) => {
    const params = new URLSearchParams();
    
    if (newFilters.userId) params.set('userId', newFilters.userId);
    if (newFilters.categoryId) params.set('categoryId', newFilters.categoryId);
    if (newFilters.status) params.set('status', newFilters.status);
    if (newFilters.startDate) params.set('startDate', newFilters.startDate.toISOString());
    if (newFilters.endDate) params.set('endDate', newFilters.endDate.toISOString());
    if (newFilters.order) params.set('order', newFilters.order);
    
    params.set('page', newPage.toString());
    params.set('limit', newLimit.toString());
    
    router.push(`/admin/investments?${params.toString()}`);
  }, [router]);

  // Fetch investments with filters
  const fetchInvestments = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter the initial data based on current filters
      const filteredInvestments = initialTransactions.filter(investment => {
        if (filters.userId && !investment.userId.includes(filters.userId)) {
          return false;
        }
        if (filters.categoryId && investment.categoryId !== filters.categoryId) {
          return false;
        }
        if (filters.status && investment.status !== filters.status) {
          return false;
        }
        if (filters.startDate && investment.startDate) {
          const investmentDate = new Date(investment.startDate);
          const filterDate = new Date(filters.startDate);
          if (investmentDate < filterDate) return false;
        }
        if (filters.endDate && investment.endDate) {
          const investmentDate = new Date(investment.endDate);
          const filterDate = new Date(filters.endDate);
          if (investmentDate > filterDate) return false;
        }
        return true;
      });

      // Sort investments
      const sortedInvestments = [...filteredInvestments].sort((a, b) => {
        if (filters.order === 'asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });

      setInvestments(sortedInvestments);
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, initialTransactions]);

  useEffect(() => {
    fetchInvestments();
    updateURL(filters, page, limit);
  }, [filters, page, limit, updateURL]);

  // Handle filter changes
  const handleFilterChange = (key: keyof AdminInvestmentQueryParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  // Handle investment actions
  const handleInvestmentAction = async (investment: AdminInvestmentRow, action: string) => {
    try {
      // In a real app, this would be an API call
      console.log(`Action: ${action} on investment: ${investment.id}`);
      
      // Update local state for demo
      let newStatus: InvestmentStatus = investment.status;
      let newStartDate = investment.startDate;
      let newEndDate = investment.endDate;
      
      switch (action) {
        case 'APPROVE':
          newStatus = 'ACTIVE';
          newStartDate = new Date();
          if (investment.startDate) {
            const endDate = new Date(investment.startDate);
            endDate.setMonth(endDate.getMonth() + investment.durationMonths);
            newEndDate = endDate;
          }
          break;
        case 'REJECT':
          newStatus = 'REJECTED';
          break;
        case 'PAUSE':
          newStatus = 'PAUSED';
          break;
        case 'RESUME':
          newStatus = 'ACTIVE';
          break;
        case 'CANCEL':
          newStatus = 'CANCELLED';
          break;
        case 'FORCE_COMPLETE':
          newStatus = 'COMPLETED';
          newEndDate = new Date();
          break;
      }
      
      setInvestments(prev => prev.map(i => 
        i.id === investment.id 
          ? { 
              ...i, 
              status: newStatus,
              startDate: newStartDate,
              endDate: newEndDate
            }
          : i
      ));
      
      // Show success message
      alert(`Investment ${investment.id} ${action.toLowerCase()}d successfully`);
    } catch (error) {
      console.error('Error processing action:', error);
      alert('Failed to process action');
    }
  };

  // Calculate total expected ROI
  const calculateTotalExpectedROI = () => {
    return investments.reduce((sum, investment) => {
      const roi = (investment.principalAmount * investment.roiRateSnapshot * investment.durationMonths) / 12;
      return sum + roi;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-wg-neutral p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard
          title="Total Investments"
          value={totalInvestments.toString()}
          description="All investment portfolios"
          icon={StatsIcons.total}
        />
        <StatsCard
          title="Active"
          value={activeInvestments.toString()}
          description="Currently active"
          icon={StatsIcons.active}
        />
        <StatsCard
          title="Pending"
          value={pendingInvestments.toString()}
          description="Awaiting payment"
          icon={StatsIcons.pending}
        />
        <StatsCard
          title="Completed"
          value={completedInvestments.toString()}
          description="Successfully completed"
          icon={StatsIcons.completed}
        />
        <StatsCard
          title="Paused"
          value={pausedInvestments.toString()}
          description="Temporarily paused"
          icon={StatsIcons.paused}
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Total Principal"
          value={formatCurrency(totalPrincipal)}
          description="Sum of all investments"
          icon={
            <div className="p-2 rounded-full bg-wg-accent/10">
              <span className="text-wg-accent font-bold">$</span>
            </div>
          }
        />
        <StatsCard
          title="Expected ROI"
          value={formatCurrency(calculateTotalExpectedROI())}
          description="Total expected returns"
          icon={
            <div className="p-2 rounded-full bg-green-500/10">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          }
        />
      </div>

      {/* Filters Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20 mb-6">
        <CardHeader>
          <CardTitle className="text-wg-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription className="text-wg-primary/60">
            Filter investments by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search by User ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                User ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wg-primary/40" />
                <Input
                  placeholder="Enter user ID..."
                  value={filters.userId || ''}
                  onChange={(e) => handleFilterChange('userId', e.target.value)}
                  className="pl-10 bg-wg-neutral border-wg-accent/20 text-wg-primary"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Category
              </label>
              <Select
                value={filters.categoryId || ''}
                onValueChange={(value) => 
                  handleFilterChange('categoryId', value === '' ? undefined : value)
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="starter">Starter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Status
              </label>
              <Select
                value={filters.status || ''}
                onValueChange={(value) => 
                  handleFilterChange('status', value === '' ? undefined : value as InvestmentStatus)
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PAUSED">Paused</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Sort Order
              </label>
              <Select
                value={filters.order || 'desc'}
                onValueChange={(value) => 
                  handleFilterChange('order', value as 'asc' | 'desc')
                }
              >
                <SelectTrigger className="bg-wg-neutral border-wg-accent/20 text-wg-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                Start Date (From)
              </label>
              <Input
                type="date"
                value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => 
                  handleFilterChange('startDate', e.target.value ? new Date(e.target.value) : undefined)
                }
                className="bg-wg-neutral border-wg-accent/20 text-wg-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-wg-primary/80">
                End Date (To)
              </label>
              <Input
                type="date"
                value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => 
                  handleFilterChange('endDate', e.target.value ? new Date(e.target.value) : undefined)
                }
                className="bg-wg-neutral border-wg-accent/20 text-wg-primary"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-wg-primary/60">
              Showing {investments.length} of {total} investments
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="border-wg-accent/30 text-wg-primary hover:bg-wg-accent/10"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => fetchInvestments()}
                className="bg-wg-accent text-white hover:bg-wg-accent/90"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investments Table Card */}
      <Card className="bg-wg-neutral2 border-wg-accent/20">
        <CardHeader>
          <CardTitle className="text-wg-primary">Investment Portfolios</CardTitle>
          <CardDescription className="text-wg-primary/60">
            View and manage all investment portfolios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentTable
            investments={investments}
            loading={loading}
            onViewDetails={(investment) => {
              setSelectedInvestment(investment);
              setIsDetailsOpen(true);
            }}
            onAction={handleInvestmentAction}
            isAdmin={isAdmin}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNum);
                          }}
                          isActive={pageNum === page}
                          className={
                            pageNum === page
                              ? "bg-wg-accent text-white hover:bg-wg-accent/90"
                              : "hover:bg-wg-accent/20"
                          }
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-wg-accent/20"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              
              {/* Page Size Selector */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-wg-primary/60">
                <span>Show</span>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => setLimit(parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8 bg-wg-neutral border-wg-accent/20 text-wg-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-wg-neutral2 border-wg-accent/20">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span>investments per page</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        investment={selectedInvestment}
        isAdmin={isAdmin}
        onAction={handleInvestmentAction}
      />
    </div>
  );
};

export default InvestmentClient;
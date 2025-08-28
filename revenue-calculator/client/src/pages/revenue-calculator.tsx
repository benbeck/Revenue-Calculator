import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CalculationState {
  revenueGoal: number;
  timeFrame: number;
  profitMargin: number;
}

export default function RevenueCalculator() {
  const [state, setState] = useState<CalculationState>({
    revenueGoal: 100000,
    timeFrame: 12,
    profitMargin: 0
  });

  // Product pricing tiers (number of customers)
  const productTiers = [10000, 5000, 2000, 1000, 300, 200, 100, 50, 25, 10, 5];
  
  // Subscription pricing tiers (number of customers)  
  const subscriptionTiers = [10000, 5000, 2500, 1000, 500, 250, 100, 50, 25, 10, 5];

  // Format currency with commas
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate gross revenue needed (accounting for profit margin)
  const calculateGrossRevenue = (netRevenue: number, profitMarginPercent: number): number => {
    if (profitMarginPercent >= 100) return netRevenue;
    return netRevenue / (1 - (profitMarginPercent / 100));
  };

  // Calculate derived values
  const grossRevenue = calculateGrossRevenue(state.revenueGoal, state.profitMargin);
  const monthlyRevenue = grossRevenue / state.timeFrame;
  const dailyRevenue = monthlyRevenue / 30; // Approximate 30 days per month
  const yearlyRevenue = grossRevenue * (12 / state.timeFrame);

  const handleRevenueGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters for calculation
    const cleanValue = e.target.value.replace(/[^\d]/g, '');
    const value = Math.max(0, parseInt(cleanValue) || 0);
    setState(prev => ({ ...prev, revenueGoal: value }));
  };

  // Format revenue input with commas
  const formatRevenueInput = (value: number): string => {
    return value.toLocaleString('en-US');
  };

  const handleTimeFrameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const years = Math.max(0.1, parseFloat(e.target.value) || 1);
    const months = Math.round(years * 12);
    setState(prev => ({ ...prev, timeFrame: months }));
  };

  const handleProfitMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(99, Math.max(0, parseFloat(e.target.value) || 0));
    setState(prev => ({ ...prev, profitMargin: value }));
  };

  // Handle clicking example values
  const handleExampleClick = (revenue: number, timeframe: number) => {
    setState(prev => ({ ...prev, revenueGoal: revenue, timeFrame: timeframe }));
  };

  // Get years from months for display
  const getYearsFromMonths = (months: number): number => {
    return months / 12;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Revenue Calculator</h1>
            <div className="text-sm text-secondary">
              Calculate pricing strategies to reach your revenue goals
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Set Your Revenue Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Revenue Goal Input */}
              <div className="space-y-2">
                <Label htmlFor="revenueGoal" className="text-sm font-medium text-primary">
                  Revenue Goal
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-secondary text-lg">$</span>
                  </div>
                  <Input
                    type="text"
                    id="revenueGoal"
                    value={formatRevenueInput(state.revenueGoal)}
                    onChange={handleRevenueGoalChange}
                    className="pl-8 text-lg font-medium"
                    placeholder="100,000"
                  />
                </div>
              </div>

              {/* Time Frame Input */}
              <div className="space-y-2">
                <Label htmlFor="timeFrame" className="text-sm font-medium text-primary">
                  Time Frame (Years)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    id="timeFrame"
                    value={getYearsFromMonths(state.timeFrame)}
                    onChange={handleTimeFrameChange}
                    min="0.1"
                    step="0.1"
                    className="pr-12 text-lg font-medium"
                    placeholder="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-secondary text-sm">years</span>
                  </div>
                </div>
              </div>

              {/* Profit Margin Input */}
              <div className="space-y-2">
                <Label htmlFor="profitMargin" className="text-sm font-medium text-primary">
                  Profit Margin
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    id="profitMargin"
                    value={state.profitMargin}
                    onChange={handleProfitMarginChange}
                    min="0"
                    max="99"
                    className="pr-8 text-lg font-medium"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-secondary text-lg">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-secondary mb-2">
                <span className="font-medium">Examples:</span> 
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleExampleClick(10000, 6)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-nw-light-green hover:border-nw-green transition-colors"
                >
                  $10K in 0.5yr
                </button>
                <button
                  onClick={() => handleExampleClick(100000, 12)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-nw-light-green hover:border-nw-green transition-colors"
                >
                  $100K in 1yr
                </button>
                <button
                  onClick={() => handleExampleClick(1000000, 24)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-nw-light-green hover:border-nw-green transition-colors"
                >
                  $1M in 2yrs
                </button>
                <button
                  onClick={() => handleExampleClick(100000000, 120)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-nw-light-green hover:border-nw-green transition-colors"
                >
                  $100M in 10yrs
                </button>
                <button
                  onClick={() => handleExampleClick(1000000000, 120)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-nw-light-green hover:border-nw-green transition-colors"
                >
                  $1B in 10yrs
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            You want to make {formatCurrency(state.revenueGoal)}?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Yearly Card */}
            <Card className="bg-gradient-to-br from-nw-light-green to-nw-med-green border-nw-green/20">
              <CardContent className="p-6 text-center">
                <div className="text-sm font-medium nw-green mb-2">Per Year</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(yearlyRevenue)}
                </div>
                <div className="text-xs text-secondary mt-1">Annual Revenue Target</div>
              </CardContent>
            </Card>

            {/* Monthly Card */}
            <Card className="bg-gradient-to-br from-nw-med-green to-nw-dark-green border-nw-green/30">
              <CardContent className="p-6 text-center">
                <div className="text-sm font-medium nw-green mb-2">Per Month</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(monthlyRevenue)}
                </div>
                <div className="text-xs text-secondary mt-1">Monthly Revenue Target</div>
              </CardContent>
            </Card>

            {/* Daily Card */}
            <Card className="bg-gradient-to-br from-nw-light-green to-nw-med-green border-nw-green/20 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="text-sm font-medium nw-green mb-2">Per Day</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(dailyRevenue)}
                </div>
                <div className="text-xs text-secondary mt-1">Daily Revenue Target</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Tables */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Pricing Table */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-nw-blue text-white">
              <CardTitle className="text-xl mb-2">Product Pricing Strategy</CardTitle>
              <p className="text-blue-100">One-time product sales to reach your goal</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-primary font-semibold">Customers</TableHead>
                    <TableHead className="text-primary font-semibold">Price</TableHead>
                    <TableHead className="text-primary font-semibold">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productTiers.map(customers => {
                    const price = grossRevenue / customers;
                    return (
                      <TableRow key={customers} className="hover:bg-gray-50">
                        <TableCell className="font-semibold text-primary">{formatNumber(customers)}</TableCell>
                        <TableCell className="nw-blue font-bold">{formatCurrency(price)}</TableCell>
                        <TableCell className="text-primary">{formatCurrency(grossRevenue)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subscription Pricing Table */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-nw-green text-white">
              <CardTitle className="text-xl mb-2">Subscription Pricing Strategy</CardTitle>
              <p className="text-green-100">Monthly recurring revenue to reach your goal</p>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-primary font-semibold">Customers</TableHead>
                    <TableHead className="text-primary font-semibold">Price</TableHead>
                    <TableHead className="text-primary font-semibold">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionTiers.map(customers => {
                    const monthlyPrice = grossRevenue / (customers * state.timeFrame);
                    return (
                      <TableRow key={customers} className="hover:bg-gray-50">
                        <TableCell className="font-semibold text-primary">{formatNumber(customers)}</TableCell>
                        <TableCell className="nw-green font-bold">{formatCurrency(monthlyPrice)}/mo</TableCell>
                        <TableCell className="text-primary">{formatCurrency(grossRevenue)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">How This Revenue Calculator Works</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Think Backwards from Your Goal</h3>
                <p className="text-secondary mb-4">
                  Instead of randomly brainstorming business ideas, start with your revenue target and work backwards. 
                  This helps you focus on pricing strategies that will actually get you to your goal.
                </p>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-nw-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Set your revenue goal and timeframe
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-nw-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Factor in your desired profit margin
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-nw-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    See exactly what pricing combinations work
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Product vs Subscription Models</h3>
                <p className="text-secondary mb-4">
                  Compare one-time product sales versus recurring subscription revenue to see which model 
                  aligns better with your business goals and customer acquisition capabilities.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-secondary">
                    <span className="font-medium text-primary">Pro Tip:</span> 
                    Subscription models often require fewer customers to reach the same revenue goal, 
                    but require ongoing value delivery to maintain retention.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-secondary">
            <p className="text-sm">
              Revenue Calculator - Calculate pricing strategies to reach your revenue goals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

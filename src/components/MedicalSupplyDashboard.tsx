import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, TrendingUpIcon, TrendingDownIcon, PackageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for medical supplies
const generateMockData = () => {
  const months = [
    { month: 'Yanvar 2022', year: 2022, monthNum: 1 },
    { month: 'Fevral 2022', year: 2022, monthNum: 2 },
    { month: 'Mart 2022', year: 2022, monthNum: 3 },
    { month: 'Aprel 2022', year: 2022, monthNum: 4 },
    { month: 'May 2022', year: 2022, monthNum: 5 },
    { month: 'İyun 2022', year: 2022, monthNum: 6 },
    { month: 'İyul 2022', year: 2022, monthNum: 7 },
    { month: 'Avqust 2022', year: 2022, monthNum: 8 },
    { month: 'Sentyabr 2022', year: 2022, monthNum: 9 },
    { month: 'Oktyabr 2022', year: 2022, monthNum: 10 },
    { month: 'Noyabr 2022', year: 2022, monthNum: 11 },
    { month: 'Dekabr 2022', year: 2022, monthNum: 12 },
    { month: 'Yanvar 2023', year: 2023, monthNum: 1 },
    { month: 'Fevral 2023', year: 2023, monthNum: 2 },
    { month: 'Mart 2023', year: 2023, monthNum: 3 },
    { month: 'Aprel 2023', year: 2023, monthNum: 4 },
    { month: 'May 2023', year: 2023, monthNum: 5 },
    { month: 'İyun 2023', year: 2023, monthNum: 6 },
    { month: 'İyul 2023', year: 2023, monthNum: 7 },
    { month: 'Avqust 2023', year: 2023, monthNum: 8 },
    { month: 'Sentyabr 2023', year: 2023, monthNum: 9 },
    { month: 'Oktyabr 2023', year: 2023, monthNum: 10 },
    { month: 'Noyabr 2023', year: 2023, monthNum: 11 },
    { month: 'Dekabr 2023', year: 2023, monthNum: 12 },
    { month: 'Yanvar 2024', year: 2024, monthNum: 1 },
    { month: 'Fevral 2024', year: 2024, monthNum: 2 },
    { month: 'Mart 2024', year: 2024, monthNum: 3 },
    { month: 'Aprel 2024', year: 2024, monthNum: 4 },
    { month: 'May 2024', year: 2024, monthNum: 5 },
    { month: 'İyun 2024', year: 2024, monthNum: 6 },
    { month: 'İyul 2024', year: 2024, monthNum: 7 },
    { month: 'Avqust 2024', year: 2024, monthNum: 8 },
    { month: 'Sentyabr 2024', year: 2024, monthNum: 9 },
    { month: 'Oktyabr 2024', year: 2024, monthNum: 10 },
  ];

  return months.map((item, index) => ({
    month: item.month,
    shortMonth: item.month.split(' ')[0],
    year: item.year,
    purchase: Math.floor(Math.random() * 50000) + 20000, // 20k-70k AZN
    sales: Math.floor(Math.random() * 40000) + 15000,   // 15k-55k AZN
    inventory: Math.floor(Math.random() * 1000) + 500,  // 500-1500 items
    suppliers: Math.floor(Math.random() * 15) + 5,      // 5-20 suppliers
  }));
};


interface DateRange {
  start: string;
  end: string;
}

const MedicalSupplyDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: 'İyun 2022',
    end: 'Oktyabr 2024'
  });
  
  const mockData = useMemo(() => generateMockData(), []);
  
  // Get all available months for date selection
  const availableMonths = useMemo(() => 
    mockData.map(item => item.month), [mockData]
  );
  
  const filteredData = useMemo(() => {
    const startIndex = mockData.findIndex(item => item.month === dateRange.start);
    const endIndex = mockData.findIndex(item => item.month === dateRange.end);
    
    if (startIndex === -1 || endIndex === -1) return mockData;
    
    return mockData.slice(startIndex, endIndex + 1);
  }, [mockData, dateRange]);

  const totals = useMemo(() => {
    const totalPurchase = filteredData.reduce((sum, item) => sum + item.purchase, 0);
    const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    const avgInventory = Math.round(filteredData.reduce((sum, item) => sum + item.inventory, 0) / filteredData.length);
    
    return {
      purchase: totalPurchase,
      sales: totalSales,
      profit: totalSales - totalPurchase,
      avgInventory
    };
  }, [filteredData]);

  const profitMargin = ((totals.profit / totals.purchase) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Tibbi Təchizat İdarəetmə Sistemi
          </h1>
          <p className="text-muted-foreground text-lg">
            Xəstəxana Direktorunun İdarəetmə Paneli
          </p>
        </div>

        {/* Date Range Selector */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Tarix Aralığı Seçimi
            </CardTitle>
            <CardDescription>
              Analiz üçün tarix aralığını seçin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Başlanğıc:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        "min-w-[180px]"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.start}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Select 
                      value={dateRange.start} 
                      onValueChange={(value) => setDateRange(prev => ({ ...prev, start: value }))}
                    >
                      <SelectTrigger className="w-[200px] m-3">
                        <SelectValue placeholder="Başlanğıc tarixi seçin" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {availableMonths.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Son:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        "min-w-[180px]"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.end}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Select 
                      value={dateRange.end} 
                      onValueChange={(value) => setDateRange(prev => ({ ...prev, end: value }))}
                    >
                      <SelectTrigger className="w-[200px] m-3">
                        <SelectValue placeholder="Son tarixi seçin" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {availableMonths.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-purchase/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Alış</CardTitle>
              <TrendingDownIcon className="h-4 w-4 text-purchase" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purchase">
                {totals.purchase.toLocaleString()} AZN
              </div>
              <p className="text-xs text-muted-foreground">
                Seçilmiş dövr üzrə
              </p>
            </CardContent>
          </Card>

          <Card className="border-sales/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Satış</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-sales" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sales">
                {totals.sales.toLocaleString()} AZN
              </div>
              <p className="text-xs text-muted-foreground">
                Seçilmiş dövr üzrə
              </p>
            </CardContent>
          </Card>

          <Card className="border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xalis Mənfəət</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {totals.profit.toLocaleString()} AZN
              </div>
              <p className="text-xs text-muted-foreground">
                Mənfəət marjası: {profitMargin}%
              </p>
            </CardContent>
          </Card>

          <Card className="border-info/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orta Ehtiyat</CardTitle>
              <PackageIcon className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">
                {totals.avgInventory.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Məhsul vahidi
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart - Purchase vs Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Alış və Satış Dinamikası</CardTitle>
            <CardDescription className="text-base">
              Aylıq alış və satış məbləğləri (AZN) - Mavi: Alış, Qırmızı: Satış
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={filteredData} margin={{ top: 20, right: 50, left: 80, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" opacity={0.6} />
                <XAxis 
                  dataKey="shortMonth" 
                  tick={{ fontSize: 14, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  tick={{ fontSize: 14, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k AZN`}
                  width={80}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  label={{ 
                    value: 'Məbləğ (AZN)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: '14px', fill: 'hsl(var(--muted-foreground))' }
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} AZN`, 
                    name === 'purchase' ? 'Alış' : 'Satış'
                  ]}
                  labelFormatter={(label) => `Ay: ${label}`}
                />
                <Legend 
                  iconType="line"
                  wrapperStyle={{ fontSize: '16px', paddingTop: '20px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="purchase" 
                  stroke="hsl(var(--purchase-color))" 
                  strokeWidth={4}
                  name="Alış (AZN)"
                  dot={{ fill: 'hsl(var(--purchase-color))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--purchase-color))', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--sales-color))" 
                  strokeWidth={4}
                  name="Satış (AZN)"
                  dot={{ fill: 'hsl(var(--sales-color))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'hsl(var(--sales-color))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Fəaliyyət</CardTitle>
            <CardDescription>
              Son ayın ən əhəmiyyətli göstəriciləri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-purchase">
                  {filteredData.slice(-1)[0]?.purchase.toLocaleString()} AZN
                </div>
                <p className="text-sm text-muted-foreground">Son ay alış</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-sales">
                  {filteredData.slice(-1)[0]?.sales.toLocaleString()} AZN
                </div>
                <p className="text-sm text-muted-foreground">Son ay satış</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {filteredData.slice(-1)[0] ? 
                    (filteredData.slice(-1)[0].sales - filteredData.slice(-1)[0].purchase).toLocaleString() 
                    : 0} AZN
                </div>
                <p className="text-sm text-muted-foreground">Son ay mənfəət</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalSupplyDashboard;
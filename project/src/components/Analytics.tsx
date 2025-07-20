import React from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Business {
  id: string;
  name: string;
  category: string;
}

interface AnalyticsProps {
  selectedBusiness: Business | null;
}

const Analytics: React.FC<AnalyticsProps> = ({ selectedBusiness }) => {
  const metrics = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Weekly Appointments",
      value: "156",
      change: "+8.2%",
      icon: Calendar,
      color: "green",
    },
    {
      title: "Messages Handled",
      value: "12,439",
      change: "+15.7%",
      icon: MessageSquare,
      color: "purple",
    },
    {
      title: "Conversion Rate",
      value: "18.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Revenue Generated",
      value: "$24,650",
      change: "+22.4%",
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      color: "indigo",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      emerald: "bg-emerald-100 text-emerald-600",
      indigo: "bg-indigo-100 text-indigo-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (!selectedBusiness) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[350px] text-center">
          <CardHeader>
            <Avatar className="mx-auto mb-4 h-16 w-16">
              <AvatarFallback>
                <Users className="h-8 w-8 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            <CardTitle>No Business Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Create or select a business to view analytics
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedBusiness.name}
          </h1>
          <p className="text-gray-600 mt-1">Analytics Dashboard</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div
                    className={`p-3 rounded-lg ${getColorClasses(
                      metric.color
                    )}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200"
                  >
                    {metric.change}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </h3>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

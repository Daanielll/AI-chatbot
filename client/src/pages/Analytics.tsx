import React, { useState, useEffect } from "react";
import { useBusiness } from "@/components/BusinessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  TrendingUp,
  MessageCircle,
  Target,
} from "lucide-react";

const MetricCard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <Card className="border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg border ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">{trend}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Analytics() {
  const { selectedBusiness, isLoading: isBusinessLoading } = useBusiness();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (selectedBusiness) {
      const data = selectedBusiness.analytics || {
        total_users: 0,
        weekly_appointments: 0,
        monthly_revenue: 0,
        satisfaction_score: 0,
        response_time: 0,
      };
      setAnalytics(data);
    }
  }, [selectedBusiness]);

  if (isBusinessLoading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!selectedBusiness || !analytics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Business Selected
          </h3>
          <p className="text-gray-500">
            Please select a business from the sidebar to view analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Performance Overview
        </h3>
        <p className="text-gray-500">
          Key metrics for your chatbot's performance this month
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Users"
          value={analytics.total_users.toLocaleString()}
          icon={Users}
          trend="+12%"
          color="blue"
        />
        <MetricCard
          title="Weekly Appointments"
          value={analytics.weekly_appointments}
          icon={Calendar}
          trend="+8%"
          color="green"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${analytics.monthly_revenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+15%"
          color="purple"
        />
        <MetricCard
          title="Satisfaction Score"
          value={`${analytics.satisfaction_score.toFixed(1)}/5.0`}
          icon={Star}
          trend="+0.3"
          color="orange"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${analytics.response_time}s`}
          icon={Clock}
          trend="-2s"
          color="indigo"
        />
        <MetricCard
          title="Conversations"
          value="1,247"
          icon={MessageCircle}
          trend="+18%"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New appointment booked
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    User inquiry handled
                  </p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Payment processed
                  </p>
                  <p className="text-xs text-gray-500">12 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Booking Success Rate
                </span>
                <span className="text-sm font-semibold text-gray-900">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Peak Hours</span>
                <span className="text-sm font-semibold text-gray-900">
                  2-4 PM
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Most Common Query</span>
                <span className="text-sm font-semibold text-gray-900">
                  Availability
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Return Users</span>
                <span className="text-sm font-semibold text-gray-900">67%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Calendar, 
  FileSpreadsheet, 
  MessageSquare, 
  Settings, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  Loader2 
} from "lucide-react";
import { useUsersCount, useReportsStats, useRecentReports, useMonthlyReportsChart } from "@/hooks/use-dashboard-stats";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WalikotaDashboard = () => {
  const navigate = useNavigate();
  
  // Fetch data using our custom hooks
  const { data: usersData, isLoading: isLoadingUsers } = useUsersCount();
  const { data: reportsStats, isLoading: isLoadingStats } = useReportsStats();
  const { data: recentReports, isLoading: isLoadingRecent } = useRecentReports(4);
  const { data: monthlyStats, isLoading: isLoadingChart } = useMonthlyReportsChart();

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-500 bg-yellow-50";
      case "IN_PROGRESS": return "text-blue-500 bg-blue-50";
      case "RESOLVED": return "text-green-500 bg-green-50";
      case "REJECTED": return "text-red-500 bg-red-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "PENDING": return "Menunggu";
      case "IN_PROGRESS": return "Diproses";
      case "RESOLVED": return "Selesai";
      case "REJECTED": return "Ditolak";
      default: return status;
    }
  };

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} laporan`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 10
          }
        }
      }
    }
  };

  const getChartData = () => {
    if (!monthlyStats) return null;
    
    return {
      labels: monthlyStats.map(item => item.label),
      datasets: [
        {
          label: 'Menunggu',
          data: monthlyStats.map(item => item.pending),
          backgroundColor: 'rgba(245, 158, 11, 0.7)',
          borderColor: 'rgb(245, 158, 11)',
          borderWidth: 1,
        },
        {
          label: 'Diproses',
          data: monthlyStats.map(item => item.inProgress),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
        {
          label: 'Selesai',
          data: monthlyStats.map(item => item.resolved),
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
        },
        {
          label: 'Ditolak',
          data: monthlyStats.map(item => item.rejected),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1,
        }
      ]
    };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Walikota</h1>
        <p className="text-muted-foreground text-lg">
          Selamat datang di panel administrasi CitiLyst. Pantau dan kelola laporan warga dengan mudah.
        </p>
      </div>

      {/* Stats Overview - Now a 4-card row including Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Pending Reports Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Laporan Menunggu</p>
                {isLoadingStats ? (
                  <div className="flex items-center mt-2">
                    <Loader2 className="h-5 w-5 text-amber-500 animate-spin mr-2" />
                    <span className="text-amber-500">Memuat...</span>
                  </div>
                ) : (
                  <h3 className="text-3xl font-bold mt-1">{reportsStats?.pendingReports || 0}</h3>
                )}
              </div>
              <div className="h-14 w-14 bg-amber-200 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resolved Reports Card */}
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Laporan Selesai</p>
                {isLoadingStats ? (
                  <div className="flex items-center mt-2">
                    <Loader2 className="h-5 w-5 text-emerald-500 animate-spin mr-2" />
                    <span className="text-emerald-500">Memuat...</span>
                  </div>
                ) : (
                  <h3 className="text-3xl font-bold mt-1">{reportsStats?.resolvedReports || 0}</h3>
                )}
              </div>
              <div className="h-14 w-14 bg-emerald-200 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Pengguna</p>
                {isLoadingUsers ? (
                  <div className="flex items-center mt-2">
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
                    <span className="text-blue-500">Memuat...</span>
                  </div>
                ) : (
                  <h3 className="text-3xl font-bold mt-1">{usersData?.totalUsers || 0}</h3>
                )}
              </div>
              <div className="h-14 w-14 bg-blue-200 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card - Now part of the 4-card row */}
        <Card className="shadow-md bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Ringkasan</p>
            {isLoadingStats ? (
              <div className="flex items-center justify-center h-16">
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />
                <span className="text-gray-500">Memuat...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">Total Laporan</span>
                  <span className="font-bold">{reportsStats?.totalReports || 0}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-green-400"
                    style={{ 
                      width: `${reportsStats ? (100 * reportsStats.resolvedReports / (reportsStats.totalReports || 1)) : 0}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Belum: {reportsStats?.pendingReports || 0}</span>
                  <span>Selesai: {reportsStats?.resolvedReports || 0}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Side by side layout for reports and chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Reports Card */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Laporan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingRecent ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin mr-2" />
                <span className="text-gray-500">Memuat data laporan terbaru...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-left text-gray-500 border-b">
                      <th className="pb-3 pt-1 font-medium">ID</th>
                      <th className="pb-3 pt-1 font-medium">Judul</th>
                      <th className="pb-3 pt-1 font-medium">Tanggal</th>
                      <th className="pb-3 pt-1 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports && recentReports.length > 0 ? (
                      recentReports.map((report) => (
                        <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3.5 text-sm">{report.id}</td>
                          <td className="py-3.5 text-sm font-medium">{report.title}</td>
                          <td className="py-3.5 text-sm text-gray-500">{report.date}</td>
                          <td className="py-3.5">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
                              {getStatusDisplay(report.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-gray-500">
                          Tidak ada laporan terbaru
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-5 text-right">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/admin/manage-reports')}
                className="hover:bg-gray-100"
              >
                Lihat Semua Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Reports Chart Card */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Grafik Laporan Bulanan</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            {isLoadingChart ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin mr-2" />
                <span className="text-gray-500">Memuat data grafik...</span>
              </div>
            ) : !monthlyStats || monthlyStats.length === 0 ? (
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center px-4">
                  <BarChart3 className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="mt-2 text-gray-500">Tidak ada data untuk ditampilkan</p>
                </div>
              </div>
            ) : (
              <div className="h-64 pb-2">
                <Bar options={chartOptions} data={getChartData()} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalikotaDashboard;
import React, { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ClipboardCheck,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useUserReports } from "@/hooks/use-check-status";
import { ReportDetailDialog } from "@/components/user/report-detail-dialog";
import { ReportEmptyState } from "@/components/user/report-empty-state";
import { ReportLoading } from "@/components/user/report-loading";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CheckStatusPage() {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [navbarBlurred, setNavbarBlurred] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const { data, isLoading, isError, error, refetch } = useUserReports();

  useEffect(() => {
    document.body.style.overflow = isDialogOpen ? "hidden" : "auto";
    setNavbarBlurred(isDialogOpen);

    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.filter = isDialogOpen ? "blur(4px)" : "none";
      navbar.style.transition = "filter 0.2s ease-in-out";
    }

    return () => {
      document.body.style.overflow = "auto";
      if (navbar) {
        navbar.style.filter = "none";
      }
    };
  }, [isDialogOpen]);

  const handleOpenDetail = (reportId) => {
    setSelectedReportId(reportId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        label: "Menunggu",
        class:
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
      },
      in_progress: {
        label: "Diproses",
        class: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      },
      inprogress: {
        label: "Diproses",
        class: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      },
      resolved: {
        label: "Selesai",
        class:
          "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      },
      rejected: {
        label: "Ditolak",
        class: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      },
    };
    const statusKey = status?.toLowerCase?.() ?? "";
    const statusInfo = statusMap[statusKey] || {
      label: status,
      class: "bg-gray-100 text-gray-800",
    };
    return <Badge className={statusInfo.class}>{statusInfo.label}</Badge>;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "category_name",
        header: "Kategori",
        cell: ({ row }) => (
          <div className="font-semibold text-gray-900">
            {capitalizeWords(row.getValue("category_name"))}
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Lokasi",
        cell: ({ row }) => {
          const village = row.original.village_name;
          const district = row.original.district_name;
          const location = row.getValue("location");
          return (
            <div
              className="max-w-[120px] md:max-w-[160px] truncate text-gray-700"
              title={`${location}, ${village}, ${district}`}
            >
              {village}, {district}
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Tanggal",
        cell: ({ row }) => {
          const date = row.getValue("created_at");
          return (
            <span className="text-gray-700">
              {format(new Date(date), "dd MMM yyyy", { locale: id })}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.getValue("status")),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail(row.original.report_id);
            }}
            className="hover:bg-gray-100 h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Lihat Detail"
          >
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </Button>
        ),
      },
    ],
    []
  );

  const reports = data?.data || [];
  const hasReports = reports.length > 0;

  const selectedReport = useMemo(() => {
    if (!selectedReportId || !reports.length) return null;
    return reports.find((report) => report.report_id === selectedReportId);
  }, [selectedReportId, reports]);

  const filteredData = useMemo(() => {
    if (!statusFilter || statusFilter.length === 0) return reports;
    return reports.filter((report) =>
      statusFilter.includes(report.status.toLowerCase())
    );
  }, [reports, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const statusOptions = [
    { value: "pending", label: "Menunggu" },
    { value: "in_progress", label: "Diproses" },
    { value: "resolved", label: "Selesai" },
    { value: "rejected", label: "Ditolak" },
  ];

  const toggleStatusFilter = (status) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm">
          <DotLottieReact
            src="https://lottie.host/056b9dd4-994a-4c47-a835-c26008cbef80/lsr0k3YEMS.lottie"
            loop
            autoplay
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mt-6 text-center">
          Gagal Memuat Data
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-md text-sm md:text-base">
          {error?.message ||
            "Terjadi kesalahan saat memuat data laporan Anda. Silakan coba lagi."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10"
          >
            Kembali
          </Button>
          <Button
            onClick={refetch}
            className="bg-[#9DB17C] hover:bg-[#8CA06B] text-white"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
              <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#9DB17C]" />
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#9DB17C]">
                Cek Status Laporan
              </h1>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Memuat data laporan Anda...
            </p>
            <Card className="rounded-lg sm:rounded-xl shadow-md border-0">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">
                  Daftar Laporan
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ReportLoading />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#9DB17C]" />
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#9DB17C]">
                Cek Status Laporan
              </h1>
            </div>
            {hasReports && (
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                className="w-full sm:w-auto rounded-lg border-gray-300 text-xs sm:text-sm"
              >
                <RefreshCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                Refresh Data
              </Button>
            )}
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base lg:text-lg">
            {hasReports
              ? `Anda memiliki ${reports.length} laporan. Lihat status dan detail laporan Anda di bawah ini.`
              : "Anda dapat melacak dan memantau status laporan yang telah Anda buat di halaman ini."}
          </p>
          {hasReports ? (
            <Card className="shadow-lg border-0 rounded-lg sm:rounded-xl lg:rounded-2xl">
              <CardHeader className="pb-2 px-3 sm:px-4 md:px-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl">
                    Daftar Laporan
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-48 md:w-60 lg:w-72">
                      <Search className="absolute left-3 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <Input
                        placeholder="Cari laporan..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-8 sm:pl-9 py-2 h-8 sm:h-9 text-xs sm:text-sm rounded-lg border-gray-300 bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                        >
                          <Filter className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                          Filter Status
                          {statusFilter.length > 0 && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              {statusFilter.length}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 sm:w-48 lg:w-56"
                      >
                        {statusOptions.map((option) => (
                          <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={statusFilter.includes(option.value)}
                            onCheckedChange={() =>
                              toggleStatusFilter(option.value)
                            }
                            className="text-xs sm:text-sm"
                          >
                            {option.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 md:px-6">
                <div className="rounded-lg sm:rounded-xl border bg-white overflow-x-auto">
                  <div className="block lg:hidden">
                    {table.getRowModel().rows?.length ? (
                      <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4">
                        {table.getRowModel().rows.map((row) => (
                          <div
                            key={row.id}
                            className="border rounded-lg p-3 sm:p-4 shadow-sm bg-gray-50 cursor-pointer hover:bg-[#F5F8F2] transition-all duration-200 group"
                            onClick={() =>
                              handleOpenDetail(row.original.report_id)
                            }
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 line-clamp-1">
                                {capitalizeWords(row.getValue("category_name"))}
                              </span>
                              {getStatusBadge(row.getValue("status"))}
                            </div>
                            <div className="text-gray-700 text-xs sm:text-sm mb-1">
                              <span className="font-medium">Lokasi: </span>
                              <span className="line-clamp-1">
                                {row.original.village_name},{" "}
                                {row.original.district_name}
                              </span>
                            </div>
                            <div className="text-gray-700 text-xs sm:text-sm mb-2">
                              <span className="font-medium">Tanggal: </span>
                              {format(
                                new Date(row.getValue("created_at")),
                                "dd MMM yyyy",
                                { locale: id }
                              )}
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDetail(row.original.report_id);
                                }}
                                className="hover:bg-gray-100 h-6 w-6 sm:h-8 sm:w-8 p-0"
                                aria-label="Lihat Detail"
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-gray-500">
                        Tidak ada data yang sesuai dengan filter
                      </div>
                    )}
                  </div>
                  <Table className="min-w-[600px] lg:min-w-0 hidden lg:table">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="font-semibold whitespace-nowrap text-xs sm:text-sm text-gray-700 bg-gray-50"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="cursor-pointer transition-colors hover:bg-[#F5F8F2] group"
                            onClick={() =>
                              handleOpenDetail(row.original.report_id)
                            }
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="whitespace-nowrap text-xs sm:text-sm max-w-[100px] lg:max-w-none overflow-hidden text-ellipsis text-gray-800 group-hover:text-primary py-3"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-20 sm:h-24 text-center text-xs sm:text-sm"
                          >
                            Tidak ada data yang sesuai dengan filter
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row items-center justify-between py-3 sm:py-4">
                  <div className="text-xs sm:text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                    Menampilkan {table.getFilteredRowModel().rows.length} dari{" "}
                    {filteredData.length} laporan
                    {statusFilter.length > 0 && " (difilter)"}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center sm:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="w-1/3 sm:w-auto rounded-lg border-gray-300 py-1 sm:py-1.5 h-7 sm:h-8 text-xs sm:text-sm"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 -ml-0.5" />
                      <span className="hidden sm:inline">Sebelumnya</span>
                      <span className="inline sm:hidden">Prev</span>
                    </Button>
                    <div className="flex items-center gap-1 px-1 sm:px-2 text-xs sm:text-sm">
                      <span className="font-medium">
                        {table.getState().pagination.pageIndex + 1}
                      </span>
                      <span className="text-gray-500">
                        dari {table.getPageCount() || 1}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="w-1/3 sm:w-auto rounded-lg border-gray-300 py-1 sm:py-1.5 h-7 sm:h-8 text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Berikutnya</span>
                      <span className="inline sm:hidden">Next</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 -mr-0.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ReportEmptyState />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full px-2 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 transition-all duration-300",
        navbarBlurred && "filter backdrop-blur-sm"
      )}
    >
      {renderContent()}
      {selectedReport && (
        <ReportDetailDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          report={selectedReport}
        />
      )}
    </div>
  );
}

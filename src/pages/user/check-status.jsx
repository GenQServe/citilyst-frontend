import React, { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ClipboardCheck,
  AlertCircle,
  RefreshCcw,
  Eye,
  Search,
  Filter,
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
              className="max-w-[160px] truncate text-gray-700"
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
            className="hover:bg-gray-100"
            aria-label="Lihat Detail"
          >
            <Eye className="h-5 w-5 text-primary" />
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
      pagination: { pageSize: 10 },
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <ClipboardCheck className="h-10 w-10 text-[#9DB17C]" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                Cek Status Laporan
              </h1>
            </div>
            <p className="text-gray-600 mb-4">Memuat data laporan Anda...</p>
            <Card className="rounded-xl shadow-md border-0">
              <CardHeader className="pb-2">
                <CardTitle>Daftar Laporan</CardTitle>
              </CardHeader>
              <CardContent>
                <ReportLoading />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <ClipboardCheck className="h-10 w-10 text-[#9DB17C]" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                Cek Status Laporan
              </h1>
            </div>
            <Card className="border-red-200 bg-red-50 rounded-xl shadow-md border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700">
                      Gagal memuat data
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {error?.message ||
                        "Terjadi kesalahan saat memuat data laporan Anda"}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={refetch}
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Coba lagi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-10 w-10 text-[#9DB17C]" />
              <h1 className="text-2xl sm:text-3xl font-bold">
                Cek Status Laporan
              </h1>
            </div>
            {hasReports && (
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                className="w-full sm:w-auto rounded-lg border-gray-300"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            )}
          </div>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            {hasReports
              ? `Anda memiliki ${reports.length} laporan. Lihat status dan detail laporan Anda di bawah ini.`
              : "Anda dapat melacak dan memantau status laporan yang telah Anda buat di halaman ini."}
          </p>
          {hasReports ? (
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg sm:text-xl">
                    Daftar Laporan
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Cari laporan..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-10 py-2 rounded-lg border-gray-300 bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="sm:w-auto w-full gap-2"
                        >
                          <Filter className="h-4 w-4" />
                          Filter Status
                          {statusFilter.length > 0 && (
                            <Badge variant="secondary" className="ml-1">
                              {statusFilter.length}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {statusOptions.map((option) => (
                          <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={statusFilter.includes(option.value)}
                            onCheckedChange={() =>
                              toggleStatusFilter(option.value)
                            }
                          >
                            {option.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border bg-white overflow-x-auto">
                  <Table className="min-w-[600px] md:min-w-0">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="font-semibold whitespace-nowrap text-gray-700 bg-gray-50"
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
                            className={cn(
                              "cursor-pointer transition hover:bg-[#F5F8F2] group"
                            )}
                            onClick={() =>
                              handleOpenDetail(row.original.report_id)
                            }
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="whitespace-nowrap max-w-[120px] md:max-w-none overflow-hidden text-ellipsis text-gray-800 group-hover:text-primary"
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
                            className="h-24 text-center"
                          >
                            Tidak ada data yang sesuai dengan filter
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row items-center justify-between py-4">
                  <div className="text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                    Menampilkan {table.getFilteredRowModel().rows.length} dari{" "}
                    {filteredData.length} laporan
                    {statusFilter.length > 0 && " (difilter)"}
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="w-1/2 sm:w-auto rounded-lg border-gray-300"
                    >
                      Sebelumnya
                    </Button>
                    <div className="flex items-center gap-1 px-2">
                      <span className="text-sm font-medium">
                        {table.getState().pagination.pageIndex + 1}
                      </span>
                      <span className="text-sm text-gray-500">
                        dari {table.getPageCount()}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="w-1/2 sm:w-auto rounded-lg border-gray-300"
                    >
                      Berikutnya
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
        "container py-6 px-2 sm:py-10 sm:px-4 md:px-6 transition-all duration-300 max-w-full mx-auto",
        navbarBlurred && "filter backdrop-blur-sm"
      )}
    >
      {renderContent()}
      <ReportDetailDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        report={selectedReport}
      />
    </div>
  );
}

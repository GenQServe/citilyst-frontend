import React, { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ClipboardCheck,
  AlertCircle,
  RefreshCcw,
  Eye,
  Search,
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

export default function CheckStatusPage() {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [navbarBlurred, setNavbarBlurred] = useState(false);
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

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        label: "Menunggu",
        class: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      in_progress: {
        label: "Diproses",
        class: "bg-blue-100 text-blue-800 border-blue-200",
      },
      inprogress: {
        label: "Diproses",
        class: "bg-blue-100 text-blue-800 border-blue-200",
      },
      resolved: {
        label: "Selesai",
        class: "bg-green-100 text-green-800 border-green-200",
      },
      rejected: {
        label: "Ditolak",
        class: "bg-red-100 text-red-800 border-red-200",
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
          <div className="font-medium">{row.getValue("category_name")}</div>
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
              className="max-w-[200px] truncate"
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
          return format(new Date(date), "dd MMM yyyy", { locale: id });
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
          >
            <Eye className="h-4 w-4" />
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

  const table = useReactTable({
    data: reports,
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <ClipboardCheck className="h-8 w-8 text-[#9DB17C]" />
              <h1 className="text-3xl font-bold">Cek Status Laporan</h1>
            </div>
            <p className="text-gray-600 mb-4">Memuat data laporan Anda...</p>
            <Card>
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
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <ClipboardCheck className="h-8 w-8 text-[#9DB17C]" />
              <h1 className="text-3xl font-bold">Cek Status Laporan</h1>
            </div>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">
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
                      <RefreshCcw className="h-3.5 w-3.5 mr-2" />
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
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-8 w-8 text-[#9DB17C]" />
              <h1 className="text-3xl font-bold">Cek Status Laporan</h1>
            </div>
            {hasReports && (
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                className="w-full sm:w-auto"
              >
                <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                Refresh Data
              </Button>
            )}
          </div>
          <p className="text-gray-600 mb-6">
            {hasReports
              ? `Anda memiliki ${reports.length} laporan. Lihat status dan detail laporan Anda di bawah ini.`
              : "Anda dapat melacak dan memantau status laporan yang telah Anda buat di halaman ini."}
          </p>
          {hasReports ? (
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <CardTitle>Daftar Laporan</CardTitle>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Cari laporan..."
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="pl-8 bg-white"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-white overflow-x-auto">
                  <Table className="min-w-[600px] md:min-w-0">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="font-semibold whitespace-nowrap"
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
                              "cursor-pointer",
                              "hover:bg-[#F5F8F2]"
                            )}
                            onClick={() =>
                              handleOpenDetail(row.original.report_id)
                            }
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="whitespace-nowrap max-w-[120px] md:max-w-none overflow-hidden text-ellipsis"
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
                            Tidak ada data yang sesuai dengan pencarian
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 py-4">
                  <div className="text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                    Menampilkan {table.getFilteredRowModel().rows.length} dari{" "}
                    {reports.length} laporan
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="w-1/2 sm:w-auto"
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="w-1/2 sm:w-auto"
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
        "container py-6 px-1 sm:py-10 sm:px-4 md:px-6 transition-all duration-300 max-w-full mx-auto",
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

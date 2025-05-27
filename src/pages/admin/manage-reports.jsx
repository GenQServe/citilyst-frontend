import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Loader2,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllReports, useUpdateReport } from "@/hooks/use-manage-report";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManageReports = () => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useGetAllReports();
  const updateReportMutation = useUpdateReport();

  const getStatusDisplay = (status) => {
    if (!status) return "-";

    status = status.toLowerCase();

    if (status === "pending") return "Menunggu";
    if (status === "in_progress" || status === "inprogress") return "Diproses";
    if (status === "resolved") return "Selesai";
    if (status === "rejected") return "Ditolak";

    return status;
  };

  const getStatusClass = (status) => {
    if (!status) return "";

    status = status.toLowerCase();

    if (status === "pending")
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status === "in_progress" || status === "inprogress")
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (status === "resolved")
      return "bg-green-100 text-green-800 border-green-200";
    if (status === "rejected") return "bg-red-100 text-red-800 border-red-200";

    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredReports = useMemo(() => {
    if (!data?.data) return [];

    const query = searchQuery.toLowerCase();
    return data.data.filter(
      (report) =>
        report.category_name?.toLowerCase().includes(query) ||
        report.district_name?.toLowerCase().includes(query) ||
        report.village_name?.toLowerCase().includes(query) ||
        getStatusDisplay(report.status).toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "created_at",
        header: "Tanggal",
        cell: ({ row }) => {
          const date = new Date(row.original.created_at);
          return format(date, "dd MMM yy", { locale: id });
        },
      },
      {
        accessorKey: "category_name",
        header: "Kategori",
        cell: ({ row }) => (
          <div className="max-w-[100px] xs:max-w-[120px] md:max-w-none truncate">
            {row.original.category_name || "-"}
          </div>
        ),
      },
      {
        accessorKey: "district_name",
        header: "Kecamatan",
        cell: ({ row }) => (
          <div className="hidden sm:block max-w-[120px] lg:max-w-none truncate">
            {row.original.district_name || "-"}
          </div>
        ),
      },
      {
        accessorKey: "feedback",
        header: "Umpan Balik",
        cell: ({ row }) => (
          <div className="hidden md:block max-w-[150px] lg:max-w-[200px] truncate">
            {row.original.feedback || "-"}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              className={`text-[10px] xs:text-xs sm:text-sm ${getStatusClass(
                status
              )}`}
            >
              {getStatusDisplay(status)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const report = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                  <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[140px] sm:w-[160px]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(report.user);
                    setUserDetailsOpen(true);
                  }}
                  className="cursor-pointer text-xs sm:text-sm"
                >
                  <Eye className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Lihat Pelapor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedReport(report);
                    let statusValue = report.status.toLowerCase();
                    if (statusValue === "in_progress") {
                      statusValue = "inprogress";
                    }
                    setStatus(statusValue);
                    setFeedback(report.feedback || "");
                    setUpdateStatusOpen(true);
                  }}
                  className="cursor-pointer text-xs sm:text-sm"
                >
                  <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Update Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const downloadFile = (url, filename) => {
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", filename || "laporan.pdf");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    };

                    if (report.file_url) {
                      downloadFile(report.file_url, `Laporan-${report.id}.pdf`);
                      toast.success("Mengunduh dokumen laporan");
                    } else {
                      toast.error("URL dokumen tidak tersedia");
                    }
                  }}
                  className="cursor-pointer text-xs sm:text-sm"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Unduh Dokumen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
  });

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    try {
      const formattedStatus = status.toUpperCase();

      await updateReportMutation.mutateAsync({
        reportId: selectedReport.id,
        data: {
          user_id: selectedReport.user_id,
          status: formattedStatus,
          feedback: feedback || "",
        },
      });

      setUpdateStatusOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <p className="text-red-500 text-base sm:text-xl mb-4">
          Gagal memuat data laporan
        </p>
        <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-3">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
          Kelola Laporan
        </h1>
      </div>

      <Card>
        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3">
          <CardTitle className="text-base md:text-lg lg:text-xl">
            Daftar Laporan Warga
          </CardTitle>
          <div className="flex w-full">
            <div className="relative w-full">
              <Search className="absolute left-2 sm:left-2.5 top-2 sm:top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari laporan..."
                className="w-full h-7 sm:h-9 pl-6 sm:pl-8 text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:px-2 md:px-4 lg:px-6">
          <div className="overflow-x-auto">
            <div className="rounded-md border min-w-full inline-block">
              <Table>
                <TableHeader>
                  {isLoading ? (
                    <TableRow>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3">
                        <Skeleton className="h-4 w-16" />
                      </TableHead>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3">
                        <Skeleton className="h-4 w-20" />
                      </TableHead>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3 hidden sm:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3 hidden md:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3">
                        <Skeleton className="h-4 w-16" />
                      </TableHead>
                      <TableHead className="px-2 py-2 sm:px-3 sm:py-3">
                        <Skeleton className="h-4 w-8" />
                      </TableHead>
                    </TableRow>
                  ) : (
                    table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className={`px-2 py-2 sm:px-3 sm:py-3 text-[10px] xs:text-xs sm:text-sm ${
                              header.column.id === "district_name"
                                ? "hidden sm:table-cell"
                                : header.column.id === "feedback"
                                ? "hidden md:table-cell"
                                : ""
                            }`}
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
                    ))
                  )}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <TableRow key={`skeleton-${index}`}>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                            <Skeleton className="h-4 w-12 sm:w-16" />
                          </TableCell>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                            <Skeleton className="h-4 w-20 sm:w-28" />
                          </TableCell>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3 hidden sm:table-cell">
                            <Skeleton className="h-4 w-24 sm:w-32" />
                          </TableCell>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3 hidden md:table-cell">
                            <Skeleton className="h-4 w-32 sm:w-40" />
                          </TableCell>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                            <Skeleton className="h-5 w-16 rounded-full" />
                          </TableCell>
                          <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="text-[10px] xs:text-xs sm:text-sm"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={`px-2 py-2 sm:px-3 sm:py-3 ${
                              cell.column.id === "district_name"
                                ? "hidden sm:table-cell"
                                : cell.column.id === "feedback"
                                ? "hidden md:table-cell"
                                : ""
                            }`}
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
                        className="h-16 sm:h-24 text-center text-xs sm:text-sm"
                      >
                        Tidak ada data laporan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-4 p-3 sm:p-4 md:p-6">
          {isLoading ? (
            <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ) : (
            <>
              <div className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
                Total {filteredReports.length} laporan
              </div>
              <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 lg:gap-6 w-full xs:w-auto">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <p className="text-[10px] xs:text-xs sm:text-sm font-medium hidden xs:block whitespace-nowrap">
                    Rows per page
                  </p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-6 sm:h-8 w-16 md:w-18 text-[10px] xs:text-xs sm:text-sm">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem
                          key={pageSize}
                          value={`${pageSize}`}
                          className="text-xs sm:text-sm"
                        >
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-full xs:w-auto justify-between sm:justify-center">
                  <div className="flex items-center text-[10px] xs:text-xs sm:text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      className="hidden lg:flex h-6 sm:h-8 w-12 sm:w-16 p-0 items-center justify-center gap-1"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-[10px] xs:text-xs">First</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-6 sm:h-8 w-6 sm:w-8 p-0 flex items-center justify-center"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>

                    <div className="hidden xs:flex">
                      {Array.from({
                        length: Math.min(3, table.getPageCount()),
                      }).map((_, i) => {
                        const pageIndex =
                          i +
                          Math.max(
                            0,
                            Math.min(
                              table.getPageCount() - 3,
                              table.getState().pagination.pageIndex - 1
                            )
                          );
                        return (
                          <Button
                            key={pageIndex}
                            variant={
                              pageIndex ===
                              table.getState().pagination.pageIndex
                                ? "default"
                                : "outline"
                            }
                            className="h-6 sm:h-8 w-6 sm:w-8 p-0 text-[10px] sm:text-xs"
                            onClick={() => table.setPageIndex(pageIndex)}
                          >
                            {pageIndex + 1}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      className="h-6 sm:h-8 w-6 sm:w-8 p-0 flex items-center justify-center"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="hidden lg:flex h-6 sm:h-8 w-12 sm:w-16 p-0 items-center justify-center gap-1"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="text-[10px] xs:text-xs">Last</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardFooter>
      </Card>

      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-md max-w-[92%] p-4 sm:p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-xl font-semibold text-green-800">
              Detail Pelapor
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-600">
              Informasi lengkap tentang pelapor dari laporan yang dipilih.
            </DialogDescription>
          </DialogHeader>
          {selectedUser ? (
            <div className="space-y-4 sm:space-y-5 my-1 sm:my-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50/50 rounded-lg border border-green-100">
                <div className="space-y-1">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    ID
                  </Label>
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {selectedUser.id}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    NIK
                  </Label>
                  <p className="text-xs sm:text-sm font-medium">
                    {selectedUser.nik || "-"}
                  </p>
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    Nama Lengkap
                  </Label>
                  <p className="text-xs sm:text-sm font-semibold">
                    {selectedUser.name || "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    Email
                  </Label>
                  <p className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 bg-gray-50 rounded-md break-words">
                    {selectedUser.email || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    No. Telepon
                  </Label>
                  <p className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 bg-gray-50 rounded-md">
                    {selectedUser.phone_number || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] xs:text-xs text-gray-500 font-medium">
                    Alamat
                  </Label>
                  <p className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 bg-gray-50 rounded-md whitespace-pre-line">
                    {selectedUser.address || "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-end justify-center">
            <Button
              onClick={() => setUserDetailsOpen(false)}
              className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm h-8 sm:h-9"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={updateStatusOpen} onOpenChange={setUpdateStatusOpen}>
        <DialogContent className="sm:max-w-md max-w-[92%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              Update Status Laporan
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Perbarui status dan berikan umpan balik untuk laporan ini.
            </DialogDescription>
          </DialogHeader>
          {selectedReport ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="status" className="text-xs sm:text-sm">
                  Status Laporan
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full h-8 sm:h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" className="text-xs sm:text-sm">
                      Menunggu
                    </SelectItem>
                    <SelectItem
                      value="inprogress"
                      className="text-xs sm:text-sm"
                    >
                      Diproses
                    </SelectItem>
                    <SelectItem value="resolved" className="text-xs sm:text-sm">
                      Selesai
                    </SelectItem>
                    <SelectItem value="rejected" className="text-xs sm:text-sm">
                      Ditolak
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="feedback" className="text-xs sm:text-sm">
                  Umpan Balik
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Berikan umpan balik untuk pelapor..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setUpdateStatusOpen(false)}
              className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
            >
              Batal
            </Button>
            <Button
              onClick={handleUpdateReport}
              disabled={updateReportMutation.isPending}
              className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
            >
              {updateReportMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageReports;

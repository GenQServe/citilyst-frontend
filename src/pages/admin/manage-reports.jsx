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
  TableRow 
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

  // Helper function to handle status display
  const getStatusDisplay = (status) => {
    if (!status) return "-";
    
    status = status.toLowerCase();
    
    if (status === "pending") return "Menunggu";
    if (status === "in_progress" || status === "inprogress") return "Diproses";
    if (status === "resolved") return "Selesai";
    if (status === "rejected") return "Ditolak";
    
    return status; // Return original if no match
  };
  
  // Helper function to get status CSS class
  const getStatusClass = (status) => {
    if (!status) return "";
    
    status = status.toLowerCase();
    
    if (status === "pending") 
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status === "in_progress" || status === "inprogress") 
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (status === "resolved") 
      return "bg-green-100 text-green-800 border-green-200";
    if (status === "rejected") 
      return "bg-red-100 text-red-800 border-red-200";
    
    return "bg-gray-100 text-gray-800 border-gray-200"; // Default
  };

  const filteredReports = useMemo(() => {
    if (!data?.data) return [];
    
    const query = searchQuery.toLowerCase();
    return data.data.filter(report => 
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
          return format(date, "dd MMMM yyyy", { locale: id });
        },
      },
      {
        accessorKey: "category_name",
        header: "Kategori",
      },
      {
        accessorKey: "district_name",
        header: "Kecamatan",
      },
      {
        accessorKey: "feedback",
        header: "Umpan Balik",
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">
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
            <Badge className={getStatusClass(status)}>
              {getStatusDisplay(status)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          const report = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(report.user);
                    setUserDetailsOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Lihat Pelapor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedReport(report);
                    // Handle different status formats
                    let statusValue = report.status.toLowerCase();
                    // Convert in_progress to inprogress for UI
                    if (statusValue === "in_progress") {
                      statusValue = "inprogress";
                    }
                    setStatus(statusValue);
                    setFeedback(report.feedback || "");
                    setUpdateStatusOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Update Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const downloadFile = (url, filename) => {
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', filename || 'laporan.pdf');
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
                  className="cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4" />
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
      // Convert UI status to uppercase for internal processing
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
      // Error handling is done in the mutation hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-xl text-gray-500">Memuat data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <p className="text-red-500 text-xl mb-4">Gagal memuat data laporan</p>
        <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kelola Laporan</h1>
        <div className="flex items-center gap-2">
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <CardTitle className="text-lg md:text-xl">Daftar Laporan Warga</CardTitle>
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari laporan..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                      Tidak ada data laporan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total {filteredReports.length} laporan
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-20 p-0 lg:flex items-center justify-center gap-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">First</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 flex items-center justify-center"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Page number buttons - show up to 3 pages */}
            {Array.from({ length: Math.min(3, table.getPageCount()) }).map((_, i) => {
              const pageIndex = i + Math.max(0, 
                Math.min(
                  table.getPageCount() - 3,
                  table.getState().pagination.pageIndex - 1
                )
              );
              return (
                <Button
                  key={pageIndex}
                  variant={pageIndex === table.getState().pagination.pageIndex ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              className="h-8 w-8 p-0 flex items-center justify-center"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-20 p-0 lg:flex items-center justify-center gap-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="text-xs">Last</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-green-800">Detail Pelapor</DialogTitle>
            <DialogDescription className="text-gray-600">
              Informasi lengkap tentang pelapor dari laporan yang dipilih.
            </DialogDescription>
          </DialogHeader>
          {selectedUser ? (
            <div className="space-y-5 my-2">
              <div className="grid grid-cols-2 gap-4 p-4 bg-green-50/50 rounded-lg border border-green-100">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 font-medium">ID</Label>
                  <p className="text-sm font-medium truncate">{selectedUser.id}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 font-medium">NIK</Label>
                  <p className="text-sm font-medium">{selectedUser.nik || "-"}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs text-gray-500 font-medium">Nama Lengkap</Label>
                  <p className="text-sm font-semibold">{selectedUser.name || "-"}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 font-medium">Email</Label>
                  <p className="text-sm px-3 py-2 bg-gray-50 rounded-md">{selectedUser.email || "-"}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 font-medium">No. Telepon</Label>
                  <p className="text-sm px-3 py-2 bg-gray-50 rounded-md">{selectedUser.phone_number || "-"}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 font-medium">Alamat</Label>
                  <p className="text-sm px-3 py-2 bg-gray-50 rounded-md whitespace-pre-line">{selectedUser.address || "-"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Memuat data pelapor...</p>
            </div>
          )}
          <DialogFooter>
            <Button 
              onClick={() => setUserDetailsOpen(false)}
              className="bg-green-600 hover:bg-green-700"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={updateStatusOpen} onOpenChange={setUpdateStatusOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status Laporan</DialogTitle>
            <DialogDescription>
              Perbarui status dan berikan umpan balik untuk laporan ini.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status Laporan</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="inprogress">Diproses</SelectItem>
                    <SelectItem value="resolved">Selesai</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Umpan Balik</Label>
                <Textarea
                  id="feedback"
                  placeholder="Berikan umpan balik untuk pelapor..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateStatusOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleUpdateReport}
              disabled={updateReportMutation.isPending}
            >
              {updateReportMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
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
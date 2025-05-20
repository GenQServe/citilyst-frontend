import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Kelola Laporan</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Laporan Warga</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Implement your report management UI here */}
          <p>Konten pengelolaan laporan akan ditampilkan di sini</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageReports; // Make sure this line is present
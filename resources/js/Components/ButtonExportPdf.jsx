import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendanceReportPdf from "./pdf/AttendanceReportPdf";

export default function ButtonExportPdf({ attendance = [] }) {
  return (
    <PDFDownloadLink
      document={<AttendanceReportPdf attendance={attendance} />}
      fileName="attendance-report.pdf"
      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
    >
      {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
    </PDFDownloadLink>
  );
}

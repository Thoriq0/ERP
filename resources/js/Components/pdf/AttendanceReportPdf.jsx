// components/pdf/AttendanceReportPdf.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";


// Styling
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 10,
    borderBottom: "1 solid black",
    paddingBottom: 10,
  },
  logoAndTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
  },
  kopText: {
    textAlign: "left",
    flex: 1,
  },
  instansi: {
    fontSize: 14,
    fontWeight: "bold",
  },
  alamat: {
    fontSize: 10,
  },
  title: {
    fontSize: 12,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid black",
    backgroundColor: "#eee",
    fontWeight: "bold",
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
});

export default function AttendanceReportPdf({ attendance, downloadDate }) {
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* KOP SURAT */}
        <View style={styles.header}>
          <View style={styles.logoAndTitle}>
            <Image  style={styles.logo} />
            <View style={styles.kopText}>
              <Text style={styles.instansi}>PT. Global Edutech Solusindo</Text>
              <Text style={styles.alamat}>Komplek Villa Pamulang Blok CH 8 No.35 RT 08 RW 17 Kel. Bakti Jaya, Kec. Setu Tangerang Selatan 15315</Text>
              <Text style={styles.alamat}>Telp: (021) 7477 5750 | Email: info@gets.co.id</Text>
            </View>
          </View>
        </View>

        {/* Judul Laporan */}
        <Text style={styles.title}>Laporan Absensi Karyawan</Text>

        {/* Tabel */}
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Role</Text>
          <Text style={styles.cell}>Date</Text>
          <Text style={styles.cell}>In</Text>
          <Text style={styles.cell}>Out</Text>
        </View>

        {attendance.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.role}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.in}</Text>
            <Text style={styles.cell}>{item.out}</Text>
          </View>
        ))}

        {/* Tanda Tangan */}
        <View style={{ marginTop: 30, alignItems: "flex-end" }}>
          <Text style={{ marginBottom: 40 }}>Tangerang Selatan, {formatDate(downloadDate)}</Text>
          <Text style={{ marginBottom: 4 }}>Hormat Kami,</Text>
          <Text style={{ marginBottom: 60 }}>HR PT. Global Edutech Solusindo</Text>
          <Text>_________________________</Text>
        </View>
      </Page>
    </Document>
  );
}


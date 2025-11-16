import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 30,
    lineHeight: 1.6,
    flexDirection: "column",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBlock: {
    width: "48%",
    border: "1px solid #ccc",
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  table: {
    marginTop: 20,
    border: "1px solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "2px solid #000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
  },
  col1: { width: "40%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "center" },
  col4: { width: "20%", textAlign: "right" },
  summary: {
    marginTop: 20,
    border: "1px solid #ccc",
    padding: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

const InvoicePDF = ({ formData = {} }) => {
  console.log("📄 INVOICE PDF - Received formData:", formData);
  
  const {
    invoiceNumber = "",
    date = "",
    dueDate = "",
    paymentTerms = "",
    companyInfo = {},
    clientInfo = {},
    lineItems = [],
    subtotal = 0,
    discount = 0,
    tax = 0,
    shipping = 0,
    total = 0,
    amountPaid = 0,
    balanceDue = 0,
    notes = "",
    terms = "",
    currency = "INR",
  } = formData;
  
  console.log("📄 INVOICE PDF - Extracted Values:");
  console.log("  - Discount:", discount);
  console.log("  - Tax:", tax);
  console.log("  - Subtotal:", subtotal);
  console.log("  - Total:", total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>SWIFT-INVOICE #{invoiceNumber}</Text>
        <Text style={styles.subHeader}>
          Date: {date} | Payment Terms: {paymentTerms} | Due Date: {dueDate} | PO Number: N/A | Currency: {currency}
        </Text>

        <View style={styles.section}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Issued By</Text>
            <Text style={styles.text}>Name: {companyInfo.name || ""}</Text>
            <Text style={styles.text}>Address: {companyInfo.address || ""}</Text>
            <Text style={styles.text}>Email: {companyInfo.email || ""}</Text>
            <Text style={styles.text}>Phone: {companyInfo.phone || ""}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Issued To</Text>
            <Text style={styles.text}>Name: {clientInfo.name || ""}</Text>
            <Text style={styles.text}>Address: {clientInfo.address || ""}</Text>
            <Text style={styles.text}>Email: {clientInfo.email || ""}</Text>
            <Text style={styles.text}>Phone: {clientInfo.phone || ""}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.label]}>Item</Text>
            <Text style={[styles.col2, styles.label]}>Quantity</Text>
            <Text style={[styles.col3, styles.label]}>Price</Text>
            <Text style={[styles.col4, styles.label]}>Total</Text>
          </View>
          {lineItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.itemName}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{Number(item.price || 0).toFixed(2)}</Text>
              <Text style={styles.col4}>{Number(item.total || 0).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Notes</Text>
            <Text>{notes}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Terms</Text>
            <Text>{terms}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>{Number(subtotal || 0).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount ({Number(discount || 0)}%):</Text>
            <Text>{(Number(subtotal || 0) * Number(discount || 0) / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Tax ({Number(tax || 0)}%):</Text>
            <Text>{(Number(subtotal || 0) * Number(tax || 0) / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Shipping:</Text>
            <Text>{Number(shipping || 0).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.label}>{Number(total || 0).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Amount Paid:</Text>
            <Text>{Number(amountPaid || 0).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Balance Due:</Text>
            <Text style={styles.label}>{Number(balanceDue || 0).toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
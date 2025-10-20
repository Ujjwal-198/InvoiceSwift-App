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
  const {
    invoiceNumber = "2",
    date = "2025-10-19",
    dueDate = "2025-10-15",
    companyInfo = {},
    clientInfo = {},
    lineItems = [{ itemName: "Item 99", quantity: 8, price: 2.50, total: 20.00 }],
    subtotal = 20.00,
    discount = 0,
    tax = 0,
    shipping = 0,
    total = 20.00,
    amountPaid = 0,
    balanceDue = 20.00,
    notes = "N/A",
    terms = "N/A",
  } = formData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>SWIFT-INVOICE #{invoiceNumber}</Text>
        <Text style={styles.subHeader}>
          Date: {date} | Payment Terms: {terms} | Due Date: {dueDate} | PO Number: N/A | Currency: INR
        </Text>

        <View style={styles.section}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Issued By</Text>
            <Text style={styles.text}>Name: {companyInfo.name || "Something"}</Text>
            <Text style={styles.text}>Address: {companyInfo.address || "ABC street 123"}</Text>
            <Text style={styles.text}>Email: {companyInfo.email || "example@email.com"}</Text>
            <Text style={styles.text}>Phone: {companyInfo.phone || "8744814775"}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Issued To</Text>
            <Text style={styles.text}>Name: {clientInfo.name || "Something"}</Text>
            <Text style={styles.text}>Address: {clientInfo.address || "XYZ street 123"}</Text>
            <Text style={styles.text}>Email: {clientInfo.email || "example@email.com"}</Text>
            <Text style={styles.text}>Phone: {clientInfo.phone || "1234567890"}</Text>
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
              <Text style={styles.col3}>{item.price.toFixed(2)}</Text>
              <Text style={styles.col4}>{item.total.toFixed(2)}</Text>
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
            <Text>{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount (0%):</Text>
            <Text>{(subtotal * discount / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Tax (0%):</Text>
            <Text>{(subtotal * tax / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Shipping:</Text>
            <Text>{shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.label}>{total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Amount Paid:</Text>
            <Text>{amountPaid.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Balance Due:</Text>
            <Text style={styles.label}>{balanceDue.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import logo from "../assets/images/teacher.png";

const styles = StyleSheet.create({

  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#123d91",
    paddingBottom: 12,
    marginBottom: 18,
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  institute: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#123d91",
  },

  subtitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 2,
  },

  receiptBox: {
    borderWidth: 1,
    borderColor: "#123d91",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    minWidth: 120,
  },

  receiptLabel: {
    fontSize: 8,
    color: "#64748b",
  },

  receiptNo: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "bold",
    color: "#123d91",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#123d91",
    marginBottom: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  card: {
    width: "48.5%",
    borderWidth: 1,
    borderColor: "#dbe4ef",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#fafafa",
  },

  label: {
    fontSize: 8,
    color: "#64748b",
  },

  value: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },

});
export default function FeeReceiptPDF({ fee }) {

  return (

    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        {/* Header */}

        <View style={styles.header}>

          <View style={styles.leftHeader}>

            <Image
              src={logo}
              style={styles.logo}
            />

            <View>

              <Text style={styles.institute}>

                MANTHAN NOVA

              </Text>

              <Text style={styles.subtitle}>

                Coaching Institute

              </Text>

              <Text style={styles.subtitle}>

                East College Para, Raniganj, West Bengal

              </Text>

            </View>

          </View>

          <View style={styles.receiptBox}>

            <Text style={styles.receiptLabel}>

              FEE RECEIPT

            </Text>

            <Text style={styles.receiptNo}>

              {fee.receiptNo || fee.id.slice(0, 8).toUpperCase()}

            </Text>

          </View>

        </View>

        {/* Student Details */}

        <Text style={styles.sectionTitle}>

          Student Details

        </Text>

        <View style={styles.grid}>

          <View style={styles.card}>

            <Text style={styles.label}>

              Student Name

            </Text>

            <Text style={styles.value}>

              {fee.studentName}

            </Text>

          </View>

          <View style={styles.card}>

            <Text style={styles.label}>

              Class

            </Text>

            <Text style={styles.value}>

              {fee.class}

            </Text>

          </View>

          <View style={styles.card}>

            <Text style={styles.label}>

              Board

            </Text>

            <Text style={styles.value}>

              {fee.board || "--"}

            </Text>

          </View>

          <View style={styles.card}>

            <Text style={styles.label}>

              Month

            </Text>

            <Text style={styles.value}>

              {fee.month} {fee.year}

            </Text>

          </View>

        </View>
                {/* Payment Details */}

        <Text style={styles.sectionTitle}>

          Payment Details

        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#dbe4ef",
            borderRadius: 6,
            marginBottom: 14,
          }}
        >

          {[
            ["Payment Mode", fee.paymentMode || "--"],
            [
              "Payment Date",
              fee.paymentDate?.toDate
                ? fee.paymentDate
                    .toDate()
                    .toLocaleDateString()
                : "--",
            ],
            ["Status", fee.status],
          ].map(([label, value], index) => (

            <View
              key={label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderBottomWidth:
                  index !== 2 ? 1 : 0,
                borderBottomColor:
                  "#e5e7eb",
              }}
            >

              <Text
                style={{
                  color: "#64748b",
                }}
              >

                {label}

              </Text>

              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    label === "Status"
                      ? fee.status === "Paid"
                        ? "#16a34a"
                        : fee.status ===
                          "Partial"
                        ? "#ca8a04"
                        : "#dc2626"
                      : "#111827",
                }}
              >

                {value}

              </Text>

            </View>

          ))}

        </View>

        {/* Fee Summary */}

        <Text style={styles.sectionTitle}>

          Fee Summary

        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#dbe4ef",
            borderRadius: 6,
            marginBottom: 14,
          }}
        >

          {[
            [
              "Total Fee",
              `₹ ${Number(
                fee.totalAmount
              ).toLocaleString()}`,
            ],
            [
              "Amount Paid",
              `₹ ${Number(
                fee.paidAmount
              ).toLocaleString()}`,
            ],
            [
              "Due Amount",
              `₹ ${Number(
                fee.dueAmount
              ).toLocaleString()}`,
            ],
          ].map(([label, value], index) => (

            <View
              key={label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderBottomWidth:
                  index !== 2 ? 1 : 0,
                borderBottomColor:
                  "#e5e7eb",
              }}
            >

              <Text
                style={{
                  fontWeight: "bold",
                }}
              >

                {label}

              </Text>

              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    label === "Amount Paid"
                      ? "#16a34a"
                      : label === "Due Amount"
                      ? "#dc2626"
                      : "#111827",
                }}
              >

                {value}

              </Text>

            </View>

          ))}

        </View>
                {/* Remarks */}

        <Text style={styles.sectionTitle}>

          Remarks

        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#dbe4ef",
            borderRadius: 6,
            padding: 10,
            marginBottom: 18,
            backgroundColor: "#fafafa",
          }}
        >

          <Text
            style={{
              fontSize: 10,
              color: "#334155",
            }}
          >

            {fee.remarks || "No remarks."}

          </Text>

        </View>

        {/* Declaration */}

        <View
          style={{
            backgroundColor: "#eff6ff",
            borderWidth: 1,
            borderColor: "#bfdbfe",
            borderRadius: 6,
            padding: 10,
            marginBottom: 22,
          }}
        >

          <Text
            style={{
              fontSize: 9,
              color: "#1e3a8a",
              lineHeight: 1.5,
            }}
          >

            This is a computer-generated fee receipt issued by
            Manthan Nova Coaching Institute. No physical
            signature is required for verification.

          </Text>

        </View>

        {/* Signature */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >

          <View
            style={{
              width: 170,
              alignItems: "center",
            }}
          >

            <View
              style={{
                width: "100%",
                borderTopWidth: 1,
                borderTopColor: "#64748b",
              }}
            />

            <Text
              style={{
                marginTop: 6,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >

              Authorized Signature

            </Text>

          </View>

        </View>
                {/* Footer */}

        <View
          style={{
            marginTop: 25,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#dbe4ef",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#123d91",
            }}
          >

            Thank You For Your Payment

          </Text>

          <Text
            style={{
              marginTop: 4,
              fontSize: 9,
              color: "#64748b",
              textAlign: "center",
            }}
          >

            We appreciate your trust in Manthan Nova Coaching Institute.
            Please keep this receipt for future reference.

          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 8,
              color: "#94a3b8",
            }}
          >

            www.manthannova.in • support@manthannova.in

          </Text>

          <Text
            style={{
              marginTop: 3,
              fontSize: 8,
              color: "#94a3b8",
            }}
          >

            © {new Date().getFullYear()} Manthan Nova Coaching Institute

          </Text>

        </View>
              </Page>

    </Document>

  );

}
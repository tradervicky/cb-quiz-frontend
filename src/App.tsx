// import React from "react";
// import CustomTable from "./components/custom/CustomTable";
import { Toaster } from "sonner";
import PageRoutes from "./routes/routes";

const App = () => {
  // interface InvoiceData {
  //   invoice: string;
  //   paymentStatus: string;
  //   paymentMethod: string;
  //   totalAmount: string;
  // }

  // const headerData: { title: string; key: keyof InvoiceData }[] = [
  //   { title: "Invoice", key: "invoice" },
  //   { title: "Status", key: "paymentStatus" },
  //   { title: "Method", key: "paymentMethod" },
  //   { title: "Amount", key: "totalAmount" },
  // ];

  // const rowsData: InvoiceData[] = [
  //   { invoice: "INV001", paymentStatus: "Paid", paymentMethod: "Credit Card", totalAmount: "$500.00" },
  //   // More data can be added here
  // ];

  return (
    <div >
       <Toaster />
      <PageRoutes />
      {/* <CustomTable<InvoiceData> headerData={headerData} rowsData={rowsData} /> */}
    </div>
  );
};

export default App;

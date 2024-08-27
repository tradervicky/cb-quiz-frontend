import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomTableProps<T> {
  rowsData: T[];
  headerData: { title: string; key: keyof T; style?: string }[];
  tableRef?: React.Ref<HTMLTableElement>;
}

const CustomTable = <T,>({ rowsData, headerData, tableRef }: CustomTableProps<T>) => {
  return (
    <Table ref={tableRef}>
      <TableHeader>
        <TableRow>
          {headerData.map((data) => (
            <TableHead key={String(data.key)} className={data.style}>
              {data.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowsData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {headerData.map((data) => (
              <TableCell key={String(data.key)}>
                {row[data.key] as React.ReactNode}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;

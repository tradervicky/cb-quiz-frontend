import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CustomTableProps } from "interfaces/global"



const CustomTable:React.FC<CustomTableProps> = ({rowsData, headerData}) => {
  return (
    <Table>
 
    <TableHeader>
    <TableRow>
        {headerData?.map((data)=>
        <TableHead className={`${data.style}`}>{data.title}</TableHead>
      )}
      </TableRow>
    </TableHeader>
    <TableBody>
      {rowsData?.map((invoice) => (
        <TableRow key={invoice.invoice}>
          <TableCell className="font-medium">{invoice.invoice}</TableCell>
          <TableCell>{invoice.paymentStatus}</TableCell>
          <TableCell>{invoice.paymentMethod}</TableCell>
          <TableCell className="text-right">{invoice.totalAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    
  </Table>
  )
}

export default CustomTable
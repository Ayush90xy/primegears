import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { useContext } from "react";
import IdContext from "../../context/idContext";

const List = ({sent}) => {
  
  const passContext=useContext(IdContext);

  const useRow=[
  {
    id:"lkvlebv",
    invoiceNo:1,
    customerName:"Navin Singh",
    soldDate:new Date().getTime(),
    totalPrice:4500,
    productDetails:"http://localhost:3000/transactions/6789709"
  },
  {
    id:"lkv3r2bv",
    invoiceNo:2,
    customerName:"Bijendar",
    soldDate:new Date().getTime(),
    totalPrice:400,
    productDetails:"http://localhost:3000/transactions/6789"
  },
  {
    id:"2352346v",
    invoiceNo:3,
    customerName:"Ayush Singh",
    soldDate:new Date().getTime(),
    totalPrice:3500,
    productDetails:"http://localhost:3000/transactions/26789"
  },
  {
    id:"l12334v",
    invoiceNo:4,
    customerName:"Suraj Dev Singh",
    soldDate:new Date().getTime(),
    totalPrice:1200,
    productDetails:"http://localhost:3000/transactions/116789"
  },
  {
    id:"#4ru0",
    invoiceNo:5,
    customerName:"Vikash Singh",
    soldDate:new Date().getTime(),
    totalPrice:4500,
    productDetails:"http://localhost:3000/transactions/26789"
  },
  {
    id:"1223vlebv",
    invoiceNo:6,
    customerName:"Shiv Kumar",
    soldDate:new Date().getTime(),
    totalPrice:1200,
    productDetails:"http://localhost:3000/transactions/67890"
  },
  {
    id:"12lkvlebv",
    invoiceNo:7,
    customerName:"Alokesh",
    soldDate:new Date().getTime(),
    totalPrice:500,
    productDetails:"http://localhost:3000/transactions/96789"
  }

  
]
const passIT=(x)=>{
  passContext.setIdProps({id:x})
}
const rows=sent||useRow;
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Invoice No</TableCell>
          <TableCell className="tableCell">Customer</TableCell>
          <TableCell className="tableCell">Date of Sale</TableCell>
          <TableCell className="tableCell">Amount</TableCell>
          <TableCell className="tableCell">Views</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row" className="tableCell">
              {row.invoiceNo}
            </TableCell>
            <TableCell className="tableCell">{row.customerName}</TableCell>
            <TableCell className="tableCell">{`${(new Date(row.soldDate.seconds*1000).toLocaleDateString())}`}</TableCell>
            <TableCell className="tableCell">{row.totalPrice}</TableCell>
            <TableCell className="tableCell"><Link to={`/transactions/${row.id}`} onClick={()=>{passIT(row.id)}} style={{textDecoration:"none"}}><div className="tableLink">click to view</div></Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List
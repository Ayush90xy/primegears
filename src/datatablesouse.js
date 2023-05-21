
//temporary data
export const customerColumn=[
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'fname', headerName: 'First name', width: 230 },
  { field: 'lname', headerName: 'Last name', width: 230 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  }]
export const productColumn=[
  { field: 'id', headerName: 'ID', width: 180 },
  { field: 'name', headerName: 'Product Name', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'brand', headerName: 'Brand', width: 100 },
  { field: 'model', headerName: 'Model', width: 100 },
  { field: 'price', headerName: 'Price(per)', width: 100 },
  { field: 'quantity', headerName: 'Stock', width: 100 },
]
export const transactionColumn=[
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'invoiceNo', headerName: 'Invoice No', width: 200 },
  { field: 'customerName', headerName: 'Customer Name', width: 230 },
  { field: 'totalPrice', headerName: 'Total Price', width: 230 },
  { field: 'soldDate', headerName: 'Date of Sale', width: 230,renderCell:(params)=>{
    return(
     // <><div>{`${(new Date(params.row.soldDate.seconds*1000).toLocaleDateString())}`}</div></>
     <><div>{`${(params.row.soldDate.toDate().toLocaleDateString())}`}</div></>

    )},}
]

export const userRow=[
  {
    id:1,
    fname:"Navin",
    lname:"Singh",
    email:"nav@kv.com",
    phone:8957032392
  },
  {
    id:2,
    fname:"Vikash",
    lname:"Singh",
    email:"vkd@has.in",
    phone:354821233
  },
  {
    id:3,
    fname:"Suraj",
    lname:"Dev",
    email:"sdhelv@bing.in",
    phone:213544677
  },
  {
    id:4,
    fname:"Radhe",
    lname:"Shyam",
    email:"rad@google.in",
    phone:843695784
  },
  {
    id:5,
    fname:"Mingo",
    lname:"Man",
    email:"mingo@home.in",
    phone:7893793485
  },
  {
    id:6,
    fname:"Rahul",
    lname:"Kumar",
    email:"rahul@bsa.in",
    phone:873453695
  },
  {
    id:7,
    fname:"Anup",
    lname:"Singh",
    email:"anup@boi.com",
    phone:54567657
  },
  {
    id:8,
    fname:"Krishna",
    lname:"Raghuwanshi",
    email:"kr@34dam.in",
    phone:218956956
  },
  {
    id:9,
    fname:"Kundan",
    lname:"Jha",
    email:"kudjha@bihar.in",
    phone:2135256
  },
  {
    id:10,
    fname:"Vivek",
    lname:"Roy",
    email:"Vivroy@college.in",
    phone:23543667
  },
  {
    id:11,
    fname:"Priya",
    lname:"Mishra",
    email:"pmish@rr.in",
    phone:37408753
  },
  {
    id:12,
    fname:"Payal",
    lname:"Singh",
    email:"payal23@google.in",
    phone:23544746
  },
]
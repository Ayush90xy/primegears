export const customerInputs=[
  {
    id:"fname",
    label:"First Name",
    type:"text",
    placeholder: "First name here",
    required:true
  },
  {
    id:"lname",
    label:"Last Name",
    type:"text",
    placeholder:"Last name here",
    required:true
  },
  {
    id:"email",
    label:"Email Id",
    type:"email",
    placeholder:"Email id here",
    required:true
  },
  {
    id:"phone",
    label:"Phone",
    type:"text",
    placeholder:"Phone here",
    required:true
  },
  {
    id:"address",
    label:"Address",
    type:"text",
    placeholder:"Address here",
    required:false
  },
];

export const productInputs=[
  {
    id:"type",
    label:"Type",
    type:"text",
    placeholder:"Enter type here",
    required:true,
    hasDrop:true,
    dropList:["Drills","Grinders","Hammer Drills","Cutters","Saws","Planners","Sander Polisher","Routers","Blow Guns","Spanners",
    "Sockets","Chisels","Straight Blades","Pliers","ToolBox","Phillips Drivers","Wrentches","Clamps","Hammers",
    "Welding Machine","Pumps","Vices","Compressers","Welding Machine","Cutters/Blades","Blades/Wheels","Hammer Bits","Hole Bits",
    "Drill Bits","Files","Saftey Tools","Sander Polisher","Router Bits"]
  },
  {
    id:"brand",
    label:"Brand",
    type:"text",
    placeholder:"Enter brand here",
    required:true,
  },
  {
    id:"model",
    label:"Model",
    type:"text",
    placeholder:"Enter model here",
    required:true,
  },
  {
    id:"name",
    label:"Name",
    type:"text",
    placeholder:"Enter product name here",
    required:true,
  },
  {
    id:"price",
    label:"Price",
    type:"number",
    placeholder:"Enter price here",
    required:true,
  },
  {
    id:"quantity",
    label:"Quantity",
    type:"number",
    placeholder:"Enter the stock quantity",
    required:true,
  },
  {
    id:"desc",
    label:"Desc",
    type:"text",
    placeholder:"Enter product specs",
    required:true,
  },
]
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Recipt from "../../components/recipt/Recipt"
import "./view.scss"
//import HTMLToPDF from "convert-html-to-pdf/lib/models/HTMLToPDF";

import html2pdf from "html2pdf.js"


 const View = () => {
 // const transctionObject=useContext(TransContext);
  const options = {
    filename: 'invoice.pdf',
    image: { 
      type: 'png', 
      quality: 1
    },
    html2canvas: { 
      scale: 1 
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait' 
    },
   // pagebreak:{mode:['avoid-all','scss','legacy']}
  }



  const generatePDF=async()=>{    
    const element = document.getElementById('printRecipt')
    console.log('started')

      html2pdf().from(element).set(options).save();
    console.log("done");



  }
 


  return (
    <div className='view'>
      <Sidebar/>
      <div className="viewContainer">
        <Navbar/>
        <div className="main">
          <div className="actions">
            <span className="headerRecipt">Recipt View</span>
            <span className="link" onClick={()=>{
              generatePDF();
              //print('a','printable');
            }}>Download</span>
          </div>
          {/* //<Preview id={'printable'}> */}
          <div className="div"id={"printRecipt"}>
            <Recipt/>
          </div>
          {/* //</Preview> */}
        </div>
      </div>
    </div>
  )
}

export default View
import "./about.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const About = () => {
  return (
    <div className='about'>
      <Sidebar/>
      <div className="aboutContainer">
        <Navbar/>
        <div className="top">
            <h1>About</h1>
        </div>
        <div className="middle">
          <h2>
            Welcome to the PrimeGears App! I've have developed this application to cater to the specific inventory management needs.Primary goal behind this app is to provide a comprehensive and user-friendly solution that empowers businesses with efficient inventory functionalities.
            With the PrimeGears App, you can streamline your inventory management processes and gain better control over your stock levels. Understanding the importance of having accurate and up-to-date information about your inventory, app is designed to meet those requirements.
            This app offers a range of essential features to simplify your inventory management tasks. You can easily track and monitor your stock, including the quantity and status of each item. With real-time updates, you can stay informed about stock movements and make informed decisions to optimize your inventory.
            Efficient transaction management is also at the core of this app. You can effortlessly create and manage transactions, track them, and update stock levels as goods are received. App also enables you to generate exportable invoices, manage customer information, and monitor the status of deliveries.
            We understand that every business is unique, and that's why PrimeGears app is customized to suit your specific requirements. You can tailor the app to match your workflows, create custom reports to gain insights into your inventory performance, and set up alerts to notify you of low stock levels or other critical events.. 
            I'm always ready to assist you with any questions or issues you may encounter while using the app. Your feedback is valued and will continuously strive to improve this app based on your suggestions.
            PrimeGears App is here to simplify your inventory management processes, enhance efficiency, and boost your business's overall performance. Experience the convenience and power of our app and take control of your inventory today. 
          </h2>
        </div>
        <div className="bottom">
          <div className="contact">
            <span>Phone: <b>8258061243</b></span>
            <span>Email: <a href="mailto:ayush90xy@gmail.com" className="link"><b>ayush90xy@gmail.com</b></a></span>
            <span>Address: <b>Earle Holiday Home</b></span>
            <span>Git: <b>Earle Holiday Home</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
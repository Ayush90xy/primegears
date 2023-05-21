import { useContext } from 'react'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';
import List from './pages/list/List';
import Notice from './pages/notice/Notice';
import Report from './pages/report/Report';
import NewTransaction from './pages/transaction/NewTransaction';
import { customerInputs,productInputs } from './formSource';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import TransState from './context/TransState';
import  View  from './pages/view/View';
import IdState from './context/IdState';
import DoUpdate from './pages/doupdate/DoUpdate';
import Profile from './pages/profile/Profile';
import SingleTrans from './pages/singleTrans/SingleTrans';
import About from './pages/about/About';

function App() {
  const {darkMode}=useContext(DarkModeContext)

  const {currentUser}=useContext(AuthContext);

  const RequireAuth=({children})=>{
    return currentUser ? (children):<Navigate to="/login"/>
  }

  //console.log(currentUser);

  return (
    <div className={darkMode ? "app dark":"app"}>
      <IdState>
      <TransState>
      <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="login" element={<Login/>}/>
          <Route index element={<RequireAuth><Home/></RequireAuth>}/>
          <Route path="customers">
            <Route index element={<RequireAuth><List forcol="customers"/></RequireAuth>}/>
            <Route path=":customerId" element={<RequireAuth><Single/></RequireAuth>}/>
            <Route path="new" element={<RequireAuth><New inputs={customerInputs} title="Add new Customers" forCollection="customers"/></RequireAuth>}/>
            <Route path="update">
              <Route path=":customerID" element={<RequireAuth><DoUpdate forCollection="customers"/></RequireAuth>}/>
            </Route>
          </Route>
          <Route path="products">
            <Route index element={<RequireAuth><List forcol="products"/></RequireAuth>}/>
            <Route path=":productId" element={<RequireAuth><Single/></RequireAuth>}/>
            <Route path="new" element={<RequireAuth><New inputs={productInputs} title="Add new Products" forCollection="products"/></RequireAuth>}/>
            <Route path="update">
              <Route path=":productID" element={<RequireAuth><DoUpdate forCollection="products"/></RequireAuth>}/>
            </Route>
          </Route>
          <Route path="transactions">
            <Route index element={<RequireAuth><List forcol="transactions"/></RequireAuth>}/>
            <Route path=":transactionId" element={<RequireAuth><SingleTrans/></RequireAuth>}/>
            <Route path="new" element={<RequireAuth><NewTransaction forcol="products"/></RequireAuth>}/>
            <Route path="done" element={<RequireAuth><View/></RequireAuth>}/>
          </Route>
          <Route path="notifications">
            <Route index element={<RequireAuth><Notice/></RequireAuth>}/>
          </Route>
          <Route path="reports">
            <Route index element={<RequireAuth><Report/></RequireAuth>}/>
          </Route>
          <Route path="profile">
            <Route index element={<RequireAuth><Profile/></RequireAuth>}/>
          </Route>
          <Route path="about">
            <Route index element={<RequireAuth><About/></RequireAuth>}/>
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </TransState>
      </IdState>
    </div>
  );
}

export default App;

import { Outlet, Link } from "react-router-dom";
import './Layout.css'
const Layout = () => {
  return (
    <>
      <div className='header'>
        <div  className='Solve'><Link to="solve">Solving quizes</Link></div>
        <div  className='Edit'><Link to="quizes">Edit quizes</Link></div>
        <div  className='Add'><Link to="add">Add quiz</Link></div>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;
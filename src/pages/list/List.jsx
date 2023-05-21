import './list.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Datatable from '../../components/datatable/Datatable'

const List = ({forcol}) => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable forCol={forcol} />
      </div>
    </div>
  )
}

export default List
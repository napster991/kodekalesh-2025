import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer,toast } from 'react-toastify'
import Assessment from './pages/Assessment'

const navStyle = {
  display: 'flex',
  gap: 12,
  padding: 12,
  borderBottom: '1px solid #eee',
  marginBottom: 18,
}

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <ToastContainer/>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {/* <Link to="/assessment" style={linkStyle}>Assessment</Link> */}
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import NotFound from './pages/NotFound'
import Start from './pages/Start'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/user-login' element={<UserLogin />}></Route>
        <Route path='/user-signup' element={<UserSignup />}></Route>
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainSignup />}></Route>
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App

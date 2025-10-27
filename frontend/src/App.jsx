
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'
import { HomePage } from './pages/home'
import { ProfilePage } from './pages/userprofile'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/userprofile' element={<ProfilePage />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

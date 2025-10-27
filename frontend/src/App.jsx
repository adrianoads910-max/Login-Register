
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'
import { HomePage } from './pages/home'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

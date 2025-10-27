import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/home';
import { ProfilePage } from './pages/userprofile';
import { PrivateRoute } from './PrivateRoute';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { AdminRoute } from './AdminRoute'; // ✅ IMPORTANTE

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* ✅ Rota protegida por autenticação (token) */}
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* ✅ Rota protegida somente para ADMIN */}
        <Route
          path='/admin/users'
          element={
            <AdminRoute>
              <UserManagementPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

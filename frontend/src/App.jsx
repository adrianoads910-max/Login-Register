import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/home';
import { ProfilePage } from './pages/userprofile';
import { PrivateRoute } from './PrivateRoute';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { AdminRoute } from './AdminRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/admin/users'
        element={
          <AdminRoute>
            <UserManagementPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;

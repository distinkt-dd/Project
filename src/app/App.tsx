import { ProtectedRoute } from '@app';
import { EditProfilePage } from '@pages/editProfile/EditProfilePage';
import { EditProjectPage } from '@pages/editProject/EditProjectPage';
import { ErrorPage } from '@pages/error/ErrorPage';
import { FavoritesPage } from '@pages/favorites/FavoritesPage';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { MainPage } from '@pages/main/MainPage';
import { MyProfilePage } from '@pages/myProfile';
import { ParticipantsPage } from '@pages/participants';
import { PolicyPage } from '@pages/policy/PolicyPage';
import { ProfilePage } from '@pages/profile';
import { ProjectCardPage } from '@pages/projectCard/ProjectCardPage';
import { ProjectsPage } from '@pages/projects/ProjectsPage';
import { RequestsPage } from '@pages/requests/RequestsPage';
import { MainLayout } from '@shared/ui/layout/main/MainLayout';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Публичные маршруты */}
        <Route index element={<MainPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="projects/:id" element={<ProjectCardPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="edit-project" element={<EditProjectPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

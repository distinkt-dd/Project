import './styles/index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main/MainPage';
import { ProjectsPage } from '@pages/projects/ProjectsPage';
import { ParticipantsPage } from '@pages/participants';
import { ProjectCardPage } from '@pages/projectCard/ProjectCardPage';
import { ProfilePage } from '@pages/profile';
import { MyProfilePage } from '@pages/myProfile/MyProfilePage';
import { EditProfilePage } from '@pages/editProfile/EditProfilePage';
import { EditProjectPage } from '@pages/editProject/EditProjectPage';
import { RequestsPage } from '@pages/requests/RequestsPage';
import { FavoritesPage } from '@pages/favorites/FavoritesPage';
import { ErrorPage } from '@pages/error/ErrorPage';
import { PolicyPage } from '@pages/policy/PolicyPage';
import { LoginPage } from '@pages/login/LoginPage';
import { MainLayout } from '@shared/ui/layout/main/MainLayout';
import { ProtectedRoute } from '@app';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Публичные маршруты */}
        <Route index element={<MainPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="project-card/:id" element={<ProjectCardPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="edit-project" element={<EditProjectPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

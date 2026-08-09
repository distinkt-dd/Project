import './styles/index.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main';
import { ProjectsPage } from '@pages/projects';
import { ParticipantsPage } from '@pages/participants';
import { ProjectCardPage } from '@pages/projectCard';
import { ProfilePage } from '@pages/profile';
import { MyProfilePage } from '@pages/myProfile';
import { EditProfilePage } from '@pages/editProfile';
import { EditProjectPage } from '@pages/editProject';
import { RequestsPage } from '@pages/requests';
import { FavoritesPage } from '@pages/favorites';
import { ErrorPage } from '@pages/error';
import { PolicyPage } from '@pages/policy';
import { LoginPage } from '@pages/login';
import { MainLayout } from '@shared/ui/layout/main/MainLayout';
import { ProtectedRoute } from '@app';
import { RegisterPage } from '@pages/register';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Публичные маршруты */}
        <Route index element={<MainPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Защищённые маршруты */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="participants" element={<ParticipantsPage />} />
        <Route path="project-card/:id" element={<ProjectCardPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="edit-project" element={<EditProjectPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

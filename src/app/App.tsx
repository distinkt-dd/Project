import { SecondPage } from '@pages/second';
import './styles/index.css';
import { MainPage } from '@pages/main';
import './App.css';
export function App() {
  return (
    <div className="bg-amber-900 text-center">
      <MainPage />
      <SecondPage />
    </div>
  );
}

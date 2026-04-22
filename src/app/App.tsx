import './styles/index.css';
import './App.css';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

export function App() {
  return (
    <div className="bg-amber-900 text-center wrapper">
      <Header />
      <main className="mainContent">
        <h1>Hello World</h1>
      </main>
      <Footer />
    </div>
  );
}

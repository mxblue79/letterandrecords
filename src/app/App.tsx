import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Info } from './pages/Info';
import { About } from './pages/About';
import { ProjectDetail } from './pages/ProjectDetail';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Bookstore } from './pages/Bookstore';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 w-full max-w-[1400px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Home />} />
            <Route path="/bookstore" element={<Bookstore />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

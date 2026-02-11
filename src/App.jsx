import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

const links = [
  ['/', 'Home'],
  ['/events', 'Events'],
  ['/register', 'Register'],
  ['/gallery', 'Gallery'],
  ['/dashboard', 'Student'],
  ['/admin', 'Admin'],
  ['/contact', 'Contact'],
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="logo">CampusFest 2026</p>
          <p className="tagline">Minor project demo: complete college event portal</p>
        </div>
        <nav>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

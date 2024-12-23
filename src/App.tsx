import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<div className="p-6">Welcome! Select an option from the menu.</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
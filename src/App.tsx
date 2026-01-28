import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IDE from './pages/IDE';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/app" element={<IDE />} />
        {/* Catch all redirect to onboarding */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
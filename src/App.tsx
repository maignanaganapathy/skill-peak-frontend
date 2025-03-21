import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from './features/contact/ContactForm'; // adjust the path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "pages/Home"
import './App.css';
import 'components/Category.css';
import Medicine from 'pages/Medicine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<Medicine />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
      <nav>
        <a href="/">Home</a>
      </nav>
    </div>
  );
}

export default App;

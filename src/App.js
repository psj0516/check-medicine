import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "pages/Home";
import "./App.css";
import Medicine from "pages/Medicine";
import Loading from "pages/Loading";

function App() {
  const [init, setInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={init ? <Home /> : <Loading />} />
          <Route path={`${precess.env.PUBLIC_URL}/home`} element={<Home />} />
          <Route path={`${precess.env.PUBLIC_URL}/medicine`} element={<Medicine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

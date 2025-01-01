import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const storedPreference = localStorage.getItem("isDark");
    return storedPreference ? JSON.parse(storedPreference) : true;
  });

 
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <div className={`${isDark ? "dark" : ""} flex flex-col`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}

export default App;

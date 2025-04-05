import { Outlet } from "react-router-dom";
import Navbar from "./components/nav/Navbar";

function App() {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="mb-8">
        <Navbar />
      </header>
      <main className="flex-grow overflow-hidden px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

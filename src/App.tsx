import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import CreateCart from "./pages/CreateCart";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="min-h-screen font-primary bg-primary flex flex-col items-center py-8 text-light gap-8">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center w-full px-8 max-w-[1200px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/createCart" element={<CreateCart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

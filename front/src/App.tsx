import { useState, useEffect } from "react";
import "./App.css";
import Convidados from "./pages/Convidados";
import Admin from "./pages/Admin";

export default function App() {
  const [admin, setAdmin] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get("admin")?.toString();
    setAdmin(adminParam ?? "");
  }, []);

  return <>{admin === "1" ? <Admin /> : <Convidados />}</>;
}

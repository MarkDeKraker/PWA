import { Button } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  return (
    <nav className="bg-black p-4 flex justify-between">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-semibold">
          Progessive Web App
        </a>
      </div>
      <div className="flex space-x-2">
        <Button variant="filled" color={isOnline ? "green" : "red"}>
          Status: {isOnline ? "Online" : "Offline"}
        </Button>
        <Button onClick={() => navigate("/")}>Projects</Button>
        <Button onClick={() => navigate("/tags")}>Tags</Button>
      </div>
    </nav>
  );
}

export default Navbar;

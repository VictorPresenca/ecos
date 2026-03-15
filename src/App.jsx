import { useEffect, useState } from "react";
import { listenAuth } from "./services/auth";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function App(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    listenAuth((u)=>{
      setUser(u);
    });

  },[]);

  if(!user){
    return(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return(

    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-200 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl text-black font-bold">
          Ecos
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:underline">
            Feed
          </Link>

          <Link to="/create" className="hover:underline">
            Criar Post
          </Link>

          <Link to="/profile" className="hover:underline">
            Perfil
          </Link>
        </div>

      </nav>

      <hr />

      <p className="m-8 text-center text-gray-500">Essa plataforma serve para conectar pessoas em prol do meio ambiente! Faça uma postagem de uma ação benéfica que você fez, <strong>mesmo que pequena</strong>, para incentivar as outras pessoas a fazerem o mesmo. Depois de postar, é muito importante que <a href="https://forms.gle/w81XqT6QdcLrKbz5A">clique aqui</a> para preencher o questionário de satisfação do app.</p>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

  )
}

export default App;
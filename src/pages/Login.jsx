import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  async function handleLogin(e){
    e.preventDefault();

    try{

      await signInWithEmailAndPassword(auth,email,password);

      alert("Login realizado!");

    }catch(error){

      setError("Email ou senha inválidos");

    }
  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">

        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-2"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border rounded-lg p-2"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-while p-2 rounded-lg hover:bg-green-700">
          Entrar
        </button>

      </form>


      <p className="mt-4">
        Ainda não tem conta?{" "}
        <Link to="/register" className="text-green-600 font-semibold">
          Cadastre-se
        </Link>
      </p>
    </div>


  )

}

export default Login;
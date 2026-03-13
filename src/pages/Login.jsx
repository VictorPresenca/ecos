import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleLogin(e){
    e.preventDefault();

    try{

      await signInWithEmailAndPassword(auth,email,password);

      alert("Login realizado!");

    }catch(error){

      console.log(error);

    }
  }

  return(

    <form onSubmit={handleLogin}>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button>
        Entrar
      </button>

    </form>

  )

}

export default Login;
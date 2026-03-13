import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e){
    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      alert("Usuário criado!");

    } catch(error){

      console.log(error);

    }
  }

  return(

    <form onSubmit={handleRegister}>

      <h2>Criar conta</h2>

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
        Cadastrar
      </button>

    </form>

  )

}

export default Register;
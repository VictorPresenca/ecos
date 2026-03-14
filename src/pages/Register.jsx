import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  async function handleRegister(e){
    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      setSuccess("Usuário criado com sucesso!");
      setError("");

    } catch(error){

      setError("Erro ao criar conta");

    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleRegister} className="bg-white p-8 shadow-md w-full max-w-md flex flex-col gap-4">

        <h2 className="text-2xl font-bold text-center">Criar conta</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

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

        <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
          Cadastrar
        </button>

      </form>
      
    </div>

  )

}

export default Register;
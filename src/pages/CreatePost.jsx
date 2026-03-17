import { useState } from "react";
import { uploadImage } from "../services/cloudinary";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../services/firebase";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [success,setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  async function handleSubmit(e) {
    e.preventDefault();

    if(!user) {
      alert("Você precisa estar logado");
      return;
    }

    if (!file) {
      alert("Escolha a imagem");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      const imageUrl = await uploadImage(file);

      await addDoc(collection(db, "posts"), {
        text,
        imageUrl,
        userId: user.uid,
        userEmail: user.email,
        likes: 0,
        createdAt: serverTimestamp()
      });

      navigate("/");

      setSuccess("Postagem Criada com sucesso!");

      setText("");
      setFile(null);

    } catch (error) {
      console.error("Erro ao criar post:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">
            
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            
            <p className="font-semibold">Publicando seu post...</p>
          
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Criar post</h2>

        {success && (
          <p className="text-green-600 font-semibold mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <textarea
          className="border rounded-lg p-2"
            placeholder="Compartilhe sua ação ecológica"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" className="bg-green-600 text-white p-2 rounded-lg">
            Publicar
          </button>

        </form>
      </div>

    </div>
  );
}

export default CreatePost;
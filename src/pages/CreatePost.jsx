import { useState } from "react";
import { uploadImage } from "../services/cloudinary";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../services/firebase";

function CreatePost() {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
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

    try {

      // 1️⃣ enviar imagem para o Cloudinary
      const imageUrl = await uploadImage(file);

      // 2️⃣ salvar no Firestore
      await addDoc(collection(db, "posts"), {
        text,
        imageUrl,
        userId: user.uid,
        userEmail: user.email,
        likes: 0,
        createdAt: new Date()
      });

      console.log("Post criado!");

      // limpar formulário
      setText("");
      setFile(null);

    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 p-4">
      <h2>Criar post</h2>

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="Compartilhe sua ação ecológica"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">
          Publicar
        </button>

      </form>
    </div>
  );
}

export default CreatePost;
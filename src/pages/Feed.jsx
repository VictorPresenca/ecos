import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { likePost } from "../services/posts";
import { collection, onSnapshot } from "firebase/firestore";
import Comments from "../components/Comments";

function Feed(){

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {

    const list = [];

    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setPosts(list);

    });

    return () => unsubscribe();

  }, []);

  async function handleLike(postId){
    await likePost (postId)
    window.location.reload()
  }

  return(

    <div className="max-w-xl mx-auto mt-6 p-4">

      {posts.map(post => (

        <div 
          key={post.id}
          className="bg-white rounded-xl shadow-md p-4 mb-6"
        >

          <p className="font-semibold text-gray-700">
            {post.userEmail}
          </p>

          {post.imageUrl && (
            <img 
              src={post.imageUrl}
              className="rounded-lg my-3"
            />
          )}

          <p className="text-gray-800 mb-2">
            {post.text}
          </p>

          <p>❤️ {post.likes}</p>

          <button 
            onClick={()=>handleLike(post.id)}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
          >
            Curtir
          </button>

          <Comments postId={post.id}/>

        </div>

      ))}

    </div>

  )
}

export default Feed;
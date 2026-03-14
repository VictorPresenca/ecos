import { useEffect,useState } from "react"
import { db } from "../services/firebase"
import { collection,query,where,onSnapshot } from "firebase/firestore"
import { auth } from "../services/firebase"
import { signOut } from "firebase/auth"

function Profile(){

  const [posts,setPosts] = useState([])

  useEffect(()=>{

    const user = auth.currentUser

    const q = query(
      collection(db,"posts"),
      where("userId","==",user.uid)
    )

    const unsubscribe = onSnapshot(q,(snapshot)=>{

      const list=[]

      snapshot.forEach(doc=>{
        list.push({id:doc.id,...doc.data()})
      })

      setPosts(list)

    })

    return ()=>unsubscribe()

  },[])

  async function handleLogout(){

    try{

      await signOut(auth)

      alert("Você saiu da conta")

      window.location.href="/login"

    }catch(error){

      alert("Erro ao fazer logout")

    }

  }

  return(

    <div className="min-h-screen flex justify-center bg-gray-100">

      <div className="w-full max-w-lg p-4">

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-6 my-6"
        >
          Sair da conta
        </button>

        <h1 className="text-2xl font-bold mb-6">Meus posts</h1>

        {posts.map(post=>(
          <div key={post.id} className="bg-white rounded-xl shadow-md p-4 mb-6">

            <img src={post.imageUrl} width="300" className="w-full rounded-lg mb-3"/>

            <p>{post.text}</p>

          </div>
        ))}

      </div>

    </div>


  )

}

export default Profile
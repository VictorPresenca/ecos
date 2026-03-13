import { useEffect,useState } from "react"
import { db } from "../services/firebase"
import { collection,query,where,onSnapshot } from "firebase/firestore"
import { auth } from "../services/firebase"

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

  return(

    <div className="max-w-xl mx-auto mt-6 p-4">

      <h1>Meus posts</h1>

      {posts.map(post=>(
        <div key={post.id}>

          <img src={post.imageUrl} width="300"/>

          <p>{post.text}</p>

        </div>
      ))}

    </div>

  )

}

export default Profile
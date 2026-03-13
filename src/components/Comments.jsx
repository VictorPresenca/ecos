import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { createComment } from "../services/comments";
import { auth } from "../services/firebase";

function Comments({ postId }) {

  const [comments,setComments] = useState([])
  const [text,setText] = useState("")

  useEffect(()=>{

    const q = query(
      collection(db,"comments"),
      where("postId","==",postId)
    )

    const unsubscribe = onSnapshot(q,(snapshot)=>{

      const list=[]

      snapshot.forEach(doc=>{
        list.push(doc.data())
      })

      setComments(list)

    })

    return ()=>unsubscribe()

  },[postId])

  async function handleComment(){

    const user = auth.currentUser

    if(!text) return

    await createComment(postId,user.uid,text)

    setText("")

  }

  return(

    <div className="mt-4">

      <h4 className="font-semibold text-gray-700 mb-2">
        Comentários
      </h4>

      <div className="space-y-2">

        {comments.map((c,i)=>(

          <div 
            key={i}
            className="bg-gray-100 rounded-lg p-2"
          >

            <p className="text-sm text-gray-800">
              {c.text}
            </p>

          </div>

        ))}

        <div className="flex gap-2 mt-3">

          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Escreva um comentário..."
            className="flex-1 border rounded-lg px-2 py-1"
          />

          <button 
            onClick={handleComment}
            className="bg-green-500 text-white px-3 rounded-lg hover:bg-green-600"
          >
            Enviar
          </button>

        </div>

      </div>

    </div>


  )

}

export default Comments
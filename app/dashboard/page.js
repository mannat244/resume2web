"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {

  const [logout, setlogout] = useState(false)
  const { data: session, status } = useSession();
  const [file, setfile] = useState()
  const [message, setmessage] = useState("")

  if (status === "loading") return <p className="font-semibold mx-auto my-auto">Loading...</p>;

  const handleFile = (e)=>{
    if(e.target.files && e.target.files[0])
      setfile(e.target.files[0])
  }

  const uploadFile = async(e) =>{
    e.preventDefault()
    setmessage("file upload start!")

    

    if(!file)
      alert("please upload your resume")

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch('/api/upload',{
      method:'POST',
      body: formData,
    })

    const uploadResponse = await response.json()

    if(uploadResponse.status == 200){
      setmessage("file uploaded!")


      const response = await fetch('/api/extract',{
        method:'POST',
        body: JSON.stringify({"path": uploadResponse.url}),
        headers: {
          "Content-Type": "application/json",
      },
      })

      const extractResponse = await response.json()
  
      if(extractResponse.status == 200){
        setmessage("file extracted!")
      
        let cleanedJson = extractResponse.details;
        console.log(cleanedJson)
        setmessage("render start")


        const renderResponse = await fetch('/api/render',{
          method:'POST',
          body: JSON.stringify({"details": cleanedJson}),
          headers: {
         "Content-Type": "application/json"
        },
        })
  
        setmessage("build started!")
        if (!renderResponse.ok) throw new Error("Failed to generate HTML");

        const html = await renderResponse.text();

        

        setTimeout(() => {
          try {
            const newTab = window.open();
            if (!newTab) {
                throw new Error("Popup blocked! Please allow pop-ups for this site.");
            }
              newTab.document.write(html);
              newTab.document.close();
          } catch (err) {
              console.error("Error writing to new tab:", err);
          }
      }, 100);


      }
    }

  }

  return (
    <div className="bg-zinc-900 h-[100vh]">
      <div className="bg-zinc-800 h-14 flex items-center">
        <h1 className="text-xl font-semibold text-white  ml-5">Resume2Web</h1>
        {session && <div className="flex items-center cursor-pointer  font-medium ml-auto mr-5 text-white" onClick={()=>{setlogout(!logout)}}> <h1>{session.user.name}</h1>
           { logout && <button className="absolute top-[70px] right-5 font-bold bg-red-500 px-1 py-1 rounded-md" onClick={() => signOut()}>Logout</button>}</div>}
          </div>

      { !session && <div className="flex flex-col text-white text-2xl h-[80vh] items-center justify-center">
         <h1>You're not logged in</h1>
         <button className="bg-zinc-600 px-2 py-1 rounded-lg mt-10 text-white font-semibold"  onClick={() => signIn("google")}>Login</button>
        </div> }

      { session && <div>
        <div className="text mx-auto w-fit mt-14">        
          <h1 className="text-xl font-semibold text-white">Upload your resume (PDF, DOC) to auto-generate your portfolio ✨</h1>
        </div>
        <form className=" flex flex-col items-center">
          <div className="mt-5 w-fit"> <label htmlFor="resume" className="text-white mr-1 font-semibold">Upload: </label>
          <input type="file" id="resume" name="resume" className="text-zinc-400 cursor-pointer bg-zinc-800 rounded-lg p-1 file:bg-stone-900 file:outline-none file:text-white file:border-none file:rounded-sm file:text-sm file:py-1 file:px-2 file:mr-1" onChange={handleFile}></input></div>
          <p className="text-zinc-400 text-sm mt-1">Format: pdf</p>
          <button className="px-10 py-2 bg-zinc-800 rounded-lg text-white font-semibold mt-5 hover:bg-zinc-700 " onClick={uploadFile}>Build My Portfolio</button>
          <p className="mt-5 font-semibold text-green-500">{message}</p>
        </form>
      </div>
      }
    </div>
  );
}

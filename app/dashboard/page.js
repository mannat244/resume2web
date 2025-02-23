"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";

export default function Dashboard() {

  const [logout, setlogout] = useState(false)
  const { data: session, status } = useSession();
  const [file, setfile] = useState()
  const [message, setmessage] = useState("")
  const [template, settemplate] = useState(1)
  const [timestamp, settimestamp] = useState()
  const buttonRef = useRef(null);



  const alltemplates = [ 
    {
      id: 1,
      title: "Modern Animated Portfolio",
      desc: "A sleek, modern portfolio with smooth animations.",
      img: "/demo_temp1.png",
    },
    {
      id: 2,
      title: "Dark Glow Modern Portfolio",
      desc: "A bold dark theme with neon glow effects.",
      img: "/demo_temp2.png",
    },
    {
      id: 3,
      title: "Minimalist Clean Portfolio",
      desc: "A simple and elegant design with soft gradients.",
      img: "/demo_temp3.png",
    },
    {
      id: 4,
      title: "Netflix-Inspired Portfolio",
      desc: "A cinematic dark theme with a bold interface.",
      img: "/demo_temp4.png",
    },
    {
      id: 5,
      title: "Techy theme",
      desc: "Make your sw design",
      img: "/demo_temp5.png",
    }
  ];
  
  
  const Designs = ({func, title, img, desc }) => {


    return (
      <div className={ `flex flex-col gap-2 flex-wrap items-center h-fit rounded-md p-1.5  peer-checked:border-zinc-700 peer-checked:p-1 peer-checked:border-[1px] peer-checked:bg-zinc-800/40`} onClick={func}>
      <img src={img} className="h-[250px] rounded-md  "></img>
      <p className="text-white font-bold text-center">{title}</p>
      <p className="text-zinc-300 max-w-80 text-center">{desc}</p>
      </div>
    )
  }
  

  if (status === "loading") return <div className="h-[100vh] flex items-center justify-center  w-[100vw] bg-zinc-900">
    <p className="font-semibold mx-auto text-zinc-500 my-auto">Loading...</p>;
  </div>
   

  const handleFile = (e)=>{
    if(e.target.files && e.target.files[0])
      setfile(e.target.files[0])
  }

  const handleTemplateChange = (e) => {
    settemplate(parseInt(e.target.value)); 
  };

  const uploadFile = async(e) =>{
    e.preventDefault()
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
    settimestamp(Date.now())
    setmessage("📤 Resume upload started...")

    if(!file){
      alert("please upload your resume")
      setmessage("❌ Resume upload failed...")
      buttonRef.current.disabled = false;
      return;
    }
     

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch('/api/upload',{
      method:'POST',
      body: formData,
    })

    const uploadResponse = await response.json()

    if(uploadResponse.status == 200){
      setmessage("✅ Resume uploaded successfully!")
    
      setmessage("🤖 AI analyzing text...")

      const response = await fetch('/api/extract',{
        method:'POST',
        body: JSON.stringify({"path": uploadResponse.url}),
        headers: {
          "Content-Type": "application/json",
      },
      })

      const extractResponse = await response.json()
  
      if(extractResponse.status == 200){
            setmessage("🛠️ Generating website content...")
          
            let cleanedJson = extractResponse.details;
            console.log(cleanedJson)
            setmessage("✨ Finalizing design...")


        const renderResponse = await fetch('/api/render',{
          method:'POST',
          body: JSON.stringify({"details": cleanedJson , "templates":template , "timestamp":timestamp }),
          headers: {
         "Content-Type": "application/json"
        },
        })
  
        setmessage("👀 Rendering website preview...")
        buttonRef.current.disabled = false;
        if (!renderResponse.ok) {           
          setmessage("👀 Rendering failed...")
          throw new Error("Failed to generate HTML");
        }

        const html = await renderResponse.text();

        setTimeout(() => {
          try {
            setmessage("🚀 Website is ready!")
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


      } else {
        setmessage("❌ We couldn't extract data. Is your PDF a scanned or flat image-based file?")
      }
    } else {
      setmessage("❌ Resume upload failed...")
      console.log(uploadResponse)
    }

  }

  return (
    <div className="bg-zinc-900 h-[fit]">
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
          <h1 className="text-xl font-semibold text-white text-center">Upload your resume (PDF) to auto-generate your portfolio ✨</h1>
        </div>
        <form className=" flex flex-col items-center">
          <div className="mt-5 w-fit"> <label htmlFor="resume" className="text-white mr-1 font-semibold">Upload: </label>
          <input type="file" id="resume" name="resume" className="text-zinc-400 cursor-pointer bg-zinc-800 rounded-lg p-1 file:bg-stone-900 file:outline-none file:text-white file:border-none file:rounded-sm file:text-sm file:py-1 file:px-2 file:mr-1" onChange={handleFile}></input></div>
          <p className="text-zinc-400 text-sm mt-1">Format: pdf</p>
          <h1 className="text-xl font-semibold text-white mt-3 text-center">Pick Your Perfect Design ✨</h1>
          <div className="h-fit w-[90vw] mt-8 flex-wrap rounded-xl flex items-center justify-center gap-3">
        {alltemplates.map((mtemplate) => (
          <label key={mtemplate.id} className="cursor-pointer">
            <input type="radio" name="template" value={mtemplate.id} className="hidden peer" checked={template === mtemplate.id} onChange={handleTemplateChange}/>
            <Designs  func={() => settemplate(mtemplate.id)} title={mtemplate.title}  img={mtemplate.img}  desc={mtemplate.desc} />
          </label>
        ))}
      </div>
     
          <button ref={buttonRef} className="px-10 py-2 bg-zinc-800 rounded-lg disabled:text-zinc-700 disabled:hover:bg-zinc-500 text-white font-semibold mt-5 hover:bg-zinc-700 " onClick={uploadFile}>Build My Portfolio</button>
          <p className="mt-5 font-semibold text-green-500">{message}</p>
        </form>
        <div className="h-32"><p></p> </div>
      </div>
      }
    </div>
  );
}

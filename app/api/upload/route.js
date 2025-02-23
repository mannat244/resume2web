import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir} from "fs/promises";


export async function POST(req) {
try {
  const formData = await req.formData();
  const file = formData.get("file");

  if(!file){
    return NextResponse.json({error:"no File Found!"},{status:400})
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(),"public/userdata")
  await mkdir(uploadDir, {recursive:true})

  const timestamp = Date.now();
  const filepath = path.join(uploadDir,`resume_${timestamp}.pdf`)
  await writeFile(filepath, buffer)


  return NextResponse.json({
    status: 200,
    url: filepath
  });

  } catch (error) {
      console.log(error)
  }

}


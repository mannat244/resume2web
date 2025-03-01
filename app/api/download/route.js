import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const fileName = url.searchParams.get("file");

        if (!fileName) {
            return NextResponse.json({ error: "File name required" }, { status: 400 });
        }

        const filePath = path.join("/tmp", fileName);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const fileData = fs.readFileSync(filePath);

        // Delete file after response
        setTimeout(() => {
            try {
                fs.unlinkSync(filePath);
                console.log(`File ${fileName} deleted successfully!`);
            } catch (err) {
                console.error("Error deleting file:", err);
            }
        }, 5000);

        return new NextResponse(fileData, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
                "Content-Disposition": `attachment; filename="${fileName}"`,
            },
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function isImage(file) {
    return VALID_EXT.has(path.extname(file).toLowerCase());
}

export async function GET() {
    const relDir = "assets/product";
    const absDir = path.join(process.cwd(), "public", relDir);

    try {
        const files = await fs.readdir(absDir);
        const images = files
            .filter(isImage)
            .map((file, index) => ({
                src: `/${relDir}/${file}`,
                title: `Produk ${index + 1}`
            }));

        return NextResponse.json(images);
    } catch (error) {
        console.error("Error reading product directory:", error);
        return NextResponse.json([], { status: 500 });
    }
}

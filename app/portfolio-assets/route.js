import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // biar dev selalu update

const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function isImage(file) {
    return VALID_EXT.has(path.extname(file).toLowerCase());
}

function extractNumber(filename) {
    // Ambil angka pertama di nama file (s1 -> 1, d12 -> 12)
    const m = filename.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

async function readCategory(relDir) {
    // relDir contoh: "assets/portfolio/Design"
    const absDir = path.join(process.cwd(), "public", relDir);

    let files = [];
    try {
        files = await fs.readdir(absDir);
    } catch {
        // folder tidak ada
        return [];
    }

    const allImages = files.filter(isImage);

    // base image = yang bukan _hover
    const baseImages = allImages.filter((f) => !f.includes("_hover"));

    // Sort natural by number (d1, d2, d10, dst)
    baseImages.sort((a, b) => extractNumber(a) - extractNumber(b));

    // Pairing hover jika ada (boleh beda ekstensi)
    return baseImages.map((base) => {
        const ext = path.extname(base);
        const stem = base.slice(0, -ext.length); // d1 dari d1.png

        const hover =
            allImages.find((f) => f.startsWith(`${stem}_hover.`)) || null;

        return {
            img: `/${relDir}/${base}`,
            hover: hover ? `/${relDir}/${hover}` : null,
        };
    });
}

export async function GET() {
    const [software, hardware, design] = await Promise.all([
        readCategory("assets/portfolio/Software"),
        readCategory("assets/portfolio/Hardware"),
        readCategory("assets/portfolio/Design"),
    ]);

    return NextResponse.json({ software, hardware, design });
}

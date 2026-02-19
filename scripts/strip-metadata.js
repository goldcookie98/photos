import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

async function processImages() {
    console.log('Scanning for images...');
    const files = await getFiles(IMAGES_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    console.log(`Found ${imageFiles.length} images.`);

    for (const file of imageFiles) {
        try {
            const buffer = await fs.readFile(file);
            await sharp(buffer)
                .rotate() // Auto-rotate based on EXIF before stripping
                .strip() // Remove all metadata
                .toFile(file); // Overwrite original
            console.log(`Processed: ${path.relative(IMAGES_DIR, file)}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
    console.log('Metadata removal complete.');
}

processImages();

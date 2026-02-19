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

    let processedCount = 0;
    for (const file of imageFiles) {
        try {
            const buffer = await fs.readFile(file);
            // sharp() reads the image.
            // .rotate() auto-orients based on EXIF (if present) and applies the rotation to the pixel data.
            // By NOT calling .withMetadata() or .keepMetadata(), sharp should drop all metadata in the output.
            await sharp(buffer)
                .rotate()
                .toFile(file);

            process.stdout.write(`.`);
            processedCount++;
        } catch (error) {
            console.error(`\nError processing ${file}:`, error.message);
        }
    }
    console.log(`\nProcessed ${processedCount} images.`);
}

processImages();

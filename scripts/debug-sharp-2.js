import sharp from 'sharp';
import fs from 'fs/promises';

const TEST_FILE = 'public/images/ConductLDN/_DSC0153.JPG';

async function test() {
    try {
        const buffer = await fs.readFile(TEST_FILE);
        const instance = sharp(buffer);

        console.log('Instance has strip:', typeof instance.strip);

        // Try strip only
        // await instance.strip().toFile(TEST_FILE + '.stripped');

        // Try rotate then output
        // await sharp(buffer).rotate().toFile(TEST_FILE + '.rotated');

        console.log('Rotate returns:', sharp(buffer).rotate().constructor.name);

    } catch (error) {
        console.error('Error:', error);
    }
}

test();

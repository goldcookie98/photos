import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TEST_FILE = 'public/images/ConductLDN/_DSC0153.JPG';

async function test() {
    try {
        const buffer = await fs.readFile(TEST_FILE);
        console.log('Read buffer');
        const pipeline = sharp(buffer);
        console.log('Created pipeline');

        // Check available methods
        console.log('Has rotate:', typeof pipeline.rotate);
        console.log('Has strip:', typeof pipeline.strip);

        await pipeline
            .rotate()
            .withMetadata({ density: undefined }) // Alternative to strip for now? No, strip() is better.
            .toFile(TEST_FILE + '.tmp');

        console.log('Success with rotate/withMetadata');

        // Retrying strip
        await sharp(buffer).rotate().strip().toFile(TEST_FILE);
        console.log('Success with rotate/strip');

    } catch (error) {
        console.error('Error:', error);
    }
}

test();

import * as sharpPkg from 'sharp';
import sharpDefault from 'sharp';

console.log('Sharp default:', typeof sharpDefault);
console.log('Sharp pkg keys:', Object.keys(sharpPkg));

const instance = sharpDefault();
console.log('Instance keys:', Object.keys(instance));
console.log('Prototype keys:', Object.keys(Object.getPrototypeOf(instance)));

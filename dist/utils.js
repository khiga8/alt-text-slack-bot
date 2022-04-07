"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponseText = exports.getImageNamesWithMissingAltText = void 0;
const getImageNamesWithMissingAltText = (files) => {
    console.log(files);
    return files.filter((file) => {
        return (file.mimetype.includes('image') && file.alt_txt === undefined);
    }).map((file) => { return file.name; });
};
exports.getImageNamesWithMissingAltText = getImageNamesWithMissingAltText;
const generateResponseText = (filesnamesMissingAltText) => {
    if (filesnamesMissingAltText.length === 1) {
        return `Uh oh! The image you shared is missing alt text so it won't be accessible to your teammates ` +
            `who are blind or have low-vision. \n\nSimply activate the *More actions* menu on the image,` +
            `choose *Edit file details*, and modify the *Description* field to add alt text.❤️`;
    }
    else {
        const joinedFileNames = filesnamesMissingAltText.map(name => `\`${name}\``).join(', ');
        return `Uh oh! The following images you shared are missing alt text:${joinedFileNames}. ` +
            `This means it won't be accesible to your teammates who are blind or have low-vision.\n\n` +
            `For each image, simply activate the *More actions* menu, choose *Edit file details*, and modify the ` +
            `*Description* to add an alt text. This ensures it is accessible to your teammates who may be blind or have low-vision.❤️`;
    }
};
exports.generateResponseText = generateResponseText;
//# sourceMappingURL=utils.js.map
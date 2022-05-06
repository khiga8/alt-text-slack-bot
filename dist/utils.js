"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponseText = exports.getImageNamesWithMissingAltText = void 0;
/**
 * Returns an array of image names with missing alt text
 *
 * @param {any[]} files An array of file objects retrieved by the Slack API
 * @return {string[]} An array of filenames that are images with missing alt text.
 */
const getImageNamesWithMissingAltText = (files) => {
    return files.filter((file) => {
        return (file.mimetype.includes('image') && file.alt_txt === undefined);
    }).map((file) => { return file.name; });
};
exports.getImageNamesWithMissingAltText = getImageNamesWithMissingAltText;
/**
 * Returns text based on messsage file count and count of images with missing alt text
 *
 * @param {number} fileCount The total number of files shared within a single message.
 * @param {string[]} filenamesMissingAltText The total number of images missing alt text within a single message.
 * @return {string} A generated response text.
 */
const generateResponseText = (fileCount, filesnamesMissingAltText) => {
    const instructions = `On Desktop, activate the *More actions* menu on the image, choose *Edit file details*, and modify the ` +
        `*Description* field to add alt text. On Android, long press the image and select *Add description*. If adding alt is not supported on your device,` +
        ` simply provide alt text in a follow-up message. ❤️`;
    if (fileCount === 1) {
        return `Uh oh! The image you shared is missing alt text so it won't be accessible to your teammates ` +
            `who are blind or have low-vision. \n\n` + instructions;
    }
    else {
        const joinedFileNames = filesnamesMissingAltText.map(name => `\`${name}\``).join(', ');
        return `Uh oh! The following images are missing alt text: ${joinedFileNames}. ` +
            `This means it won't be accessible to your teammates who are blind or have low-vision.\n\n` +
            instructions;
    }
};
exports.generateResponseText = generateResponseText;
//# sourceMappingURL=utils.js.map
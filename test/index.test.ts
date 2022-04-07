import { generateResponseText, getImageNamesWithMissingAltText } from "./../src/utils";

describe('utils', () => {
  describe('getImageNamesWithMissingAltText', () => {
    test('returns nothing when no image files are shared', () => {
      const files = [
        {mimetype: 'application/pdf'}, 
        {mimetype: 'application/octet-stream'}
      ]
      const output = getImageNamesWithMissingAltText(files)
      expect(output).toEqual([])
    });

    test('returns only the image file names with missing alt text when various files are shared', () => {
      const files = [
        {mimetype: 'text/html'}, 
        {name: 'something', mimetype: 'text/css'}, 
        {name: 'missing.jpg', mimetype: 'image/jpeg'},
        {name: 'good.jpg', alt_txt: 'my cute grandma', mimetype: 'image/png]'}
      ]
      const output = getImageNamesWithMissingAltText(files)
      expect(output).toEqual(['missing.jpg'])
    });
  })

  describe('generateResponseText', () => {
    test('returns correct message when message contains single image with missing alt', () => {
      const fileNames = ['bad.jpg']
      const output = generateResponseText(fileNames)
      expect(output).toEqual(`Uh oh! The image you shared is missing alt text so it won't be accessible to your teammates `+
      `who are blind or have low-vision. \n\nSimply activate the *More actions* menu on the image,`+
      `choose *Edit file details*, and modify the *Description* field to add alt text.❤️`)
    });

    test('returns correct message when message contains multiple images with missing alt', () => {
      const fileNames = ['bad.jpg', 'alsobad.jpg']
      const output = generateResponseText(fileNames)
      expect(output).toEqual(`Uh oh! The following images you shared are missing alt text:\`bad.jpg\`, \`alsobad.jpg\`. `+
      `This means it won't be accesible to your teammates who are blind or have low-vision.\n\n`+
      `For each image, simply activate the *More actions* menu, choose *Edit file details*, and modify the `+
      `*Description* to add an alt text. This ensures it is accessible to your teammates who may be blind or have low-vision.❤️`)
    });
  })
});
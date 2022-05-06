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
      const numberOfFilesInMessage = 1
      const fileNames = ['bad.jpg']
      const output = generateResponseText(numberOfFilesInMessage, fileNames)
      expect(output).toEqual(`Uh oh! The image you shared is missing alt text so it won't be accessible to your teammates `+
      `who are blind or have low-vision. \n\nOn Desktop, activate the *More actions* menu on the image, choose *Edit file details*, `+
      `and modify the *Description* field to add alt text. On Android, long press the image and select **Add description**. If adding ` +
      `alt is not supported on your device, simply provide alt text in a follow-up message. ❤️`)
    });

    test('returns correct message when message contains multiple images with missing alt', () => {
      const numberOfFilesInMessage = 4
      const fileNames = ['bad.jpg', 'alsobad.jpg']
      const output = generateResponseText(numberOfFilesInMessage, fileNames)
      expect(output).toEqual(`Uh oh! The following images are missing alt text: \`bad.jpg\`, \`alsobad.jpg\`. `+
      `This means it won't be accessible to your teammates who are blind or have low-vision.\n\n`+
      `On Desktop, activate the *More actions* menu on the image, choose *Edit file details*, and modify the *Description* field to add alt text. `+
      `On Android, long press the image and select **Add description**. If adding alt is not supported on your device, simply provide alt text in a follow-up message. ❤️`)
    });
  })
});

/* eslint-disable max-len */
/** @exports */
const baseSvgTag = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" version="1.1"></svg>';


const newImage = (sourceImage = baseSvgTag) => ({
  getImage: () => sourceImage,
  add: (element) => {
    const sourceImageArray = sourceImage.split('');
    const insertPosition = sourceImageArray.length - '</svg>'.length;
    const image = [
      ...(sourceImageArray.slice(0, insertPosition)),
      element,
      ...(sourceImageArray.slice(insertPosition, sourceImageArray.length)),
    ];

    return newImage(image.join(''));
  },

  circle: ({
    x, y, size, color, borderWidth, borderColor,
  }) => newImage(sourceImage)
    .add(
      `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  square: ({
    x, y, size, color, borderWidth, borderColor,
  }) => newImage(sourceImage)
    .add(
      `<rect x="${x}" y="${y}" width="${size}" height="${size}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  rectangle: ({
    x, y, width, height, color, borderWidth, borderColor,
  }) => newImage(sourceImage)
    .add(
      `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  ellipse: ({
    x, y, width, height, color, borderWidth, borderColor,
  }) => newImage(sourceImage)
    .add(
      `<ellipse cx="${x + width / 2}" cy="${y + height / 2}" rx="${width / 2}" ry="${height / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),
});

module.exports = {
  newImage,
};

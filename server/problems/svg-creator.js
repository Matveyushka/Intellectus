const svgCreator = {};

svgCreator.newImage = () => {
  const svgImage = {};

  svgImage.image = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" version="1.1"></svg>';

  svgImage.add = (element) => {
    const newImage = svgImage.image.split('');
    newImage.splice(svgImage.image.length - '</svg>'.length, 0, element);
    svgImage.image = newImage.join('');
  };

  svgImage.circle = (x, y, diameter, color, borderWidth, borderColor) => {
    svgImage.add(
      `<circle cx="${x + diameter / 2}" cy="${y + diameter / 2}" r="${diameter / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    );
  };

  svgImage.square = (x, y, size, color, borderWidth, borderColor) => {
    svgImage.add(
      `<rect x="${x}" y="${y}" width="${size}" height="${size}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    );
  };

  svgImage.rectangle = (x, y, width, height, color, borderWidth, borderColor) => {
    svgImage.add(
      `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    );
  };

  return svgImage;
};


module.exports = svgCreator;

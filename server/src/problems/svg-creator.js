/* eslint-disable max-len */
const {
  greenColor,
  grayColor,
  redColor,
  transparentColor,
} = require('./constants');

const baseSvgTag = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" version="1.1"></svg>';

const defaultBorderRadius = 0;
const defaultBorderWidth = 0;
const defaultBorderColor = transparentColor;

const smallFigureSize = 28;

const newSmallFigureParams = (x, y, color) => ({
  x,
  y,
  size: smallFigureSize,
  color,
});

const smallFigures = [
  (image, x, y) => image.circle(newSmallFigureParams(x, y, greenColor)),
  (image, x, y) => image.circle(newSmallFigureParams(x, y, grayColor)),
  (image, x, y) => image.triangle(newSmallFigureParams(x, y, redColor)),
  (image, x, y) => image.pentagon(newSmallFigureParams(x, y, redColor)),
  (image, x, y) => image.square(newSmallFigureParams(x, y, grayColor)),
  (image, x, y) => image.triangle(newSmallFigureParams(x, y, grayColor)),
  (image, x, y) => image.circle(newSmallFigureParams(x, y, redColor)),
  (image, x, y) => image.triangle(newSmallFigureParams(x, y, greenColor)),
  (image, x, y) => image.square(newSmallFigureParams(x, y, redColor)),
  (image, x, y) => image.pentagon(newSmallFigureParams(x, y, grayColor)),
  (image, x, y) => image.square(newSmallFigureParams(x, y, greenColor)),
  (image, x, y) => image.pentagon(newSmallFigureParams(x, y, greenColor)),
];

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

  rotate: (angle, xOrigin, yOrigin) => {
    const sourceImageArray = sourceImage.split('');
    const insertPosition = sourceImage.indexOf('/>');
    const image = [
      ...(sourceImageArray.slice(0, insertPosition)),
      ` transform="rotate(${angle} ${xOrigin} ${yOrigin})"`,
      ...(sourceImageArray.slice(insertPosition, sourceImageArray.length)),
    ];

    return newImage(image.join(''));
  },

  circle: ({
    x, y, size, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  square: ({
    x, y, size, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<rect x="${x}" y="${y}" rx="${defaultBorderRadius}" ry="${defaultBorderRadius}" width="${size}" height="${size}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  rectangle: ({
    x, y, width, height, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<rect x="${x}" y="${y}" rx="${defaultBorderRadius}" ry="${defaultBorderRadius}" width="${width}" height="${height}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  triangle: ({
    x, y, size, width, height, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => {
    const usedWidth = (width || size);
    const usedHeight = (height || size);

    return newImage(sourceImage)
      .add(
        `<polygon points="${x},${y + usedHeight} ${x + usedWidth / 2},${y} ${x + usedWidth},${y + usedHeight}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
      );
  },

  ellipse: ({
    x, y, width, height, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<ellipse cx="${x + width / 2}" cy="${y + height / 2}" rx="${width / 2}" ry="${height / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  pentagon: ({
    x, y, size, width, height, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => {
    const usedWidth = (width || size);
    const usedHeight = (height || size);

    return newImage(sourceImage)
      .add(
        `<polygon points="${x + usedWidth * 0.5},${y} ${x + usedWidth},${y + usedHeight * 0.42} ${x + usedWidth * 0.8},${y + usedHeight} ${x + usedWidth * 0.2},${y + usedHeight} ${x},${y + usedHeight * 0.42}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
      );
  },

  line: ({
    xBegin, yBegin, xEnd, yEnd, color,
  }) => newImage(sourceImage)
    .add(`<line x1="${xBegin}" y1="${yBegin}" x2="${xEnd}" y2="${yEnd}" stroke-width="4" stroke="${color}" />`),

  arrow: ({
    x, y, size, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<polygon points="${x},${y + size / 2} ${x + size / 2},${y} ${x + size},${y + size / 2} ${x + size * 0.66},${y + size / 2} ${x + size * 0.66},${y + size} ${x + size * 0.33},${y + size} ${x + size * 0.33},${y + size / 2}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  navigationArrow: ({
    x, y, size, color, borderWidth = defaultBorderWidth, borderColor = defaultBorderColor,
  }) => newImage(sourceImage)
    .add(
      `<polygon points="${x + size / 2},${y} ${x + size},${y + size} ${x + size / 2},${y + size * 0.5} ${x},${y + size}" stroke="${borderColor}" stroke-width="${borderWidth}" fill="${color}" />`,
    ),

  drawSmallFigure: (seed, position) => {
    const spaceSize = 4;
    const numberOfElementsInLine = 3;

    const xPosition = spaceSize
      + (position % numberOfElementsInLine)
      * (spaceSize + smallFigureSize);

    const yPosition = spaceSize
      + Math.floor(position / numberOfElementsInLine)
      * (spaceSize + smallFigureSize);

    return smallFigures[seed % smallFigures.length](newImage(sourceImage), xPosition, yPosition);
  },
});

module.exports = {
  newImage,
};

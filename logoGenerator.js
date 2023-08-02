const readline = require('readline');
const fs = require('fs');

// consts
const DEFAULT_SVG_WIDTH = 300;
const DEFAULT_SVG_HEIGHT = 200;
const SHAPES = ['circle', 'triangle', 'square'];
const DEFAULT_SHAPE_COLOR = '#ffffff'; 

// make svg
function createSVG(text, textColor, shape, shapeColor, width, height) {
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${shapeColor}" />
      <text x="50%" y="50%" font-size="50" fill="${textColor}" dominant-baseline="middle" text-anchor="middle">${text}</text>
    </svg>
  `;
  return svgContent;
}

// svg go to file yes :) 
function createLogoSVG(text, textColor, shape, shapeColor, width, height) {
  if (!SHAPES.includes(shape.toLowerCase())) {
    console.error('Invalid shape chosen. Exiting...');
    return;
  }

  const svgContent = createSVG(text, textColor, shape, shapeColor, width, height);
  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error writing the SVG file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

// type pls 
function promptUserInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// app start (i hope)
async function generateLogo() {
  try {
    const text = await promptUserInput('Enter up to three characters for the logo: ');
    const textColor = await promptUserInput('Enter text color (keyword or hexadecimal number): ');
    const shape = await promptUserInput(`Choose a shape from ${SHAPES.join(', ')}: `);
    const shapeColor = await promptUserInput('Enter shape color (keyword or hexadecimal number): ');

    const widthInput = await promptUserInput(`Enter the SVG width (default: ${DEFAULT_SVG_WIDTH}): `);
    const width = parseInt(widthInput) || DEFAULT_SVG_WIDTH;

    const heightInput = await promptUserInput(`Enter the SVG height (default: ${DEFAULT_SVG_HEIGHT}): `);
    const height = parseInt(heightInput) || DEFAULT_SVG_HEIGHT;

    createLogoSVG(text, textColor, shape, shapeColor, width, height);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

generateLogo();

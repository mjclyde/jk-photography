const fs = require('fs');
var sizeOf = require('image-size');

const files = fs.readdirSync('src/assets/slide-show');

const tallImages = [];
const wideImages = [];
files.forEach((file) => {
  const {
    width,
    height
  } = sizeOf(`src/assets/slide-show/${file}`);

  if (width < 1400) {
    tallImages.push({
      url: `assets/slide-show/${file}`,
      width,
      height
    });
  } else {
    wideImages.push({
      url: `assets/slide-show/${file}`,
      width,
      height
    });
  }

});

fs.writeFileSync(`src/assets/tall-images.json`, JSON.stringify(tallImages), 'utf8');
fs.writeFileSync(`src/assets/wide-images.json`, JSON.stringify(wideImages), 'utf8');
console.log('Done');

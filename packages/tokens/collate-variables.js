const fs = require('fs');
const path = require('path');

const folderPath = './src/css';
const outputFilePath = './src/variables.css';

function concatenateFilesInFolder(folderPath, outputFilePath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    const allFilesContent = files.reduce((content, file) => {
      const filePath = path.join(folderPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return content + fileContent + '\n';
      }
      return content;
    }, '');

    fs.writeFileSync(outputFilePath, allFilesContent, 'utf8');
    console.log(`All files have been concatenated into ${outputFilePath}`);
  });
}

concatenateFilesInFolder(folderPath, outputFilePath);

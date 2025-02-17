const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mime = require('mime-types');

const app = express();
const PORT = 3000;

// Directorio donde se almacenan los archivos
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Configuración de EJS para las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, iconos, etc.)
app.use(express.static('public'));
// También se sirven los archivos subidos desde /files
app.use('/files', express.static(filesDir));

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Middleware para parsear formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal: muestra formularios de subida y la lista de archivos
app.get('/', (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.send('Error leyendo los archivos.');
    }
    res.render('index', { files });
  });
});

// Subir archivo ingresando contenido de texto
app.post('/upload', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) {
    return res.status(400).send('Falta el nombre del archivo o el contenido.');
  }
  const filePath = path.join(filesDir, filename);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al guardar el archivo.');
    }
    res.render('message', {
      title: 'Archivo Guardado',
      message: `El archivo <strong>${filename}</strong> se ha guardado correctamente.`,
    });
  });
});

// Subir archivo directamente mediante un input file
app.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ningún archivo.');
  }
  res.render('message', {
    title: 'Archivo Subido',
    message: `El archivo <strong>${req.file.originalname}</strong> se ha subido correctamente.`,
  });
});

// Endpoint para descargar el archivo (se inicia la descarga)
app.get('/getfile', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send('Falta el nombre del archivo.');
  }
  const filePath = path.join(filesDir, filename);
  res.download(filePath);
});

// Endpoint para previsualizar el archivo (imagen o texto)
app.get('/preview', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send('Falta el nombre del archivo.');
  }
  const filePath = path.join(filesDir, filename);
  const contentType = mime.lookup(filePath) || 'text/plain';

  if (contentType.startsWith('image/')) {
    res.render('preview_image', { filename });
  } else {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(404).send('Archivo no encontrado o no se puede leer.');
      }
      res.render('preview_text', { filename, data });
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

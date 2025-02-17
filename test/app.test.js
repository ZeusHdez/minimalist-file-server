import request from 'supertest';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import app from '../main.cjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server;

before(function (done) {
  // Inicia el servidor en un puerto distinto para los tests (por ejemplo, 3001)
  server = app.listen(3001, done);
});

after(function (done) {
  // Cierra el servidor al finalizar los tests
  server.close(done);
});

describe('Gestor de Archivos API', function () {
  // Test de la página principal
  describe('GET /', function () {
    it('debe retornar la página principal con HTML', function (done) {
      request(server).get('/').expect('Content-Type', /html/).expect(200, done);
    });
  });

  // Test para subir un archivo de texto mediante POST /upload
  describe('POST /upload', function () {
    it('debe subir un archivo de texto y retornar un mensaje de confirmación', function (done) {
      const filename = 'testfile.txt';
      const content = 'Este es un archivo de prueba.';
      request(server)
        .post('/upload')
        .send({ filename, content })
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.text).to.include('guardado correctamente');
          const filePath = path.join(__dirname, '../files', filename);
          fs.access(filePath, fs.constants.F_OK, function (err) {
            expect(err).to.be.null;
            // Eliminar el archivo creado para limpieza
            fs.unlinkSync(filePath);
            done();
          });
        });
    });
  });

  // Test para subir un archivo directamente mediante POST /upload-file
  describe('POST /upload-file', function () {
    it('debe subir un archivo directamente y retornar un mensaje de confirmación', function (done) {
      const filename = 'upload_test.txt';
      request(server)
        .post('/upload-file')
        .attach('file', Buffer.from('Contenido de prueba para subida directa'), filename)
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.text).to.include('subido correctamente');
          const filePath = path.join(__dirname, '../files', filename);
          fs.access(filePath, fs.constants.F_OK, function (err) {
            expect(err).to.be.null;
            fs.unlinkSync(filePath);
            done();
          });
        });
    });
  });

  // Test para descargar un archivo mediante GET /getfile
  describe('GET /getfile', function () {
    it('debe descargar el archivo solicitado', function (done) {
      const filename = 'download_test.txt';
      const filePath = path.join(__dirname, '../files', filename);
      fs.writeFileSync(filePath, 'Contenido de prueba para descarga');
      request(server)
        .get('/getfile')
        .query({ filename })
        .expect(200)
        .expect('Content-Disposition', /attachment/)
        .end(function (err, res) {
          fs.unlinkSync(filePath);
          if (err) return done(err);
          done();
        });
    });
  });

  // Test para previsualizar un archivo de texto mediante GET /preview
  describe('GET /preview', function () {
    it('debe previsualizar un archivo de texto', function (done) {
      const filename = 'preview_test.txt';
      const content = 'Contenido de prueba para previsualización';
      const filePath = path.join(__dirname, '../files', filename);
      fs.writeFileSync(filePath, content);
      request(server)
        .get('/preview')
        .query({ filename })
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          expect(res.text).to.include(content);
          fs.unlinkSync(filePath);
          if (err) return done(err);
          done();
        });
    });
  });

  // Tests para casos de error cuando falta el parámetro "filename"
  describe('Casos de Error', function () {
    it('debe retornar error 400 si falta el nombre del archivo en GET /getfile', function (done) {
      request(server).get('/getfile').expect(400, done);
    });
    it('debe retornar error 400 si falta el nombre del archivo en GET /preview', function (done) {
      request(server).get('/preview').expect(400, done);
    });
  });
});

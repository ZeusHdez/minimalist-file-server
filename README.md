# Gestor de Archivos
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-blue.svg)](https://nodejs.org/)

Esta aplicación es un gestor de archivos que permite subir, visualizar y descargar archivos a través de una interfaz web moderna. Se pueden subir archivos ingresando el contenido de texto o subiéndolos directamente desde el sistema. Los archivos se listan en una interfaz con un tema oscuro y acentos en rojo, similar a la estética de Google Drive. Además, al hacer clic sobre un archivo se inicia la descarga automáticamente y se ofrece la opción de previsualizarlo (mostrando la imagen o el contenido de texto, según corresponda).

## Características

- **Subir archivo por contenido de texto:** Permite crear un archivo escribiendo su nombre y contenido.
- **Subir archivo directamente:** Permite subir archivos desde tu sistema.
- **Lista de archivos:** Muestra todos los archivos subidos con opciones para descargar o previsualizar.
- **Descarga automática:** Al hacer clic sobre el archivo se inicia la descarga.
- **Previsualización:** Se muestra la imagen (si el archivo es una imagen) o el contenido en formato de texto (si es un archivo de texto).
- **Interfaz moderna:** Tema oscuro con acentos rojos, botones con iconos minimalistas y un diseño inspirado en Google Drive.

## Requisitos

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- npm (Node Package Manager)

## Instalación

1. **Clona el repositorio o descarga el código fuente.**

2. **Navega al directorio del proyecto** en la terminal.
3. **Inicializa el proyecto (si aún no lo has hecho):**
```bash
npm init -y
```
4. **Instala las dependencias necesarias:**
```bash
npm install express multer mime-types ejs
```

## Estructura del proyecto
```php
tu-proyecto/
├── app.js              # Archivo principal del servidor
├── files/              # Directorio donde se almacenan los archivos subidos
├── public/
│   └── style.css       # Archivo de estilos CSS
└── views/
    ├── index.ejs       # Vista principal (formularios y lista de archivos)
    ├── message.ejs     # Vista para mensajes de confirmación
    ├── preview_image.ejs  # Vista para previsualización de imágenes
    └── preview_text.ejs   # Vista para previsualización de archivos de texto
```

## Ejecución
1. Inicia el servidor desde el directorio del proyecto:
```bash
node app.js
```
2. Abre tu navegador y navega a http://localhost:3000 para acceder a la aplicación.

## Uso
- Subir Archivo de Texto:
Rellena el formulario "Subir Archivo (Texto)" con el nombre del archivo y su contenido, y haz clic en el botón "Subir Texto".

- Subir Archivo Directamente:
Selecciona un archivo desde tu sistema y haz clic en "Subir Archivo".

- Descargar o Previsualizar:
En la lista de archivos se muestran dos acciones para cada archivo:

- Descargar: Al hacer clic sobre el archivo se iniciará su descarga.
- Previsualizar: Al hacer clic en el icono de previsualización se mostrará una vista previa del archivo (imagen o texto, según corresponda).

## Personalización
- Estilos:
Puedes modificar el diseño de la aplicación editando el archivo public/style.css.

- Vistas:
Las plantillas EJS en la carpeta views se pueden personalizar para adaptar la interfaz a tus necesidades.

##Licencia
Este proyecto se distribuye bajo la **licencia MIT**. Consulta el archivo LICENSE para más detalles.

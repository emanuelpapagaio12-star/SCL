# SCL - Generación y Verificación de Código

Este proyecto es un sistema integrado para la creación y verificación de códigos IEC 61131-3, basado en el modelo "De la Generació a la Fiabilitat".

## 🚀 Características
- **Modelado Integrado**: Herramientas para la generación de código SCL funcional.
- **Interfaz Web**: Aplicación moderna construida con React y Vite para interactuar con el sistema.
- **Extracción de Datos**: Scripts de procesamiento de PDF para extraer información relevante de documentos técnicos.

## 📂 Estructura del Proyecto
- `scl_app/`: Aplicación frontend (React + Vite).
- `extract_pdf.py`: Script para extraer contenido de archivos PDF técnicos.
- `create_doc.py`: Script para generar documentación automatizada.
- `De la Generació a la Fiabilitat...pdf`: Documento guía del modelo.

## 🛠️ Instalación y Uso

### Frontend
1. Navega a la carpeta `scl_app`.
2. Instala las dependencias: `npm install`.
3. Inicia el servidor de desarrollo: `npm run dev`.
4. Para construir la versión de producción: `npm run build`.

### Scripts Python
Asegúrate de tener instaladas las dependencias necesarias:
`pip install PyPDF2 python-docx` (según se requiera).

## 🌐 GitHub Pages
La aplicación está configurada para desplegarse automáticamente en GitHub Pages mediante GitHub Actions. 
Puedes ver la versión funcional aquí: [https://emanuelpapagaio12-star.github.io/SCL/](https://emanuelpapagaio12-star.github.io/SCL/)

---
**Desarrollado para el proyecto SCL.**

# 🎵 SonicRoots: Genealogía Musical

**SonicRoots** es una aplicación web interactiva diseñada para explorar y visualizar la evolución de los géneros musicales. A través de un árbol genealógico dinámico, los usuarios pueden descubrir las raíces de sus bandas favoritas, escuchar ejemplos de audio y entender cómo se conectan los diferentes estilos musicales a lo largo de la historia.

## ✨ Características Principales

*   **Búsqueda de Bandas:** Integración con **MusicBrainz** y **Last.fm** para encontrar información precisa sobre bandas, su género principal, país de origen y año de formación.
*   **Árbol Genealógico Interactivo:** Visualización de grafos utilizando **Mermaid.js**.
    *   **Navegación:** Zoom, Panning (arrastrar) y soporte para gestos táctiles (Pinch-to-zoom) en móviles.
    *   **Expansión Dinámica:** Haz clic en un nodo para cargar sus géneros "padre" (orígenes) en tiempo real.
    *   **Búsqueda Profunda:** Icono de lupa en los nodos para buscar orígenes desconocidos usando **Wikidata** y **Wikipedia**.
*   **Detalles Multimedia:**
    *   Modales con biografías detalladas (con soporte para "Leer más/menos").
    *   Previsualización de audio (30s) mediante la API de **iTunes**.
    *   Integración con **YouTube** para ver videos relacionados.
    *   Enlaces directos a **Spotify**.
*   **Internacionalización (i18n):** Soporte completo para 7 idiomas:
    *   🇺🇸 Inglés, 🇪🇸 Español, 🇫🇷 Francés, 🇩🇪 Alemán, 🇮🇹 Italiano, 🇧🇷 Portugués, 🇯🇵 Japonés.
*   **Exportación:** Generación de archivos PDF con el árbol genealógico en formato texto/ASCII coloreado para fácil lectura offline.
*   **Estética Cyberpunk:** Interfaz moderna con colores neón, modo oscuro y fondo de partículas animado.

## 🛠️ Tecnologías y APIs

Este proyecto está construido con **Vanilla JavaScript** (sin frameworks pesados) y utiliza las siguientes librerías y servicios:

### Librerías
*   **[Mermaid.js](https://mermaid.js.org/):** Para la renderización de los gráficos de nodos y conexiones.
*   **[jsPDF](https://github.com/parallax/jsPDF):** Para la generación y descarga de archivos PDF.

### APIs Externas
1.  **Last.fm API:** Fuente principal para biografías, tags de géneros y artistas similares.
2.  **MusicBrainz API:** Datos estructurados de las bandas (país, fechas, relaciones).
3.  **Wikidata & Wikipedia API:** Utilizadas para la "Búsqueda Profunda" de orígenes de géneros y descripciones alternativas.
4.  **iTunes Search API:** Para obtener fragmentos de audio y carátulas de alta calidad.

## 🚀 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/sonicroots.git
    ```

2.  **Configuración:**
    *   El proyecto funciona directamente en el navegador.
    *   No requiere compilación (build step).
    *   *Nota:* Para evitar problemas de CORS con algunas APIs o módulos ES6, se recomienda usar un servidor local simple (como Live Server en VS Code).

3.  **Ejecutar:**
    *   Abre `index.html` en tu navegador.

## 🎮 Cómo usar

1.  **Buscar:** Escribe el nombre de una banda (ej. "Nirvana", "Daft Punk") en la barra de búsqueda.
2.  **Explorar:**
    *   Verás la información de la banda y su género principal.
    *   Abajo se generará el árbol genealógico inicial.
3.  **Interactuar:**
    *   **Click en un nodo:** Abre un modal con info y expande el árbol hacia atrás (sus orígenes).
    *   **Click en la lupa (🔍):** Fuerza una búsqueda en la web si el género no tiene datos locales.
    *   **Zoom:** Usa la rueda del ratón o los botones en pantalla.
4.  **Descargar:** Usa el botón "📄 Descargar PDF" para guardar tu descubrimiento.

## 📂 Estructura del Proyecto

```text
📂 sonicroots/
├── index.html      # Estructura principal
├── style.css       # Estilos (Tema Cyberpunk/Neon)
├── script.js       # Lógica principal, manejo de APIs y Gráficos
└── README.md       # Documentación
```

## 🧠 Lógica de Datos

La aplicación utiliza un sistema híbrido de datos:
1.  **Base de Datos Semilla (Local):** Contiene cientos de relaciones de géneros predefinidas (ej. "Grunge" viene de "Alternative Rock" y "Hardcore Punk") para una carga instantánea.
2.  **Descubrimiento Dinámico:** Si un género no está en la base local, la app consulta Wikidata/Wikipedia en tiempo real y "aprende" la nueva relación, guardándola en la sesión.
3.  **Limpieza de Datos:** Algoritmos internos limpian las respuestas de texto (eliminando referencias bibliográficas `[1]`, `[cita requerida]`) para ofrecer una lectura limpia.

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de contribuir o modificarlo.

---

*Desarrollado con ❤️ y mucha música.*
# Super Mario Bros - Phaser

Este es un proyecto básico del videojuego **Super Mario Bros** desarrollado con [Phaser](https://phaser.io/) y JavaScript. Es una aplicación estática que puede ejecutarse fácilmente en cualquier navegador web moderno.

## 🚀 ¿Qué incluye?

- Phaser (motor de videojuegos 2D)
- Mario básico con movimientos, físicas y colisiones
- Contenerización con Docker + Nginx

---

## 🐳 Ejecutar con Docker

### 1. Clona este repositorio

```bash
git clone https://github.com/sbastianr/Super-Mario-Bros.git
cd Super-Mario-Bros
````

### 2. Construye la imagen

```bash
docker build -t super-mario-bros .
```

### 3. Ejecuta el contenedor

```bash
docker run -p 8080:80 super-mario-bros
```

### 4. Abre tu navegador

Accede a [http://localhost:8080](http://localhost:8080) y ¡juega!

---

## 📦 Estructura del proyecto

```
Super-Mario-Bros/
├── assets/             # Recursos (imágenes, sonidos, etc.)
├── index.html          # Archivo HTML principal
├── animations.js       # Animaciones del juego
├── audio.js            # Audio del juego
├── controls.js         # Controles de movimiento
├── game.js             # Lógica principal del juego
├── spritesheet.js      # Manejo del spritesheet
├── phaser.min.js       # Librería Phaser
├── Dockerfile          # Configuración Docker
└── README.md           # README
```

---

## 📝 Licencia

Este proyecto es solo para fines educativos. Todos los recursos pertenecen a sus respectivos autores.

```

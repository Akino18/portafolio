# Mi Portafolio - Desarrollador Full Stack

Un portafolio moderno y elegante diseñado con React Router v7, Tailwind CSS y los colores negro y dorado.

## 🎨 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Menú Lateral**: Navegación intuitiva con animaciones suaves
- **Tema Negro y Dorado**: Colores elegantes y profesionales
- **Animaciones**: Efectos visuales atractivos y modernos
- **Secciones Completas**:
  - Hero/Inicio
  - Sobre mí
  - Proyectos
  - Habilidades
  - Contacto

## 🚀 Instalación y Desarrollo

1. **Instalar dependencias**:
```bash
npm install
```

2. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

3. **Construir para producción**:
```bash
npm run build
```

## 🛠️ Personalización

### Cambiar Información Personal

1. **En `app/routes/home.tsx`**:
   - Cambia "Tu Nombre" por tu nombre real
   - Actualiza la descripción profesional
   - Modifica los años de experiencia y proyectos completados
   - Personaliza los proyectos en la sección correspondiente

2. **Información de Contacto**:
   - Actualiza el email, teléfono y ubicación
   - Modifica los enlaces de redes sociales si los tienes

### Personalizar Proyectos

En la sección de proyectos, puedes:
- Cambiar los títulos y descripciones
- Actualizar las tecnologías utilizadas
- Agregar enlaces reales a demos y repositorios
- Cambiar los iconos/emojis

### Modificar Habilidades

Ajusta las categorías y tecnologías en la sección de habilidades según tu experiencia real.

### Colores y Estilos

Los colores principales están definidos en `app/app.css`:
- **Negro**: `#000000` y `#0A0A0A`
- **Dorado**: `#FFD700` y `#B8860B`

## 📁 Estructura del Proyecto

```
app/
├── components/
│   └── ScrollToTop.tsx    # Botón de scroll to top
├── routes/
│   └── home.tsx           # Página principal con todas las secciones
├── app.css                # Estilos principales
└── root.tsx               # Layout principal con menú lateral
```

## 🎯 Tecnologías Utilizadas

- **React Router v7**: Enrutamiento
- **Tailwind CSS**: Estilos y diseño responsivo
- **TypeScript**: Tipado estático
- **Vite**: Herramienta de construcción

## 📱 Responsive Design

El portafolio está optimizado para:
- Móviles (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🚀 Despliegue

Puedes desplegar este portafolio en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier servicio de hosting estático

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Disfruta creando tu portafolio profesional! 🎉

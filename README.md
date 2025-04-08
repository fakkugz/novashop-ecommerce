# 🛍️ NovaShop

NovaShop es una aplicación web de comercio electrónico desarrollada con React. Ofrece una experiencia de compra completa con listado de productos, filtrado avanzado, sistema de carrito, productos favoritos, autenticación de usuarios e historial de compras. Está diseñada con Material UI y utiliza la [FakeStore API](https://fakestoreapi.com/) como fuente de datos.

---

## ✨ Funcionalidades

- 🔎 Listado de productos con filtros por categoría, precio y calificación  
- 🛒 Carrito de compras con gestión de cantidades  
- ❤️ Añadir o quitar productos de favoritos  
- 📱 Diseño responsive para escritorio y móvil  
- 🔐 Inicio de sesión y gestión de perfil de usuario  
- 🧾 Historial de compras con generación simulada de órdenes  
- 🔄 Paginación para mejor rendimiento en grandes volúmenes de productos  

---

## 🧰 Tecnologías utilizadas

- **React** – Librería principal de desarrollo  
- **React Router** – Navegación entre páginas  
- **Context API** – Gestión global del estado  
- **Material UI** – Componentes y estilos  
- **FakeStore API** – Fuente de productos y usuarios simulados  

---

## 🚀 Cómo empezar

### Requisitos previos

- Node.js (>= 14.x)  
- npm o yarn  

### Instalación

```bash
git clone https://github.com/tu-usuario/novashop.git
cd novashop
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

---

## 📁 Estructura del proyecto (resumen)

```bash
src/
│
├── components/          # Componentes reutilizables
├── context/             # Estados globales (Carrito, Auth, etc.)
├── pages/               # Vistas principales (Home, Tienda, Login, etc.)
├── services/            # Llamadas a la API de fakestore
├── utils/               # Funciones utilitarias
├── App.jsx              # Estructura principal de la app
└── main.jsx             # Punto de entrada
```

---

## 🧪 Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo  
- `npm run build` – Genera la app para producción  
- `npm run preview` – Previsualiza la versión de producción  
- `npm run lint` – Ejecuta el linter (si está configurado)  

---

## 🙌 Contribuciones

¡Las contribuciones son bienvenidas!  
Podés hacer un fork del proyecto, crear una rama con tu funcionalidad o corrección y enviar un pull request.

---

## 📄 Licencia

Este proyecto es de código abierto y se distribuye bajo la [Licencia MIT](LICENSE).

---

## 🌐 Demo

[https://fakkugz.github.io/novashop-ecommerce/](https://fakkugz.github.io/novashop-ecommerce/)


---

## 📫 Contacto

Si tenés dudas, sugerencias o simplemente querés saludar:

- GitHub: [@tu-usuario](https://github.com/tu-usuario)  
- Email: tu.email@ejemplo.com

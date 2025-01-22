# Aztro Remix Tutorial!

Este proyecto utiliza "Remix" como framework para crear aplicaciones web rápidas, modernas y con excelente rendimiento.

## Índice

1. [Instalación](#Instalación)
2. [Conceptos Principales de Remix](#conceptos-principales-de-remix)
   - [Link](#1-link)
   - [Loader](#2-loader)
   - [Rutas Dinámicas](#3-rutas-dinámicas)
   - [Rutas Anidadas](#4-rutas-anidadas)
   - [Componente de Salida (Outlet)](#5-componente-de-salida)
3. [Recursos Adicionales](#recursos-adicionales)

---

## Instalación

1. Clona el repositorio en tu máquina local: 
git clone <URL_DEL_REPOSITORIO>

 2. Navega al directorio del proyecto
cd remix-contacts

 3. Instala las dependencias del proyecto:
npm install

4. Inicia el servidor de desarrollo
npm run dev
Abre el navegador y accede a http://localhost:3000 para ver la aplicación en funcionamiento.

## Conceptos Principales  de  Remix 

### 1. Link 
 El componente llamado Link, es utilizado para generar una navegación interna de la aplicación sin necesidad de que se recargue toda la aplicación. Lo que hace que el rendimiento sea mucho mejor y también la UX (experiencia de usuario) al cargar los datos que se le esten solicitando en la nueva vista. 



 ### 2. Loader 

 Un loader es una función del servidor que se utiliza para cargar datos antes de que se renderice una página o un componente. Esto permite que los datos siempre estén disponibles al momento de cargar la página.
 Los louders se ejecutan únicamente en el servidor, por lo que usan variables de entorno y hacer conexiones seguras a bases de datos. 

 ### 3. Rutas Dinámicas 

 Las rutas anidadas permiten capturar partes variables de variables de la URL. Esto se hace utilizando el formato
 de corchetes ([param]) en los nombres de los archivos de las rutas. 

 Estructura :
 app/routes/usuarios/[id].jsx
 
 

 ### 4. Rutas Anidadas

 Las rutas anidades nos permiten estructurar páginas con jerarquías. 

 Estructura:

app/routes/usuarios.jsx
app/routes/usuarios/detalles.jsx
app/routes/usuarios/configuracion.jsx


 ### 5. Componente de Salida

 Permite renderizar contenido de las subrutas dentro de un layout principal. Es decir, el componente Outlet es 
 una parte en Remix para manejar rutas anidadas. Funciona como un "placeholder" donde se renderizan las rutashijas(subrutas).


  



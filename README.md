# Aztro Remix Tutorial!

Este proyecto utiliza "Remix" como framework para crear aplicaciones web rápidas, modernas y con excelente rendimiento.

## Índice

1. [Instalación](#Instalación)
2. [Conceptos Principales de Remix](#conceptos-principales-de-remix)
   - [Link](#1-link)
   - [Rutas Dinámicas](#2-rutas-dinámicas)
   - [Rutas Anidadas](#3-rutas-anidadas)
   - [Componente de Salida (Outlet)](#4-componente-de-salida)
   - [Loader](#5-loader)
   - [useLoaderData](#6-useLoaderData)
   - [action](#7-action)
   - [useActionData](#8-useActionData)
   - [invariant](#9-invariant)

---

## Instalación

1. Clona el repositorio en tu máquina local:

git clone <URL_DEL_REPOSITORIO>

2.  Navega al directorio del proyecto:
    cd remix-contacts

3.  Instala las dependencias del proyecto:
    npm install

4.  Inicia el servidor de desarrollo
    npm run dev
    Abre el navegador y accede a http://localhost:3000 para ver la aplicación en funcionamiento.

## Conceptos Principales de Remix

### 1. Link

El componente llamado Link, es utilizado para generar una navegación interna de la aplicación sin necesidad de que se recargue toda la aplicación. Lo que hace que el rendimiento sea mucho mejor y también la UX (experiencia de usuario) al cargar los datos que se le esten solicitando en la nueva vista.

### 2. Rutas Dinámicas

Las rutas anidadas permiten capturar partes variables de variables de la URL. Esto se hace utilizando el formato
de corchetes ([param]) en los nombres de los archivos de las rutas.

Estructura :
app/routes/usuarios/[id].jsx

### 3. Rutas Anidadas

Las rutas anidades nos permiten estructurar páginas con jerarquías.

Estructura:

app/routes/usuarios.jsx
app/routes/usuarios/detalles.jsx
app/routes/usuarios/configuracion.jsx

### 4. Componente de Salida

Permite renderizar contenido de las subrutas dentro de un layout principal. Es decir, el componente Outlet es
una parte en Remix para manejar rutas anidadas. Funciona como un "placeholder" donde se renderizan las rutashijas(subrutas).

### 5. Loader

Un loader es una función del servidor que se utiliza para cargar datos antes de que se renderice una página o un componente. Esto permite que los datos siempre estén disponibles al momento de cargar la página. Su objetivo principal es cargar los datos necesarios para que el componente funcione. Por ejemplo, si se necesita mostrar una lista de usuarios, el loader se encargará de hacer una llamada a la base de datos o a una API para obtener los datos. Los louders se ejecutan únicamente en el servidor, por lo que usan variables de entorno y hacer conexiones seguras a bases de datos.

### 6. UseLoaderData

Es un hook que permite acceder a los datos que un loader ha cargado para un componente en una ruta de Remix. Este hook da acceso a los datos que devuelve el loader de una ruta específica. Remix optimiza la carga de datos, el cúal separa la lógica del servidor y del cliente, pero el hook permite consumir esos datos de manera declarativa en el cliente.

Resumen de useLoaderData:

1. El loader se ejecuta primero (en el servidor) y carga los datos.
2. useLoaderData los expone en el cliente para que se pueda usar en el componente.

Propósito - Consumir datos cargador por un loader.
Cuando se Ejecuta - Al cargar la página o ruta (GET).
Uso típico - Mostrar datos iniciales(ejemplo:lista de usuarios).

### 7. Action

Una acción(action) es una función que se ejecuta en respuesta a una solicitud POST,PUT,PATCH o DELETE en Remix. En otras palabras, es útil cuando se necesita manejar datos que envía el usuario desde un formulario, como al enviar información o realizar una operación en el servidor.

#### 8. UseActionData

Es un hook que sirve para acceder a los datos que devuelve una acción (action) en una ruta. Es decir, permite acceder a los datos devueltos por la función action después de que se ejecuta. Por ejemplo se puede usar para mostrar errores de validación o mensajes de éxito tras enviar un formulario.

Resumen de useActionData:

1. La acción maneja los datos enviados por el cliente (por ejemplo, un formulario).
2. useActionData permite consumir en el cliente los datos devueltos por la acción, como errores o mensajes de éxito.

Propósito - Consumir datos devueltos por una ación
Cuando se Ejecuta - Al enviar datos desde el cliente(POST,etc)
Uso típico - Manejar respuestas de formularios o acciones en el servidor.

### 9. Invariant

Es una función que se utiliza para asegurar que ciertas condiciones se cumplan en el código. Se usa como una Forma de validación en tiempo de ejecución, donde se puede verificar que una condición sea verdadera y, si no lo es, lanzar un error(generalmente con un mensaje explicativo).

Resumen de invariant:

1. Validar parámetrod o datos del servidor: Asegurese de que los datos enviados desde un loader o action son válidos.

import { json } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({ params }) => {
// Asegúrate de que el parámetro "postId" esté definido
invariant(params.postId, "El parámetro 'postId' es obligatorio");

const post = await obtenerPostPorId(params.postId);
invariant(post, `No se encontró un post con el ID ${params.postId}`);

return json(post);
};

2. Evitar fallos silenciosos en componentes: Si se espera un prop crítico en un componente, se puede usar invariant para asegurarse de que esté definido.

import invariant from "tiny-invariant";

function DetallesDelUsuario({ usuario }) {
// Valida que el usuario esté definido
invariant(usuario, "El prop 'usuario' es obligatorio");

return (
<div>
<h1>Nombre:{usuario.nombre}</h1>
</div>
);
}

En conclusión el invariant sirve para mantener el código más robusto y seguro. Ayuda a garantizar que ciertas condiciones se cumplan, especialmente en partes críticas como loaders, actions y validaciones de componentes.

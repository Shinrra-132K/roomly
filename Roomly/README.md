# Roomly — Marketplace de Alojamientos

## 1. Descripción del proyecto

Roomly es una aplicación web desarrollada con Angular que permite a los usuarios explorar alojamientos temporales, consultar sus características, seleccionar fechas de estancia, calcular el costo de una posible reserva y registrar reservas de manera simulada.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicación web estructurada con Angular que permita consultar alojamientos temporales, obtener cotizaciones y gestionar reservas simuladas.

### Objetivos específicos

- Mostrar información de los alojamientos disponibles.
- Facilitar la búsqueda y el filtrado de alojamientos.
- Presentar información detallada de cada alojamiento.
- Permitir seleccionar fechas y número de huéspedes para calcular una cotización.
- Registrar reservas solicitando los datos básicos del huésped.
- Consultar las reservas guardadas localmente en el navegador.

## 3. Integrantes del equipo

- **Integrante 1:** Maria Alejandra Carvajal Nepta
- **Integrante 2:** Carlos Eduardo Cobaleda Moreno
- **Integrante 3:** Julieth Silvana Vanegas Pérez


## 4. Tecnologías utilizadas

- **Angular:** desarrollo de la aplicación web y organización mediante componentes.
- **LocalStorage:** almacenamiento local de las reservas.
- **Node.js y npm:** entorno de ejecución y administración de dependencias.
- **Angular Router:** navegación entre las vistas de la aplicación.
- **Canva** entorno de elavoracion del prototipo.
- **WebtStorm** aplicativo de desarrollo.

## 5. Requisitos para ejecutar la aplicación

Antes de ejecutar el proyecto, es necesario contar con:

- Node.js instalado en el equipo o en una usb.
- npm, incluido con Node.js.
- Angular CLI compatible con la versión de Angular del proyecto.
- Un navegador web.
- El código fuente completo de Roomly.

## 6. Instalación

### 6.1. Obtener el proyecto

Descargar el archivo zip del proyecto proveniente del repositorio.

### 6.2. Instalar las dependencias

En el aplicativo de desarrollo se edita las configuraciones, crear una nueva configuracion para la instalacion de dependiencias y se le define la version del nodo.

Este proceso instala las dependencias necesarias para que el aplicativo web inicie.

## 7. Ejecución de la aplicación

Una vez instaladas las dependencias, ejecutar el Angular CLI server.

Cuando el servidor de desarrollo esté disponible, abrir el navegador y acceder a:

```text
http://localhost:4200/
```

Para ejecutar la aplicación y actualizarla durante el desarrollo, mantener activo el servidor iniciado.


## 8. Principales funcionalidades

### 8.1. Página inicial

Presenta la plataforma Roomly y permite acceder a la búsqueda y consulta de alojamientos.

### 8.2. Listado de alojamientos

Permite explorar los alojamientos disponibles y consultar información como nombre, ciudad, imagen, capacidad y precio por noche.

### 8.3. Búsqueda y filtrado

Facilita la localización de alojamientos según los criterios implementados en la aplicación, como ciudad, capacidad, tipo de alojamiento y precio.

### 8.4. Detalle del alojamiento

Permite consultar la información específica de un alojamiento seleccionado antes de iniciar una reserva.

### 8.5. Cotización de la estancia

Permite seleccionar las fechas de llegada y salida, así como el número de huéspedes. A partir de esta información se determina el número de noches y el valor de la estancia según la lógica implementada en el proyecto.

### 8.6. Registro de reservas

El componente `datocomponent` permite ingresar los datos básicos del huésped, como nombre y correo electrónico, para registrar una reserva simulada.

Las reservas se almacenan en el navegador utilizando la clave `roomly_reservas` de `localStorage`. No se envían a un servidor ni requieren una base de datos remota.

Cada reserva almacena información relacionada con el alojamiento, las fechas, los huéspedes, el valor total, los datos del titular, el estado y la fecha de registro.

### 8.7. Consulta de reservas

El componente `reservacomponent` permite consultar las reservas almacenadas localmente y visualizar sus datos principales, incluyendo alojamiento, ciudad, fechas de estancia, huéspedes, valor total y estado.

Si no existen reservas guardadas, se presenta un mensaje informativo al usuario.

## 9. Almacenamiento de los datos

Roomly utiliza `localStorage` para conservar las reservas registradas en el navegador.

La clave utilizada es:

```text
roomly_reservas
```

Las reservas se almacenan en formato JSON. Al volver a abrir la aplicación desde el mismo navegador y origen, los datos permanecen disponibles mientras no se eliminen los datos del sitio o se borre explícitamente esta clave.

**Consideraciones importantes:**

- Las reservas no se almacenan en un backend.
- Los datos no se sincronizan entre dispositivos o navegadores.
- Limpiar los datos del sitio puede eliminar las reservas guardadas.
- El almacenamiento local está destinado a la simulación académica de reservas.

## 10. Estructura general del proyecto

La aplicación organiza sus responsabilidades mediante componentes Angular y módulos.

La estructura general de referencia es la siguiente:

```text
Roomly/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbarcomponent/
│   │   │   ├── homecomponent/
│   │   │   ├── alojamientoscomponent/
│   │   │   ├── detallecomponent/
│   │   │   ├── datocomponent/
│   │   │   └── reservacomponent/
│   │   ├── app-routing-module.ts
│   │   ├── app-module.ts
│   │   └── app-component.*
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

Los nombres y las rutas de los archivos deben corresponder a los que existen realmente en el repositorio.

### Responsabilidades principales

- **Navbarcomponent:** navegación entre las secciones de la aplicación.
- **Homecomponent:** presentación inicial de Roomly.
- **Alojamientoscomponent:** consulta y presentación del listado de alojamientos.
- **Detallecomponent:** visualización de la información de un alojamiento y acceso a la reserva.
- **Datocomponent:** captura de los datos del huésped y registro de la reserva.
- **Reservacomponent:** consulta de las reservas almacenadas localmente.
- **AppRoutingModule:** configuración de las rutas de navegación.
- **AppModule:** declaración y configuración de los componentes y módulos de Angular.

Los componentes se implementan con `standalone: false`, siguiendo la organización basada en módulos del proyecto.

## 11. Consideraciones de negocio

La aplicación debe contemplar las siguientes reglas al gestionar cotizaciones y reservas:

- La fecha de salida debe ser posterior a la fecha de llegada.
- La fecha de llegada no puede ser anterior a la fecha actual.
- El número de huéspedes debe ser mayor que cero y no superar la capacidad del alojamiento.
- El precio por noche debe ser mayor que cero.
- Solo se debe permitir registrar una reserva después de obtener una cotización válida.
- La tarifa de servicio corresponde al 10 % del subtotal.
- No deben mostrarse alojamientos inactivos.
- Si una búsqueda no obtiene resultados, se debe informar al usuario.
- El estado inicial de una reserva debe ser `CONFIRMADA`.

Estas reglas corresponden a los requisitos del proyecto.

## 13. Repositorio

**URL del repositorio GitHub:** https://github.com/Shinrra-132K/roomly.git

El repositorio debe contener el código fuente, este archivo README.md, el archivo `.gitignore` y un historial de commits que evidencie los avances realizados durante el desarrollo.

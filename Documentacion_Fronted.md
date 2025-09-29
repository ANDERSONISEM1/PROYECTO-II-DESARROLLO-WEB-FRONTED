# 📄 Documentación del Frontend – Proyecto II Desarrollo Web

**Integrantes**

- Anderson Abimael Isem Cac - 7690-22-9604
- Jose Leonel Salazar Tejeda - 7690-22-8974
- Marvin Geobany Reyna Ortega - 7690-22-8291  

---

## 📋 Índice
- [📄 Documentación del Frontend – Proyecto II Desarrollo Web](#-documentación-del-frontend--proyecto-ii-desarrollo-web)
  - [📋 Índice](#-índice)
  - [📖 Introducción](#-introducción)
  - [🛠 Tecnologías y Stack](#-tecnologías-y-stack)
  - [🏗 Arquitectura / Estructura del Proyecto](#-arquitectura--estructura-del-proyecto)
  - [🌐 Rutas / Navegación](#-rutas--navegación)
  - [🧩 Componentes Principales](#-componentes-principales)
  - [🔧 Servicios](#-servicios)
  - [🔐 Autenticación y Guardias](#-autenticación-y-guardias)
  - [🔗 Comunicación con el Backend](#-comunicación-con-el-backend)
  - [💻 Instalación y Ejecución](#-instalación-y-ejecución)
  - [🧪 Pruebas](#-pruebas)
  - [👨‍💻 Créditos](#-créditos)

---

## 📖 Introducción
Este frontend corresponde al **Proyecto II de Desarrollo Web** y fue desarrollado en **Angular**.  
Su propósito es proveer la interfaz gráfica que consume la API del backend, gestionando autenticación de usuarios, CRUD de entidades (equipos, jugadores, partidos, torneos) y visualización de información en tiempo real.

---

## 🛠 Tecnologías y Stack
- **Framework:** Angular  
- **Lenguaje:** TypeScript  
- **Estilos:** CSS / Angular Material / Bootstrap (según componentes)  
- **Ruteo:** Angular Router (`app.routes.ts`)  
- **Servicios HTTP:** `HttpClient` + servicios propios (`api.service.ts`, `auth.service.ts`)  
- **Autenticación:** JWT (con `auth.interceptor.ts`, `auth.guard.ts`, `role.guard.ts`)  

---

## 🏗 Arquitectura / Estructura del Proyecto
Estructura principal de carpetas y archivos:

```
/src
 ├── app.component.ts / .html / .css
 ├── app.routes.ts
 ├── core/
 │    ├── api.service.ts
 │    ├── nav.model.ts
 │    ├── nav.service.ts
 ├── Auth/
 │    ├── login.component.ts
 │    ├── auth.service.ts
 │    ├── auth.guard.ts
 │    ├── role.guard.ts
 │    ├── auth.interceptor.ts
 │    ├── token-storage.service.ts
 ├── pages/
 │    ├── ajustes/
 │    │    ├── ajustes.component.ts
 │    │    ├── ajustes-api.service.ts
 │    │    ├── ajustes-backend.adapter.ts
 │    ├── control/
 │    │    └── control.component.ts
 │    ├── equipos/
 │    │    └── equipos.component.ts / .html
 │    ├── jugadores/
 │    │    └── jugadores.component.ts
 │    ├── partidos/
 │    │    └── partidos.component.ts
 │    ├── torneos/
 │         └── torneos.component.ts
 └── admin/
      └── admin-layout.component.ts
```

---

## 🌐 Rutas / Navegación
Definidas en `app.routes.ts`. Ejemplos comunes:

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/login` | `LoginComponent` | Pantalla de autenticación |
| `/admin` | `AdminLayoutComponent` | Layout de administración |
| `/equipos` | `EquiposComponent` | Listado de equipos |
| `/jugadores` | `JugadoresComponent` | CRUD de jugadores |
| `/partidos` | `PartidosComponent` | Gestión de partidos |
| `/torneos` | `TorneosComponent` | Vista de torneos |
| `/control` | `ControlComponent` | Control de marcador y cronómetro |
| `/ajustes` | `AjustesComponent` | Configuración general |

---

## 🧩 Componentes Principales
- **AppComponent:** raíz de la aplicación, contiene layout general.  
- **AdminLayoutComponent:** layout exclusivo para secciones de administración.  
- **LoginComponent:** formulario de autenticación.  
- **EquiposComponent:** lista y formularios de equipos.  
- **JugadoresComponent:** administración de jugadores.  
- **PartidosComponent:** vista y CRUD de partidos.  
- **TorneosComponent:** gestión de torneos.  
- **ControlComponent:** tablero de control de partidos (cronómetro, marcador).  
- **AjustesComponent:** configuración general del sistema.  

---

## 🔧 Servicios
- **ApiService (`core/api.service.ts`)** → abstrae llamadas HTTP al backend.  
- **AuthService (`Auth/auth.service.ts`)** → login, registro, validación de usuario.  
- **TokenStorageService (`Auth/token-storage.service.ts`)** → gestiona tokens JWT en localStorage.  
- **NavService (`core/nav.service.ts`)** → modelo de navegación dinámico.  
- **AjustesApiService (`pages/ajustes/ajustes-api.service.ts`)** → gestiona configuración desde backend.  
- **AjustesBackendAdapter (`pages/ajustes/ajustes-backend.adapter.ts`)** → adapta datos del backend para el frontend.  

---

## 🔐 Autenticación y Guardias
- **AuthGuard (`auth.guard.ts`)** → protege rutas que requieren usuario logueado.  
- **RoleGuard (`role.guard.ts`)** → restringe acceso según rol del usuario.  
- **AuthInterceptor (`auth.interceptor.ts`)** → inserta automáticamente el token JWT en los headers `Authorization`.  

---

## 🔗 Comunicación con el Backend
La app consume los endpoints expuestos en el backend (ejemplo):

```ts
// Ejemplo en AuthService
login(credentials: { email: string, password: string }) {
  return this.http.post(`${this.apiUrl}/auth/login`, credentials);
}
```

- Todas las peticiones se centralizan en `ApiService` y `AuthInterceptor`.  
- Se requiere token JWT para rutas protegidas.  

---

## 💻 Instalación y Ejecución
```bash
# Clonar el repositorio
git clone https://github.com/ANDERSONISEM1/PROYECTO-II-DESARROLLO-WEB-FRONTED.git
cd PROYECTO-II-DESARROLLO-WEB-FRONTED

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve -o

# Construir para producción
ng build --configuration production
```

---

## 🧪 Pruebas
- **Unitarias:** Angular TestBed (`.spec.ts` en cada componente).  
- **E2E:** (si se configuró) con Cypress o Protractor.  
- Ejecutar con:
```bash
ng test
```
---

## 👨‍💻 Créditos
- **Autores:** Equipo de Desarrollo Web – UMG  
- **Curso:** Desarrollo Web – Proyecto II  
- **Licencia:** MIT  

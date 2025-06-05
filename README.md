

# 📄 StockC2

## 🧾 Descripción General

Una aplicación para control de stock en una tienda de calzado aun que realmente se podrá expandir a todo tipo de ropa y accesorios. Está desarrollada con una arquitectura moderna basada en contenedores, usando **Angular (frontend)**, **Symfony (backend)** y **PostgreSQL (base de datos)**, todo desplegado con **Docker y Docker Compose**.

---

## 🎯 Objetivo del Proyecto

El objetivo del proyecto es desarrollar una aplicación web para el control de stock en una tienda de zapatillas. Es un APP sencilla, intuitiva y eficiente, permitiendo a los empleados gestionar el inventario de productos de manera precisa. La aplicación facilitar la actualización de disponibilidad y de tallas, el registro de nuevas entradas y salidas de stock. 


## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados en tu sistema:

- Docker
- Docker Compose
- Angular CLI
- Node.js
- NPM

## 🚀 Instalación y Puesta en Marcha

### 1️⃣ Clonar el repositorio

```bash
git clone git@github.com:RobertoMoraDiaz04/TFG-.git
```

### 2️⃣ Levantar los contenedores

```bash
docker-compose up -d
```

📌 Nota: La primera vez puede tardar unos minutos.

### 3️⃣ Desde la carpeta angular-frontend instalamos dependencias

```bash
npm install
```

### 4️⃣ Desde la carpeta raíz instalamos dependencias del docker

```bash
docker compose exec frontend npm install --save-dev @types/jwt-decode
docker compose exec frontend npm install ngx-toastr
docker compose exec backend composer install
```

### 5️⃣ Desde la carpeta raíz instalamos Nelmio, generamos las claves para el Lexik e instalamos Faker

```bash
docker compose exec backend composer require nelmio/cors-bundle
docker compose exec backend php bin/console lexik:jwt:generate-keypair
docker compose exec backend composer require fakerphp/faker --dev
```

### 6️⃣ Vaciamos la base de datos, ejecutamos las migraciónes y añadimos un Super Admin con datos en las diferentes tablas

```bash
docker compose exec backend php bin/console doctrine:database:drop --force
docker compose exec backend php bin/console doctrine:database:create
docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
docker compose exec backend php bin/console app:create-admin-user
docker compose exec backend php bin/console app:create-default-users
docker compose exec backend php bin/console app:populate-database
```
📌 Nota: El Super Admin tiene como credenciales: admin@example.com y admin123

## 📋 Comandos Útiles

- Acceder al contenedor de Angular:
```bash
docker exec -it angular_frontend sh
```

- Acceder al contenedor de Symfony:
```bash
docker exec -it symfony_backend bash
```

- Corregir permisos de directorio:
```bash
sudo chmod 775 -R angular-frontend
```

## 📊 Diagrama de Entidad-Relación (ERD)

Usuario 

id_usuario (INT, PK) 

email (VARCHAR, UNIQUE) 

contraseña (VARCHAR) 

rol (ENUM: 'cliente', 'administrador') 

 

Producto 

id_producto (INT, PK) 

nombre (VARCHAR) 

talla (VARCHAR) 

precio (DECIMAL) 

descripcion (TEXT) 

imagenes (TEXT) 



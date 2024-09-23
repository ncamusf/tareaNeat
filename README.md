## Aviso: No me gusto como quedo la WebApp en el tiempo estimado, hice una segunda branch en donde estoy continuando las cosas que me faltaron pulir.

# CryptoNeat

CryptoNeat es una aplicación web desarrollada con Angular que permite a los usuarios comprar y vender criptomonedas de manera segura y eficiente. Integrada con Firebase para la autenticación y almacenamiento de datos, CryptoNeat ofrece una experiencia de usuario fluida y actualizaciones en tiempo real de los precios de las criptomonedas.

# Características Abordadas

- **Autenticación de Usuarios**: Registro e inicio de sesión seguro utilizando Firebase Authentication.
- **Gestión de Perfil**: Visualización y edición de la información del usuario. **(No logrado)**
- **Compra y Venta de Criptomonedas**: Realiza transacciones de compra y venta con cálculos automáticos de cantidades.
- **Actualización en Tiempo Real**: Precios de criptomonedas actualizados cada 30 segundos.
- **Historial de Transacciones**: Consulta el historial completo de operaciones realizadas.
- **Ventana de noticias en el inicio**: Consulta las ultimas noticias de tus criptomonedas. **(No logrado)**

## Uso

### Registro e Inicio de Sesión

1. **Registro**: Navega a la página de registro y crea una nueva cuenta proporcionando tu correo electrónico y una contraseña segura.
2. **Inicio de Sesión**: Accede a tu cuenta utilizando tus credenciales registradas.

### Comprar/Vender Criptomonedas

1. **Seleccionar Tipo de Transacción**: Elige entre **Compra** o **Venta**.
2. **Seleccionar Criptomoneda**: Selecciona la criptomoneda que deseas comprar o vender del menú desplegable.
3. **Ingresar Monto en USD**: Introduce la cantidad en dólares que deseas utilizar para la transacción.
4. **Revisar Cantidad en Criptomonedas**: La aplicación calculará automáticamente la cantidad de criptomonedas correspondiente.
5. **Realizar Transacción**: Haz clic en el botón "Realizar transacción" para completar la operación.

### Ver Historial de Transacciones

- Accede al historial de tus operaciones desde el menú de navegación para revisar todas las transacciones realizadas.

# Design:

![image](https://github.com/user-attachments/assets/425d8519-db78-45e8-b20d-16a19d040c3e)

# TareaNeat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.


## Development server

Run `npm install`

My credencial of the firebase is already in the environment.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

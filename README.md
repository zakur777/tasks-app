# Despliegue de la aplicacion Task's App

1. Se debe crear un nuevo proyecto en Railway e instala las herramientas de línea de comando (CLI).
   ```
   https://railway.app/
   ```
2. Clonar el repositorio con ambos proyectos (el frontend y el backend) en tu máquina local.

   ```
   github repository:
   https://github.com/zakur777/tasks-app

   ```

3. En la carpeta raíz del proyecto de React, ejecuta `npm run build` para compilar tu aplicación para producción. Esto creará un directorio `build` dentro de la carpeta raíz.

4. Copia el contenido del directorio `build` generado en el paso anterior en una nueva carpeta llamada `public` dentro del directorio `src/main/resources` del proyecto de Spring Boot

5. Asegúrate de que tu archivo `pom.xml` tenga las dependencias necesarias para el backend de Spring Boot.

6. Ejecuta `mvn package` en la carpeta raíz del proyecto de Spring Boot para empaquetar tu aplicación en un archivo `.jar`.

7. Usa la CLI de Railway para configurar tu base de datos `postgreSQL`

8. Sube tu archivo `.jar` al servicio de hosting usando el siguiente comando: `railway run "java -jar miarchivo.jar"`.

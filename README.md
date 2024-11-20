### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Nicolas Achuri y Ricardo Villamizar

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/es-es/free/students/). Al hacerlo usted contará con $100 USD para gastar durante 12 meses.
Antes de iniciar con el laboratorio, revise la siguiente documentación sobre las [Azure Functions](https://www.c-sharpcorner.com/article/an-overview-of-azure-functions/)

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

![image](https://github.com/user-attachments/assets/bc426071-0c6a-4a1a-9747-6e9e55a006c8)

Se prueba la funcion satisfactoriamente y se obtienen los resultados esperados.

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

![image](https://github.com/user-attachments/assets/0f8aebb8-b5aa-44a5-a4f3-cd05fab309fa)

![image](https://github.com/user-attachments/assets/488a9bb8-6cc0-4531-9c10-61f3f39b7ae1)

A pesar de que la duracion varia en todas las iteraciones no hay ningun fallo y se generan en un intervalo de 4.8 a 5 segundos cada una.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

   ![image](https://github.com/user-attachments/assets/2a44275a-be50-4571-b7bf-d406d286bda2)

   Al memorizar los numeros ya encontrados de fibonacci, se sabe y se espera que los resultados se presenten de manera mucho mas eficaz y que el proyecto pueda correrse correctamente sin fallo alguno.

   ![image](https://github.com/user-attachments/assets/b20a6021-24db-4368-a105-30def300875f)



**Preguntas**

* ¿Qué es un Azure Function?

  Azure Functions es un servicio en la nube sin servidor que permite ejecutar aplicaciones bajo demanda, gestionando la infraestructura automáticamente. Facilita el desarrollo en varios lenguajes y es ideal para API web, procesamiento de datos IoT, cambios en bases de datos y gestión de colas de mensajes.
  
* ¿Qué es serverless?

  Es un modelo de computación en la nube que permite desarrollar y ejecutar     aplicaciones sin gestionar la infraestructura subyacente. Aunque los servidores siguen existiendo, su administración, incluyendo software y sistemas operativos, es completamente gestionada por el proveedor de la nube. Esto reduce la carga operativa y los costos, permitiendo a los desarrolladores enfocarse en el código y acelerar el desarrollo de aplicaciones.
  
* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?
  
  El runtime es el entorno de ejecución en el que se ejecutarán las funciones. Elegir un runtime implica determinar el lenguaje de programación y el entorno operativo de la Function App. Esta selección es clave porque cambiar el runtime posteriormente es complejo y puede requerir una reconfiguración significativa.


* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?

  Un Storage Account proporciona un espacio para datos duraderos, seguros y escalables accesibles globalmente. Azure Functions utiliza esta cuenta para almacenar metadatos de ejecución, colas y registros necesarios para las operaciones internas de las funciones.

* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.

  * Plan de Consumo: Este plan es ideal para aplicaciones con cargas variables, ya que escala automáticamente según la demanda y solo cobra por los recursos utilizados durante la ejecución. Funciona añadiendo o eliminando instancias dinámicamente en función del tráfico. Es una opción económica para aplicaciones de uso intermitente, pero no es adecuada para funciones que requieren ejecución continua, ya que los tiempos de arranque en frío pueden afectar el rendimiento inicial.

  * Plan Premium: Diseñado para aplicaciones con altas demandas de rendimiento, este plan elimina los tiempos de arranque en frío mediante trabajos preconfigurados listos para ejecutarse. Escala automáticamente y permite la integración con redes virtuales, ofreciendo mayor flexibilidad y seguridad. Aunque es más costoso que el plan de consumo, es ideal para funciones con necesidades continuas o frecuentes de recursos como CPU y memoria.

  * Plan de Azure App Service: Este plan utiliza la misma infraestructura que el App Service y ofrece un costo y escalado predecibles. Es adecuado para funciones que requieren tiempos de ejecución prolongados o cuando ya se tienen máquinas virtuales infrautilizadas con otras instancias de App Service. Sin embargo, su escalado no es tan dinámico como en los otros planes, y resulta más costoso si se usa para aplicaciones con baja demanda.

    
* ¿Por qué la memoization falla o no funciona de forma correcta?
    La memorización puede fallar debido a problemas de recursividad y al almacenamiento ineficiente de valores. Con datos grandes, el consumo de memoria aumenta significativamente, saturando los recursos disponibles y afectando el rendimiento.


* ¿Cómo funciona el sistema de facturación de las Function App?

  El costo se basa en el consumo de recursos, medido en gigabytes por segundo (GB*s). La memoria utilizada se redondea al múltiplo más cercano de 128 MB (máximo 1.536 MB), y el tiempo de ejecución al milisegundo más cercano (mínimo 100 ms). Hay una concesión gratuita mensual en el plan de consumo de Azure Functions.
  
* Informe

  Al intentar evaluar la funcion hecha en el punto 6 se sabe y se encuentra una mayor eficiencia, sin embargo, esto no nos permite el ingreso de datos muy grandes dado que arroja un error, esto se puede deber en gran medida a una alta carga de trabajo que esta recibiendo la instancia, se podria optimizar la funcion y hacerla mas escalable, al menos de un modo vertical haciendo la funcion mas optima, pero a la vez mucho más potente.

  ![image](https://github.com/user-attachments/assets/49aeb2dd-1944-44b3-8474-8c276f918d8b)

Hay limites con la carga del servidor.

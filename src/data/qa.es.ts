import type { QaOverlay } from './content'

// Spanish side of the assistant's question bank.
//
// Keyed by the English entry's id, so ids and followups live in qa.ts alone.
// Every number, date and claim matches qa.ts exactly.
//
// The keywords are NOT translated: they are what a Spanish speaker would actually
// type. Accents are folded by the normaliser, so "espanol" finds "español" and
// neither spelling needs listing twice.
export const qaEs: { bank: QaOverlay; fallback: string } = {
  fallback:
    'Eso se sale de mi guion. Solo sé lo que Mahamat me enseñó. Para cualquier otra cosa, escríbele directamente desde la sección de Contacto: le encantará leerte.',
  bank: {
    greeting: {
      chip: 'Saludar',
      keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'que tal'],
      answer:
        '¡Hola! Soy el asistente de Mahamat. Puedo hablarte de sus prácticas en Awesomeree, en Malasia, su proyecto de fin de carrera o los sitios que ha construido.',
    },
    salam: {
      chip: 'Salam',
      keywords: ['salam', 'salam aleikum', 'assalamu alaykum', 'aleikum salam'],
      answer:
        'Wa aleikum salam. Soy el asistente de Mahamat. Pregúntame por sus prácticas, su proyecto de fin de carrera o los sitios que ha construido.',
    },
    howareyou: {
      chip: '¿Cómo estás?',
      keywords: ['como estas', 'como te va', 'todo bien', 'que tal estas'],
      answer: 'Todo en orden, gracias por preguntar. Estoy aquí para responder tus dudas sobre Mahamat.',
    },
    thanks: {
      chip: 'Gracias',
      keywords: ['gracias', 'muchas gracias', 'genial', 'perfecto'],
      answer: 'Un placer. ¿Hay algo más que quieras saber sobre él?',
    },
    bye: {
      chip: 'Adiós',
      keywords: ['adios', 'hasta luego', 'nos vemos', 'chao', 'buen dia'],
      answer:
        'Gracias por pasarte por aquí. Si quieres hablar con Mahamat directamente, al final de la página hay un formulario de contacto. Que tengas un buen día.',
    },
    who: {
      chip: '¿Quién es Mahamat?',
      // "quien eres" belongs to the bot entry, not here: someone typing it is
      // addressing the assistant, and a keyword listed twice always resolves to
      // whichever entry happens to come first.
      keywords: ['quien es', 'sobre el', 'hablame de el', 'su perfil'],
      answer:
        'Mahamat Youssouf Taher Adam es ingeniero de software y vive en Kuala Lumpur, Malasia. Está terminando un grado en Ciencias de la Computación con especialidad en Ingeniería del Software, con honores, en la UTHM, y entre febrero y agosto de 2026 hizo prácticas de desarrollo web front-end en Awesomeree Sdn. Bhd., donde llevó aplicaciones web a producción. Se centra en el front-end, en experiencias web 3D interactivas y en ingeniería de soluciones.',
    },
    internship: {
      chip: '¿Qué construyó en las prácticas?',
      keywords: ['practicas', 'awesomeree', 'becario', 'experiencia laboral', 'su trabajo'],
      answer:
        'En seis meses en Awesomeree puso en producción 8 aplicaciones web: cuatro creadas desde cero y cuatro plataformas existentes rediseñadas. Participó en una biblioteca de componentes en React y TypeScript adoptada en unas veinte páginas, colaboró en un middleware de chat conectado a modelos de lenguaje, y construyó la monitorización completa de un conjunto de servicios automatizados. En total, 161 tickets entregados.',
    },
    infofort: {
      chip: '¿Trabajó antes de la universidad?',
      keywords: [
        'antes de la universidad',
        'primer trabajo',
        'infofort',
        'arabia saudi',
        'qassim',
        'hospitales',
        'equipo de 20',
        'covid',
      ],
      answer:
        'Sí. De abril de 2021 a mayo de 2022 trabajó con Infofort en la región de Qassim, en Arabia Saudí, en el registro de activos fijos del Ministerio de Salud. Empezó como operario de campo y a los dos meses lo ascendieron para dirigir un equipo de 20 personas, cubriendo 9 hospitales y 20 centros médicos. Coordinaba el acceso a los centros con los departamentos de inventario, repartía al equipo entre los departamentos, gestionaba los terminales de escaneo y el suministro de etiquetas, y trabajó durante el Covid con equipo de aislamiento completo. Tiene una ficha con fotos en la sección de Trayectoria.',
    },
    designsystem: {
      chip: 'Háblame de la biblioteca de componentes',
      keywords: ['biblioteca de componentes', 'design system', 'componentes', 'migracion'],
      answer:
        'Participó en el diseño de una biblioteca de componentes en React y TypeScript, con tablas, filtros, tarjetas y campos de formulario, y luego migró unas veinte páginas a ella, escritorio y móvil a la vez. Una sola migración eliminó unas 5.000 líneas de código de interfaz duplicado. También escribió la primera batería de pruebas automáticas de la biblioteca.',
    },
    chatplatform: {
      chip: '¿Y la automatización de conversaciones?',
      keywords: ['conversacion', 'chatbot', 'automatizacion', 'modelos de lenguaje', 'llm'],
      answer:
        'Colaboró en un middleware en Node.js que conecta plataformas de conversación con procesos automatizados por modelos de lenguaje: construcción del contexto, validación de datos, límites de tokens y reglas de derivación a un humano. También ayudó a mantener en marcha un conjunto de servicios automatizados en producción.',
    },
    monitoring: {
      chip: '¿Y el trabajo de monitorización?',
      keywords: ['monitorizacion', 'monitoreo', 'alertas', 'fiabilidad', 'incidencias'],
      answer:
        'Construyó una cadena de alertas de principio a fin: las comprobaciones de estado alimentan un endpoint REST autenticado, los resultados se guardan en base de datos y salen como avisos inmediatos con sonido y reenvío por mensajería, y se cierran con un endpoint de resolución automática. La idea era que una tarea nocturna caída se viera al momento, y no a la mañana siguiente.',
    },
    tickets: {
      chip: '¿Cuántos tickets entregó?',
      keywords: ['tickets', 'cuantos tickets', 'productividad', 'volumen de trabajo'],
      answer:
        'A lo largo de los seis meses de prácticas entregó 161 tickets, entre funcionalidades, migraciones, correcciones y automatización, siguiendo siempre el mismo camino: revisión, validación en un entorno de pruebas y una salida a producción limpia.',
    },
    stack: {
      chip: '¿Qué tecnologías usa?',
      keywords: [
        'tecnologias',
        'habilidades',
        'herramientas',
        'lenguajes',
        'react',
        'typescript',
        'laravel',
        'python',
        'flutter',
        'mysql',
      ],
      answer:
        'Front-end: React, TypeScript, Tailwind CSS, Three.js con React Three Fiber y Framer Motion. Back-end y datos: PHP, Laravel, Python, Node.js, MySQL y diseño de APIs REST. Móvil: Flutter. Método de trabajo: Git, GitHub, Jira y la documentación completa del ciclo de vida del software.',
    },
    threed: {
      chip: 'Háblame de los sitios 3D',
      keywords: ['3d', 'tres dimensiones', 'webgl', 'sitios interactivos', 'animacion'],
      answer:
        'Ha construido una serie de sitios de producto interactivos en 3D: secuencias guiadas por el desplazamiento en las que modelos generados enteramente por código, patinetes, mesas de juego, papeleras y butacas, responden al scroll de la página, con configuradores en vivo y vistas que giran al arrastrar. La página de Awesomeree AI está en producción, y todos aparecen en la sección de Proyectos.',
    },
    fyp: {
      chip: 'Háblame del proyecto de fin de carrera',
      keywords: ['proyecto de fin', 'tfg', 'sahel', 'chad', 'multitienda'],
      answer:
        'Su proyecto de fin de carrera, calificado con A+, es un sistema de gestión multitienda hecho para Sahel Retail Ltd, una cadena de tiendas en Chad que lo llevaba todo en papel. Desarrolló una aplicación de cliente en Flutter y paneles web de administración y de vendedor en Laravel sobre una misma base MySQL: permisos por rol para tres tipos de usuario, inventario en tiempo real, seguimiento de pedidos y pagos con Stripe.',
    },
    fyptech: {
      chip: '¿Cómo está construido el proyecto?',
      // Qualified with "el proyecto": bare "como esta hecho" is what a visitor
      // types about the page they are looking at, which is a different entry.
      keywords: ['arquitectura', 'como esta hecho el proyecto', 'parte tecnica', 'como funciona el sistema'],
      answer:
        'Una aplicación móvil en Flutter y Dart para los clientes consume una API REST en Laravel, mientras que los paneles de administración y de vendedor son aplicaciones web Laravel, todo sobre un mismo esquema MySQL. Firebase se encarga de las notificaciones push y los informes de fallos, Stripe de los pagos con tarjeta, y los controles por rol regulan la aprobación de vendedores y la apertura de tiendas.',
    },
    fypresults: {
      chip: '¿Qué resultados obtuvo el proyecto?',
      // Bare "pruebas" goes to the quality entry, where a recruiter asking how he
      // works is far more likely to land than on this project's test count.
      keywords: ['resultados del proyecto', 'casos de prueba', 'nota', 'articulo', 'publicacion', 'aitcs'],
      answer:
        'Se superaron los 49 casos de prueba, el 100 %, y la prueba de aceptación reunió a 31 participantes, incluida la dirección del cliente. El proyecto obtuvo una A+, y un artículo escrito en coautoría sobre el sistema fue aceptado para su publicación en la revista AITCS de la UTHM.',
    },
    education: {
      chip: '¿Dónde estudió?',
      keywords: ['estudios', 'estudio', 'donde estudio', 'universidad', 'uthm', 'carrera', 'formacion', 'grado'],
      answer:
        'Estudia Ciencias de la Computación con especialidad en Ingeniería del Software, con honores, en la Universiti Tun Hussein Onn Malaysia, de marzo de 2023 a diciembre de 2026, con una media de 3,99 sobre 4,0 en el último semestre y dos menciones consecutivas en el cuadro de honor.',
    },
    deanslist: {
      chip: '¿Qué es el cuadro de honor?',
      keywords: ['cuadro de honor', 'mencion', 'excelencia academica', 'deans list'],
      answer:
        'El cuadro de honor reconoce las mejores notas del semestre. Mahamat ha entrado dos veces seguidas: segundo semestre de 2024/2025 con una media de 3,67, y primer semestre de 2025/2026 con 3,99. El certificado y la foto están en la sección de Reconocimientos.',
    },
    certs: {
      chip: '¿Tiene certificaciones?',
      keywords: ['certificacion', 'certificado', 'cursos', 'sas', 'power bi', 'ccna'],
      answer:
        'Tres hasta ahora: Machine Learning Using SAS Viya, Power BI Data Modelling Basics y CCNAv7: Introduction to Networks, de Cisco. Reflejan su interés por los datos y las herramientas de inteligencia artificial, además de los fundamentos de redes.',
    },
    languages: {
      chip: '¿Qué idiomas habla?',
      keywords: ['idiomas', 'habla', 'ingles', 'arabe', 'espanol'],
      answer: 'Inglés y árabe, ambos con fluidez.',
    },
    location: {
      chip: '¿Dónde vive?',
      keywords: ['donde vive', 'donde esta', 'malasia', 'kuala lumpur', 'teletrabajo', 'mudarse'],
      answer:
        'Vive en Kuala Lumpur, Malasia. Para cualquier tema de traslado o trabajo en remoto, lo mejor es preguntárselo a él: en la sección de Contacto hay un formulario que le llega directamente.',
    },
    availability: {
      chip: '¿Está disponible?',
      keywords: ['disponible', 'contratar', 'vacante', 'oferta', 'busca trabajo'],
      answer:
        'Sí, está abierto a puestos de ingeniería de software, front-end e ingeniería de soluciones. Lo más rápido es el formulario de contacto o LinkedIn, ambos en la sección de Contacto.',
    },
    cv: {
      chip: '¿Puedo ver su CV?',
      keywords: ['cv', 'curriculum', 'descargar', 'pdf', 'hoja de vida'],
      answer:
        'Claro. Pulsa en Mi CV, arriba en la página, para leerlo aquí mismo, y usa el botón de descarga del visor. También hay un botón de CV en la sección de Contacto.',
    },
    contact: {
      chip: '¿Cómo puedo contactarlo?',
      // Spanish glues the pronoun onto the verb, so "contactarlo" is a different
      // word from "contactar" under whole-word matching and needs listing.
      keywords: ['contacto', 'contactar', 'contactarlo', 'escribirle', 'correo', 'email', 'linkedin'],
      answer:
        'Baja a la sección de Contacto: allí encontrarás un formulario breve que le envía tu mensaje, además de su LinkedIn. Él lee todo lo que llega a su bandeja de entrada.',
    },
    football: {
      chip: '¿Tiene vida más allá del código?',
      keywords: ['futbol', 'milan', 'ac milan', 'deporte'],
      answer:
        'Juega al fútbol siempre que puede, y es hincha acérrimo del AC Milan desde 2008, tanto en los años buenos como en los que forjan el carácter. Si el rojo de este sitio te suena, no es casualidad. Forza Milan.',
    },
    hobbies: {
      chip: '¿Qué hace en su tiempo libre?',
      keywords: ['tiempo libre', 'aficiones', 'hobbies', 'videojuegos', 'natacion', 'playa'],
      answer:
        'Bastantes cosas. Juega al fútbol, nada y se relaja en la playa. También es gamer: ahora mismo está enganchado a Red Dead Redemption 2, y ve al streamer Caseoh en Twitch cuando quiere tener algo de fondo.',
    },
    whyhire: {
      chip: '¿Por qué contratarlo?',
      keywords: ['por que contratarlo', 'por que el', 'sus puntos fuertes', 'que lo diferencia'],
      answer:
        'En seis meses entregó 161 tickets y puso 8 aplicaciones web en producción, participó en una biblioteca de componentes adoptada en unas veinte páginas y se hizo cargo de servicios automatizados en producción. Y también cubre la parte humana: talleres con equipos no técnicos, demos en vivo de prototipos funcionales y explicaciones claras de los pros y los contras de cada decisión técnica. Lo que aporta es esa combinación: rapidez para entregar y saber explicarlo.',
    },
    rolewanted: {
      chip: '¿Qué puesto busca?',
      keywords: ['que puesto', 'busca', 'que tipo de trabajo', 'objetivo profesional'],
      answer:
        'Puestos de ingeniería de software, front-end e ingeniería de soluciones: crear productos de cara al usuario sin perder el contacto con quien los usa de verdad. Le interesan especialmente los equipos que hacen web interactiva o muy orientada a producto.',
    },
    startdate: {
      chip: '¿Cuándo puede empezar?',
      keywords: ['cuando puede empezar', 'disponibilidad', 'preaviso', 'fecha de incorporacion'],
      answer:
        'De inmediato. Sus prácticas terminan el 21 de agosto de 2026 y pasa a ser graduado a finales de agosto, con el expediente oficial disponible a partir de esa fecha. La ceremonia es en diciembre de 2026, pero no retrasa su incorporación.',
    },
    graduation: {
      chip: '¿Cuándo se gradúa?',
      keywords: ['gradua', 'graduacion', 'fin de carrera', 'ceremonia', 'titulo'],
      answer:
        'Termina la carrera al acabar sus prácticas, el 21 de agosto de 2026, y pasa a ser graduado a finales de agosto o principios de septiembre de 2026. La ceremonia oficial se celebra en diciembre de 2026.',
    },
    cpa: {
      chip: '¿Qué notas tiene?',
      keywords: ['nota media', 'notas', 'expediente', 'calificaciones'],
      answer:
        'Su nota media acumulada es de 3,49 sobre 4,0, y la del último semestre de 3,99 sobre 4,0, lo que le valió una segunda mención consecutiva en el cuadro de honor.',
    },
    teamwork: {
      chip: '¿Cómo trabaja en equipo?',
      keywords: ['equipo', 'trabajo en equipo', 'colaboracion', 'comunicacion'],
      answer:
        'Ha dirigido talleres técnicos con marketing y atención al cliente, ha convertido sus flujos de trabajo en especificaciones de interfaz, y ha presentado prototipos funcionales a personas no técnicas antes de cada salida a producción. Se mueve con soltura en el papel de puente entre ingeniería y el resto de la empresa.',
    },
    realexperience: {
      chip: '¿Es experiencia laboral real?',
      keywords: ['experiencia real', 'experiencia de verdad', 'solo estudiante', 'profesional'],
      answer:
        'Sí. El trabajo de las prácticas llegó a producción: 8 aplicaciones web en marcha, una biblioteca de componentes usada en unas veinte páginas, sincronizaciones de más de 37.000 filas y servicios automatizados que se ejecutan a diario. Su proyecto de fin de carrera también se construyó para un cliente real.',
    },
    proudest: {
      chip: '¿De qué proyecto está más orgulloso?',
      keywords: ['mas orgulloso', 'mejor proyecto', 'proyecto favorito'],
      answer:
        'Destacan dos. La página de Awesomeree AI, porque salió a producción y se convirtió en la página de inicio de la empresa, y su proyecto de fin de carrera, porque resolvió un problema real de gestión para una cadena de tiendas real y sacó una A+.',
    },
    hardest: {
      chip: '¿Qué fue lo más difícil?',
      keywords: ['mas dificil', 'lo mas duro', 'reto', 'desafio'],
      answer:
        'Migrar unas veinte páginas en producción a una biblioteca de componentes nueva sin romper nada de lo que ya funcionaba, escritorio y móvil de una sola vez. Justo detrás: conseguir que escenas 3D guiadas por el desplazamiento fueran fluidas en el móvil sin sacrificar la experiencia.',
    },
    learning: {
      chip: '¿Qué está aprendiendo ahora?',
      keywords: ['aprendiendo', 'estudiando', 'se forma', 'siguiente habilidad'],
      answer:
        'Está profundizando en 3D interactivo en la web con Three.js y React Three Fiber, y avanzando en ingeniería de soluciones: toma de requisitos, integración de APIs y preventa técnica.',
    },
    backend: {
      chip: '¿También hace back-end?',
      keywords: ['backend', 'back end', 'servidor', 'api', 'base de datos', 'full stack'],
      answer:
        'Sí. Construyó la API REST en Laravel y el esquema MySQL de su proyecto de fin de carrera, escribió automatización en Python durante las prácticas y desarrolló la aplicación móvil en Flutter de ese mismo proyecto. El front-end sigue siendo su punto fuerte, pero trabaja en todo el stack.',
    },
    testing: {
      chip: '¿Cómo asegura la calidad?',
      keywords: ['calidad', 'pruebas', 'revision', 'despliegue', 'produccion'],
      answer:
        'Cada cambio pasa por revisión y por un entorno de pruebas antes de producción, comprobando el estado de la base de datos y del despliegue en lugar de darlo por hecho. Su proyecto de fin de carrera pasó sus 49 casos de prueba y una prueba de aceptación con 31 participantes.',
    },
    aiexp: {
      chip: '¿Ha trabajado con inteligencia artificial?',
      keywords: ['inteligencia artificial', 'ia', 'aprendizaje automatico'],
      answer:
        'Colaboró en un middleware que conecta plataformas de conversación con procesos automatizados por modelos de lenguaje: construcción del contexto, validación del payload, límites de tokens y reglas para escalar a un humano. También tiene el certificado Machine Learning Using SAS Viya.',
    },
    unknowntech: {
      chip: '¿Conoce alguna otra tecnología?',
      keywords: ['angular', 'vue', 'java', 'kotlin', 'swift', 'rust', 'docker', 'kubernetes', 'aws', 'azure', 'devops'],
      answer:
        'Eso no está en su CV, así que no voy a adivinar. Sus herramientas documentadas son React, TypeScript, JavaScript, Tailwind CSS, Three.js, Framer Motion, PHP, Laravel, Python, Flutter, MySQL y APIs REST. Para lo demás, pregúntaselo a él por el formulario de contacto.',
    },
    thissite: {
      chip: '¿Cómo está hecho este sitio?',
      keywords: ['este sitio', 'este portfolio', 'como esta hecho', 'con que esta hecho', 'esta pagina'],
      answer:
        'Mahamat lo construyó con React, TypeScript, Tailwind CSS y Framer Motion, como sitio estático alojado en GitHub Pages. Yo mismo formo parte de él: un pequeño asistente guionizado que viaja con la página, sin ningún servicio externo.',
    },
    code: {
      chip: '¿Puedo ver su código?',
      keywords: ['codigo', 'fuente', 'github', 'repositorio', 'open source'],
      answer:
        'Los sitios hechos durante las prácticas pertenecen a la empresa y a sus clientes, así que no puede compartir ese código. Dos de ellos sí están en línea públicamente, Awesomeree AI y ROAR Commerce, ambos enlazados en la sección de Proyectos. Su cuenta personal es github.com/Mahamat-Adam, y hay un botón de GitHub en la sección de Contacto.',
    },
    visa: {
      chip: '¿Y el permiso de trabajo?',
      keywords: ['visado', 'visa', 'permiso de trabajo', 'nacionalidad', 'patrocinio'],
      answer:
        'Esa es una pregunta para Mahamat, no para mí. Escríbele desde la sección de Contacto y te responderá como corresponde.',
    },
    salary: {
      chip: '¿Cuáles son sus expectativas salariales?',
      keywords: ['salario', 'sueldo', 'remuneracion', 'expectativas', 'cuanto cobra'],
      answer:
        'El sueldo se habla directamente con Mahamat. Escríbele desde la sección de Contacto y lo comentará contigo.',
    },
    projects: {
      chip: '¿Qué ha construido?',
      keywords: ['proyectos', 'trabajos', 'portfolio', 'roar', 'que ha hecho'],
      answer:
        'En esta página hay siete proyectos: el sitio de ROAR Commerce y la página de Awesomeree AI, ambos en línea públicamente, cuatro sitios de producto interactivos en 3D con patinetes, mesas de juego, papeleras y butacas de carreras, y una página de casco con la fotografía como protagonista. Baja a la sección de Proyectos y pulsa en cualquier tarjeta.',
    },
    bot: {
      chip: '¿Y tú qué eres exactamente?',
      keywords: ['quien eres', 'eres una ia', 'chatgpt', 'robot', 'como funcionas'],
      answer:
        'Soy MahamatBot, un pequeño asistente guionizado, no una IA de verdad. Mahamat escribió mis respuestas él mismo y yo enlazo tu pregunta con las palabras clave que dejó previstas. Pregúntame lo que quieras sobre él; si no lo sé, te llevaré al formulario de contacto.',
    },
  },
}

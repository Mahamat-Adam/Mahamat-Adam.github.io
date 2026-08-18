import type { Overlay } from './content'

// Spanish side of the portfolio.
//
// Written as Spanish rather than translated sentence by sentence. Every fact,
// figure and date matches profile.ts and projects.ts exactly; only the phrasing
// differs. Proper nouns stay as they are: Awesomeree, UTHM, Infofort, and every
// product and framework name.
export const es: Overlay = {
  aboutParagraphs: [
    `Me llamo Mahamat y soy ingeniero de software. Lo que me mueve es construir
     cosas que la gente perciba de verdad: interfaces con movimiento, presentaciones
     de producto en 3D que responden a quien las maneja, y sistemas que hacen su
     trabajo sin llamar la atención. Estoy terminando el grado en Informática,
     especialidad en Ingeniería del Software, con honores, en Universiti Tun Hussein
     Onn Malaysia, y de febrero a agosto de 2026 hice prácticas de desarrollo
     front-end en Awesomeree, en Kuala Lumpur, donde puse en producción aplicaciones
     que equipos reales usan a diario.`,
    `No me interesa solo el código, sino el recorrido completo de una idea: empieza
     con una conversación con alguien sin formación técnica, pasa por una
     arquitectura clara y pruebas que no se engañan, y termina en una puesta en
     producción que llega sin sobresaltos. De ahí viene mi interés por la ingeniería
     de soluciones además del desarrollo.`,
    `Fuera del trabajo suelo estar en un campo de fútbol o viendo al AC Milan: sigo a los
     rossoneri desde 2008.`,
  ],

  fypIntro: [
    `Mi proyecto final no fue un ejercicio académico, sino la solución a un problema
     real de un cliente real: Sahel Retail Ltd, una cadena de tiendas en Yamena
     (Chad), llevaba cada sucursal con registros en papel y hojas de cálculo, sin
     una visión común del inventario y sin ninguna forma de que un cliente comprara
     sin acercarse a la tienda.`,
    `Diseñé y construí para ellos una plataforma de comercio completa: una
     aplicación móvil en Flutter donde el cliente navega, paga con tarjeta, monedero
     o contra reembolso y sigue su pedido en una línea de tiempo que se actualiza al
     momento, apoyada en dos paneles web en Laravel para administración y vendedores
     sobre una única base de datos MySQL, con permisos por rol, aprobación de vendedores
     antes de activarlos, alta de tiendas, códigos de descuento e informes de
     ingresos.`,
    `El sistema superó los 49 casos de prueba, pasó una prueba de aceptación con 31
     participantes, entre ellos la propia dirección del cliente, y obtuvo la nota A+.
     Un artículo de investigación que coescribí sobre el sistema fue aceptado para
     su publicación en la revista AITCS de la universidad UTHM.`,
  ],

  spokenLanguages: ['Inglés - fluido', 'Árabe - lengua materna'],
  location: 'Kuala Lumpur, Malasia',

  statLabels: {
    internship: 'de prácticas en producción',
    tickets: 'tickets entregados',
    apps: 'aplicaciones web en producción',
    deans: 'veces en el cuadro de honor',
  },
  statSuffixes: { internship: ' meses', deans: '' },

  skillGroupNames: {
    web: 'Web y lenguajes',
    data: 'Bases de datos',
    solutions: 'Soluciones e integración',
    tools: 'Herramientas y métodos',
  },
  skillItems: {
    'Relational DB Design': 'Diseño de bases relacionales',
    'Data Modelling': 'Modelado de datos',
    'Requirements Gathering': 'Toma de requisitos',
    'Technical Discovery': 'Estudio técnico',
    'Pre-Production Demos': 'Demos previas a producción',
    'SDLC Documentation': 'Documentación del ciclo de vida del software',
  },

  experience: {
    role: 'Desarrollador web front-end en prácticas',
    period: 'febrero 2026 - agosto 2026',
    location: 'Kuala Lumpur, Malasia',
    bullets: [
      `Desarrollé y publiqué 8 aplicaciones web en producción, cuatro creadas desde
       cero y cuatro plataformas existentes rediseñadas, con React, TypeScript,
       Tailwind CSS, Three.js mediante React Three Fiber y Framer Motion, en versión
       de escritorio y móvil.`,
      `Participé en la construcción de una biblioteca de componentes en React y
       TypeScript, y después migré unas 20 páginas a ella, escritorio y móvil en el
       mismo paso, lo que eliminó miles de líneas de interfaz duplicada.`,
      `Contribuí a un middleware que conecta plataformas conversacionales con
       modelos de lenguaje: validación de los datos recibidos, límites de tokens y
       reglas para pasar la conversación a una persona según el contexto.`,
      `Construí un sistema de monitorización y alertas para un conjunto de servicios
       automatizados, desde la comprobación del estado de cada servicio hasta avisos
       inmediatos, pasando por una interfaz REST.`,
      `Dirigí sesiones de trabajo con equipos no técnicos, en marketing y atención al
       cliente, y les presenté prototipos funcionales antes de cada lanzamiento.`,
      `Seguí el mismo camino en cada cambio: revisión de código por un compañero, validación en
       un entorno de pruebas y despliegue limpio a producción, todo registrado en Git
       y Jira. Entre otras cosas, verifiqué la sincronización de más de 37 000
       registros con MySQL Workbench antes de darla por buena.`,
    ],
  },

  fieldRole: {
    // "Lider", not "Jefe": the English title is Team Lead, and jefe carries the
    // weight of "boss" rather than the lead of a working team.
    role: 'Líder de equipo de registro de activos',
    period: 'Abril 2021 - Mayo 2022',
    location: 'Región de Qassim, Arabia Saudí',
    summary: `Dirigí un equipo de campo de 20 personas encargado de registrar todos
      los activos fijos del Ministerio de Salud en 9 hospitales y 20 centros
      médicos, trabajando sin parar durante toda la pandemia de covid.`,
    detail: [
      `Infofort tenía a su cargo el registro de activos fijos del Ministerio de
       Salud en la región de Qassim. Cada bien, desde respiradores y
       desfibriladores hasta escritorios y aires acondicionados, debía llevar una
       etiqueta QR con un identificador único y quedar registrado con su nombre,
       modelo, número de serie y fabricante.`,
      `Empecé como operario de campo. El catálogo de activos estaba íntegramente en
       inglés, y dominar el idioma me permitió aprender rápido el nombre de equipos
       médicos complejos: desfibriladores, bombas de infusión, electrocardiógrafos,
       monitores de constantes vitales y respiradores, además del mobiliario y el
       equipamiento eléctrico. A los dos meses me pusieron al frente de un equipo de
       20 personas.`,
      `Pasé a ser el enlace entre el equipo y los servicios de inventario de los
       hospitales: coordinar qué centros estaban listos para recibirnos, conseguir
       los permisos de acceso a zonas restringidas y repartir al equipo por plantas y
       servicios para que no se quedara ningún edificio sin cubrir, del sótano a la
       azotea. Me encargaba del suministro de etiquetas, del estado de los lectores
       con Android, de las reuniones de seguimiento y de trasladar cualquier
       obstáculo al supervisor y a la dirección.`,
      `Trabajamos durante toda la pandemia. Una vez vacunados, nos poníamos el
       equipo de aislamiento completo para entrar y registrar las habitaciones y las
       alas reservadas a los pacientes de covid.`,
      `El proyecto en la región terminó en mayo de 2022. La empresa me ofreció
       continuar con ellos en la Provincia Oriental, pero ya había decidido empezar
       mis estudios universitarios.`,
    ],
    highlightLabels: {
      team: 'personas a mi cargo',
      hospitals: 'hospitales',
      centres: 'centros médicos',
    },
  },

  education: {
    degree: 'Grado en Informática, especialidad en Ingeniería del Software, con honores',
    period: 'Marzo 2023 - Agosto 2026',
    gpa: 'Nota media 3,49 sobre 4,0 · último semestre 3,99 sobre 4,0',
    note: 'Estudios completados en agosto de 2026, ceremonia de graduación en diciembre de 2026.',
    coursework:
      'Ingeniería del software, ingeniería de requisitos, análisis y diseño de sistemas, programación orientada a objetos, bases de datos, desarrollo web, pruebas de software, algoritmos y complejidad',
  },

  deansList: {
    title: 'En el cuadro de honor dos semestres consecutivos',
    detail: `Distinción de UTHM por excelencia académica en dos semestres consecutivos:
      segundo semestre 2024/2025 con una media de 3,67, y primer semestre 2025/2026
      con 3,99.`,
  },

  projects: {
    'roar-commerce': {
      category: 'Sitio corporativo reconstruido por completo',
      blurb:
        'Rediseño integral del sitio de una empresa de operaciones de comercio electrónico en Malasia y Singapur, con un lenguaje visual industrial: cintas transportadoras animadas, patio de expediciones y una carta náutica viva.',
      detail: [
        `Rediseño integral del sitio de una empresa que gestiona operaciones de
         comercio electrónico en Malasia y Singapur, con un lenguaje visual
         industrial muy marcado. En la portada, una cinta transportadora en WebGL
         hace pasar paquetes etiquetados bajo una estructura metálica, un patio de
         expediciones en 3D entrega la mercancía a los muelles de los marketplaces, y
         una carta náutica viva lleva la carga por el sudeste asiático. Todo
         construido con código, sin descargar ni un solo modelo.`,
        `El trabajo no se detuvo en la portada: reconstruí más de una docena de
         páginas dentro de un único sistema de diseño con componentes compartidos, y
         lo entregué en WordPress. El sitio está publicado, es el oficial y se
         puede visitar desde el enlace de abajo.`,
      ],
      linkLabel: 'Visitar el sitio',
    },
    'awesomeree-ai': {
      category: 'En producción · página interactiva con mascota',
      blurb:
        'La página de presentación de Awesomeree, encabezada por una mascota robot interactiva en 3D. Hoy está en producción en el sitio oficial.',
      detail: [
        `La página de presentación oficial de Awesomeree, la empresa donde hice las
         prácticas. Una sola página construida alrededor de una mascota robot en
         pixel art renderizada con WebGL: sigue el cursor, saluda, parpadea y
         reacciona, mientras detrás desfilan modelos 3D de los productos de la
         empresa.`,
        `Llevé el diseño aprobado por más de una docena de rondas de ajustes:
         recomposición para móvil, ajuste del ritmo de las animaciones y mejora del
         rendimiento de la escena 3D al cargar. Después la publiqué en WordPress,
         sustituyendo el diseño anterior por el mío una vez que la dirección dio el
         visto bueno, y monté el SEO junto con un circuito
         de solicitudes de demostración.`,
      ],
      linkLabel: 'Visitar el sitio',
    },
    'scooter-experience': {
      category: 'Experiencia de marca en 3D',
      blurb:
        'Un patinete construido íntegramente con código recorre una calle generada también con código a medida que se avanza, con 9 recorridos, un garaje de 13 modelos y una vista 3D dentro de cada tarjeta.',
      detail: [
        `La portada funciona como una secuencia continua gobernada por el
         desplazamiento: un patinete eléctrico construido íntegramente con código
         recorre un barrio generado y se detiene en paradas escogidas que muestran la
         rueda sin aire, el motor, un plegado de tres segundos y un faro que se
         enciende al pulsarlo. En cualquier momento el visitante puede tomar el
         patinete y girarlo a su gusto.`,
        `En el garaje, el mismo modelo se reconstruye y se repinta en trece versiones,
         y cada tarjeta de la sala de exposición lleva su propia vista 3D mediante un
         motor de renderizado propio, y da paso a las fotos reales del producto cuando
         se pide. Nueve recorridos en total, comprobados en escritorio y en móvil.`,
      ],
    },
    'games-room': {
      category: 'Una mesa, cuatro identidades',
      blurb:
        'Una sola mesa se transforma en cuatro: billar, hockey de aire, ping-pong y mesa de comedor, todo con el desplazamiento.',
      detail: [
        `El centro de la página es una mesa de juego construida con código que cambia
         de forma según se avanza: las bolas de billar se dispersan y caen en troneras
         realmente perforadas, la superficie se convierte en pista de hockey de aire,
         entra un tablero de ping-pong, y una tapa de comedor cierra la idea del
         cuatro en uno. Cada fase da siempre el mismo resultado y se recorre en ambos
         sentidos.`,
        `Alrededor de esa secuencia construí una herramienta que mide si la mesa cabe
         en la habitación del visitante y da un veredicto claro entre perfecta,
         justa e imposible, páginas 3D propias para las gamas de futbolín y hockey de
         aire, una cesta que conserva su elección y un carrusel de opiniones y fotos
         de compradores seleccionadas con cuidado.`,
      ],
    },
    'sensor-bins': {
      category: 'Una demostración que responde al gesto',
      blurb:
        'Basta pisar el pedal para que la tapa se abra y luego baje en silencio, con una vista despiezada al avanzar y colores que cambian al instante.',
      detail: [
        `Una sola página dedicada al funcionamiento de una gama de papeleras con
         sensor y pedal. La encabeza un modelo 3D interactivo: al pisar el pedal, la tapa
         se abre y después desciende despacio y sin ruido, que es el argumento
         principal del producto, demostrado con el uso y no con
         palabras. Elegir un acabado repinta el modelo en ese mismo instante y en el
         mismo sitio.`,
        `Más abajo, una secuencia despieza el producto para enseñar la calidad de
         fabricación, una guía de medidas dibujada recomienda el modelo adecuado al
         espacio del visitante, y una sección de valoraciones reúne las fotos
         verificadas de los compradores con sus comentarios tal como los escribieron.`,
      ],
    },
    'racing-chair': {
      category: 'Del día a la noche, en una secuencia',
      blurb:
        'El desplazamiento reclina la silla de 90 a 155 grados, y al final la escena y la interfaz pasan juntas a la noche.',
      detail: [
        `Una sola página montada como una secuencia de cine, donde el desplazamiento
         gobierna el propio producto: la silla construida con código pasa de la
         posición recta a la reclinación completa mientras se lee, y la escena termina
         cambiando del día a la noche arrastrando consigo toda la interfaz.`,
        `Son los detalles los que convencen: un respaldo de malla realmente calada,
         costuras acolchadas, un pistón de gas que se ajusta arrastrando dentro de una
         sección con aspecto de plano técnico y cotas que se actualizan al momento, y un
         expositor para cambiar de color.`,
      ],
    },
    'helmet-site': {
      category: 'Una página sostenida por la fotografía',
      blurb:
        'Dieciocho colores que tiñen toda la escena, dos posiciones de visera para el día y la noche, y una guía de tallas que no engaña.',
      detail: [
        `Una página de producto sostenida por la fotografía, para un casco urbano de
         doble visera. Parte de una convicción clara: cuando la forma es curva y
         suave, una foto bien recortada supera a un modelo 3D insuficiente. Elegir
         uno de los dieciocho colores vuelve a teñir la escena entera.`,
        `La página incluye varias secciones interactivas: una demostración sobre fondo oscuro que
         cambia la visera entre el día y la noche, un esquema de detalles cuyas
         llamadas se encienden al pasar el cursor, y una guía de tallas que mide en
         centímetros y da un veredicto sin rodeos. También produje cinco direcciones
         artísticas completas para que el cliente pudiera elegir.`,
      ],
    },
  },
}

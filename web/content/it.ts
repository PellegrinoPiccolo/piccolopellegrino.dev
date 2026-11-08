import type { SiteContent } from "./types";

export const it: SiteContent = {
  locale: "it",
  dateLocale: "it-IT",
  ogLocale: "it_IT",
  meta: {
    title:
      "Sviluppatore web e programmatore a Montesarchio (BN) — Pellegrino Piccolo",
    description:
      "Pellegrino Piccolo, sviluppatore web e programmatore di Montesarchio (BN). Studio Informatica e realizzo siti web e app, anche su richiesta, nella Valle Caudina e in provincia di Benevento.",
    jobTitle: "Sviluppatore web e programmatore",
    keywords: [
      "Pellegrino Piccolo",
      "sviluppatore web Montesarchio",
      "programmatore Montesarchio",
      "creazione siti web Montesarchio",
      "sviluppatore app Benevento",
      "realizzazione siti web Valle Caudina",
      "web developer Benevento",
      "programmatore Benevento",
    ],
  },
  nav: {
    projects: "Progetti",
    about: "Chi sono",
    stack: "Stack",
    services: "Cosa faccio",
    contact: "Contatti",
    home: "Home",
    allProjects: "Tutti i progetti",
    logoAlt: "Pellegrino Piccolo — home",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    menu: "Menu",
    language: "Lingua",
    switchTo: "Passa a {language}",
    languages: { it: "Italiano", en: "English" },
  },
  kinds: {
    "Desktop app": "App desktop",
    "Mobile app": "App mobile",
    Tool: "Tool",
    "Web app": "Web app",
    Website: "Sito web",
  },
  clientWork: "Cliente",
  footer: {
    label: "Footer",
    tagline:
      "Sviluppatore web e programmatore a Montesarchio (BN): siti web, app mobile e desktop, dal design al rilascio.",
    available: "Disponibile per nuovi progetti",
    navigate: "Naviga",
    connect: "Contatti",
    email: "Email",
    resume: "Curriculum",
    privacy: "Privacy",
    builtWith: "Realizzato con Next.js e Tailwind",
    backToTop: "Torna su",
  },
  hero: {
    eyebrow: "/* Sviluppatore web e programmatore a Montesarchio */",
    description:
      "Sviluppo siti web, app mobile e software su misura, curando qualità e prestazioni. Se hai un'idea o un'attività nella Valle Caudina o in provincia di Benevento, possiamo realizzarla insieme.",
    viewProjects: "Vedi i progetti",
    contactMe: "Contattami",
    latestWork: "Ultimi lavori",
    available: "Disponibile per nuovi progetti",
    coverAlt: "Copertina del progetto",
  },
  services: {
    eyebrow: "04 — Cosa faccio",
    heading: "Cosa posso fare",
    description:
      "Accanto agli studi realizzo progetti su richiesta, scelti uno alla volta, e li seguo dall'idea alla pubblicazione.",
    items: [
      {
        title: "Siti web",
        description:
          "Creazione di siti vetrina, cataloghi prodotti e landing page veloci, facili da trovare su Google e da aggiornare.",
        serviceType: "Creazione siti web",
      },
      {
        title: "App mobile",
        description:
          "Sviluppo di app per Android e iOS con React Native, dalla progettazione delle schermate alla pubblicazione sugli store.",
        serviceType: "Sviluppo app mobile",
      },
      {
        title: "Software su misura",
        description:
          "Piccole applicazioni web o desktop per organizzare il lavoro: strumenti interni e automazioni.",
        serviceType: "Sviluppo software su misura",
      },
      {
        title: "Manutenzione",
        description:
          "Aggiornamenti, correzioni e nuove funzioni per siti e app già esistenti.",
        serviceType: "Manutenzione siti web e app",
      },
    ],
    areaHeading: "Zona",
    areaDescription:
      "Vivo a Montesarchio e collaboro volentieri con attività e persone della Valle Caudina e della provincia di Benevento, di persona o da remoto. Tra i comuni vicini: {towns}.",
  },
  homeProjects: {
    eyebrow: "01 — Progetti",
    heading: "Progetti scelti",
    allProjects: "Tutti i progetti",
    emptyEyebrow: "/* Lavori in corso */",
    emptyTitle: "Nuovi progetti in arrivo",
    emptyText:
      "Sto selezionando i miei lavori migliori. Nel frattempo, scrivimi pure per parlare della tua prossima idea.",
    contactMe: "Contattami",
  },
  about: {
    eyebrow: "02 — Chi sono",
    heading: "Dall'idea al rilascio",
    paragraphs: [
      "Sono Pellegrino Piccolo, sviluppatore web e programmatore di Montesarchio. Porto i prodotti dall'idea fino agli store: design, codice, rilascio e tutte le parti noiose nel mezzo. Mi interessano siti e app veloci e facili da mantenere.",
      "Sono anche studente della Laurea Magistrale in Informatica (Cloud Computing) all'Università di Salerno, quindi passo molto tempo a pensare a come sono costruiti i sistemi, non solo a come appaiono.",
    ],
    downloadCv: "Scarica il CV",
    howIWork: "Come lavoro",
    steps: [
      {
        title: "Design",
        description:
          "Prima flussi e schermate, così ci accordiamo su cosa costruire prima di scrivere codice.",
      },
      {
        title: "Sviluppo",
        description:
          "React Native, Next.js o Electron. Codice tipizzato, testato e facile da mantenere.",
      },
      {
        title: "Rilascio",
        description:
          "Pubblicazione sugli store, distribuzione e aggiornamenti: mi occupo io del rilascio e delle parti noiose.",
      },
    ],
  },
  stack: {
    eyebrow: "03 — Stack",
    heading: "Gli strumenti che uso",
    description: "Raggruppati per utilizzo, con i progetti in cui li ho usati.",
    comingSoon: "/* In arrivo */",
    usedIn: "Usato in",
    emptyEyebrow: "/* Lavori in corso */",
    emptyText:
      "Sto raccogliendo gli strumenti con cui lavoro. Torna a trovarmi presto.",
  },
  contact: {
    eyebrow: "05 — Contatti",
    badge: "Scrivimi",
    heading: ["Hai un progetto", "in mente?"],
    description:
      "Raccontami cosa vuoi realizzare: un'app, un sito web o un tool. Ti rispondo appena posso, di solito in giornata.",
    location:
      "Montesarchio (BN) · Valle Caudina e provincia di Benevento, di persona o da remoto",
  },
  form: {
    legend: "Di cosa hai bisogno?",
    types: {
      mobile: "App mobile",
      website: "Sito web",
      desktop: "App desktop",
      other: "Altro",
    },
    name: "Nome",
    namePlaceholder: "Il tuo nome",
    email: "Email",
    emailPlaceholder: "tu@azienda.it",
    message: "Messaggio",
    messagePlaceholder: "Qualche riga sul progetto, tempi e obiettivi",
    sending: "Invio in corso...",
    send: "Invia messaggio",
    success: "Messaggio inviato!",
    idle: "Niente spam, niente newsletter: il tuo messaggio arriva direttamente nella mia casella.",
    consent: {
      before: "Inviando il modulo accetti l'",
      link: "informativa sulla privacy",
      after: ".",
    },
    errors: {
      invalidEmail: "Inserisci un indirizzo email valido.",
      required: "Compila tutti i campi obbligatori.",
      failed: "Invio non riuscito. Riprova più tardi.",
      generic: "Si è verificato un errore. Riprova più tardi.",
    },
  },
  projectsPage: {
    title: "Progetti",
    description:
      "Siti web, app mobile e software realizzati da Pellegrino Piccolo, sviluppatore web e programmatore a Montesarchio (BN).",
    eyebrow: "/* tutto quello che ho rilasciato */",
    heading: "Tutti i progetti",
    count: { one: "{count} progetto", other: "{count} progetti" },
    intro: "App, siti web e tool: prodotti personali e lavori per clienti.",
    ctaEyebrow: "/* il prossimo potrebbe essere il tuo */",
    ctaTitle: "Hai un progetto in mente?",
    ctaButton: "Scrivimi",
  },
  projectsList: {
    filterLabel: "Filtra i progetti per categoria",
    all: "Tutti",
    upcoming: "In arrivo",
    categories: { app: "App", web: "Web", desktop: "Desktop" },
    client: "Clienti",
  },
  projectCard: {
    coverAlt: "Copertina del progetto",
    readCaseStudy: "Leggi il case study",
    readCaseStudyLabel: "Leggi il case study: {title}",
    sourceCode: "Codice sorgente",
    liveSite: "Sito online",
    download: "Scarica",
  },
  projectHero: {
    allProjects: "Tutti i progetti",
    released: "Rilasciato: {date}",
    role: "Ruolo",
    platforms: "Piattaforme",
    architecture: "Architettura",
    keyDecisions: "Decisioni chiave",
    code: "Codice",
    visitSite: "Visita il sito",
    download: "Scarica",
  },
  videos: {
    eyebrow: "Video",
    heading: "Il progetto in movimento",
    description: "Brevi video che mostrano l'app in azione.",
    videoLabel: "Video {index} di {count}",
  },
  gallery: {
    eyebrow: "Galleria",
    heading: "L'app, schermata per schermata",
    description: "Uno sguardo alle schermate principali dell'app.",
    emptyEyebrow: "/* Nessuno screenshot */",
    emptyText: "Non ci sono schermate disponibili per questo progetto.",
    imageAlt: "Immagine {index} di {count}",
  },
  architecture: {
    eyebrow: "Architettura",
    heading: "Com'è fatta",
    description:
      "L'app, livello per livello. Ogni badge rimanda alla decisione che ha definito quel livello.",
    emptyEyebrow: "/* Nessuna architettura */",
    emptyText:
      "L'architettura di questo progetto non è ancora stata documentata.",
  },
  decisions: {
    eyebrow: "Decisioni",
    heading: "Registro delle decisioni",
    description: "Contesto, scelta e il prezzo pagato per ognuna.",
    context: "Contesto",
    decision: "Decisione",
    tradeoff: "Compromesso",
    alternatives: "Alternative",
  },
  projectNavigation: {
    label: "Navigazione tra i progetti",
    eyebrow: "Altri progetti",
    heading: "Continua a esplorare",
    position: "Progetto {index} di {total}.",
    next: "Progetto successivo",
    previous: "Progetto precedente",
    allProjects: "Tutti i progetti",
  },
  privacy: {
    title: "Informativa sulla privacy",
    description:
      "Come Pellegrino Piccolo tratta i dati personali che condividi attraverso questo sito.",
    eyebrow: "/* in breve: uso solo quello che mi invii */",
    lastUpdated: "Ultimo aggiornamento: {date}",
    sections: [
      {
        title: "Chi è il titolare",
        body: "Il titolare del trattamento è Pellegrino Piccolo, persona fisica residente in Italia. Puoi scrivermi a {email} per qualsiasi questione relativa ai tuoi dati.",
      },
      {
        title: "Quali dati raccolgo",
        body: "Solo quelli che invii tramite il modulo di contatto: nome, indirizzo email, messaggio e tipo di progetto selezionato. Il sito non ha account, non usa strumenti di analisi né cookie di tracciamento o pubblicitari.",
      },
      {
        title: "Perché e su quale base",
        body: "Uso i tuoi dati solo per rispondere al tuo messaggio e, se decidiamo di lavorare insieme, per discutere del progetto. La base giuridica è l'esecuzione di misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR). I tuoi dati non vengono mai venduti, condivisi per finalità di marketing o inseriti in una newsletter.",
      },
      {
        title: "Chi li tratta",
        body: "I messaggi del modulo sono inoltrati da StaticForms (staticforms.dev) alla mia casella email, ospitata da Google. Le immagini dei progetti sono servite dalla CDN di Sanity (cdn.sanity.io), che riceve il tuo indirizzo IP come avviene per qualsiasi normale richiesta web. Questi fornitori agiscono per mio conto e possono trattare dati al di fuori dell'UE con le garanzie previste dal GDPR.",
      },
      {
        title: "Per quanto tempo li conservo",
        body: "I messaggi sono conservati per il tempo necessario a gestire la tua richiesta e per non più di 24 mesi successivi, salvo che iniziamo a collaborare: in quel caso entrano a far parte della corrispondenza del progetto.",
      },
      {
        title: "I tuoi diritti",
        body: "Puoi chiedere di accedere ai tuoi dati, rettificarli o cancellarli, limitarne il trattamento od opporti, oppure riceverli in un formato portabile, scrivendo a {email}. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.",
      },
    ],
  },
  notFound: {
    title: "Pagina non trovata",
    eyebrow: "/* Errore 404 — percorso non trovato */",
    heading: "Questa pagina è uscita dalla mappa",
    description:
      "La pagina che cerchi non esiste, è stata spostata o non è mai uscita dalla fase di progettazione.",
    terminalError: "cd: no such file or directory",
    backHome: "Torna alla home",
    viewProjects: "Vedi i progetti",
  },
};

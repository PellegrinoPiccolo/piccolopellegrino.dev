type Item = Record<string, string | string[]>

export type ProjectTranslation = {
  excerpt?: string
  role?: string
  platforms?: string
  architectureSummary?: string
  storeLabel?: string
  coverAlt?: string
  layersBoundary?: string
  seoTitle?: string
  seoDescription?: string
  gallery?: Record<string, Item>
  layers?: Record<string, Item>
  decisions?: Record<string, Item>
}

export const projects: Record<string, ProjectTranslation> = {
  '3cec2e3f-0e0f-4981-845b-5ac26303af41': {
    excerpt:
      "Un'app desktop leggera e multipiattaforma per organizzare in locale snippet di testo e note: un'alternativa privata e gratuita agli abbonamenti basati sul cloud.",
    role: 'Design e sviluppo (da solo)',
    platforms: 'Windows · macOS',
    architectureSummary: 'Local-first, si sincronizza tramite la tua cartella cloud',
    storeLabel: 'Scarica per Windows e macOS',
    coverAlt: 'SnippetPop',
    layersBoundary: 'SUL TUO COMPUTER',
    seoTitle: 'SnippetPop — Case study di un gestore di snippet',
    seoDescription:
      "Come ho realizzato SnippetPop, un'app Electron local-first per snippet di testo che si sincronizza tramite la tua cartella Google Drive o Dropbox, senza server né account.",
    gallery: {
      '5e518b169243': {alt: 'SnippetPop'},
    },
    layers: {
      '8603d63bc66a': {
        name: 'Interfaccia',
        tech: 'React, Tailwind CSS, shadcn/ui',
        connector: 'IPC tramite preload',
      },
      b3a4ffc5ad3a: {
        name: 'Processo principale',
        tech: 'Electron, context isolation',
        connector: 'lettura / scrittura',
      },
      '4b7f4e24548d': {
        name: 'Libreria di snippet',
        tech: 'File JSON tramite electron-store',
        connector: 'sincronizzazione opzionale',
      },
      '33d2d8c897af': {
        name: 'Cartella sincronizzata',
        tech: 'La tua cartella Google Drive, Dropbox, OneDrive o iCloud',
      },
      '67637faae381': {name: 'Controllo aggiornamenti', tech: 'API di GitHub Releases'},
      a3a3e5790423: {name: 'Backend', tech: 'Nessun server, nessun account'},
    },
    decisions: {
      '80cbfdd80073': {
        title: 'Salvare la libreria in un file JSON locale',
        shortLabel: 'Local-first',
        context:
          'La maggior parte dei gestori di snippet richiede un account e un abbonamento mensile, anche se gli snippet sono dati personali che raramente hanno bisogno di un server.',
        decision:
          "Tenere tutti gli snippet e le categorie in un unico file JSON sul computer dell'utente, gestito con electron-store. Nessun server, nessuna registrazione.",
        tradeoff:
          "Nessuna collaborazione in tempo reale, e l'intera libreria viene riscritta a ogni modifica: per un uso personale va bene.",
        alternatives: ['SQLite', 'Firebase', 'Un backend su misura'],
      },
      f4d139eabbaf: {
        title: "Sincronizzare tramite una cartella che l'utente ha già",
        shortLabel: 'Sync via cartella',
        context:
          "Gli utenti volevano gli stessi snippet su più computer, senza che l'app avesse bisogno di un proprio cloud.",
        decision:
          "Permettere di spostare la libreria in qualsiasi cartella, come Google Drive o Dropbox. Una piccola configurazione locale ricorda la posizione, l'app vi trasferisce i dati e un altro computer che punta alla stessa cartella li carica.",
        tradeoff:
          'Tempi di sincronizzazione e conflitti sono gestiti dal servizio cloud, quindi modificare la libreria su due computer contemporaneamente può creare copie in conflitto.',
        alternatives: [
          'Server di sincronizzazione dedicato',
          'API di Google Drive / Dropbox',
          'Sincronizzazione basata su CRDT',
        ],
      },
      e1030eae8823: {
        title: "Build non firmate con controllo degli aggiornamenti nell'app",
        shortLabel: 'Release su GitHub',
        context:
          'I certificati di firma del codice per macOS e Windows si pagano ogni anno, una spesa che non ha senso per un progetto personale gratuito.',
        decision:
          "Pubblicare gli installer su GitHub Releases. All'avvio l'app controlla l'ultima release tramite l'API di GitHub e propone di scaricare le versioni più recenti.",
        tradeoff:
          'Gli utenti vedono gli avvisi di SmartScreen e Gatekeeper (su macOS serve un comando da Terminale) e gli aggiornamenti si scaricano a mano invece di installarsi in automatico.',
        alternatives: ['Build firmate con electron-updater', 'Mac App Store', 'Microsoft Store'],
      },
    },
  },

  '58d5a6a5-4384-4e0f-8824-f6b6011edae9': {
    excerpt:
      "Un'app mobile attenta alla privacy per tenere traccia degli abbonamenti, con riepiloghi delle spese, avvisi di rinnovo personalizzati e archiviazione offline che lascia i dati finanziari sul dispositivo.",
    role: 'Design e sviluppo (da solo)',
    platforms: 'Android · APK su GitHub Releases',
    architectureSummary: 'Offline-first, senza backend',
    storeLabel: "Scarica l'APK",
    coverAlt: 'Abbo',
    layersBoundary: 'SUL DISPOSITIVO',
    seoTitle: "Abbo — Case study di un'app per gestire gli abbonamenti",
    seoDescription:
      "Come ho realizzato Abbo, un'app React Native offline-first che tiene traccia degli abbonamenti, mostra le spese mensili in grafici e invia avvisi locali prima di ogni rinnovo.",
    gallery: {
      '4019838da9bc': {alt: 'Abbo'},
    },
    layers: {
      '15b124b00831': {
        name: 'Interfaccia',
        tech: 'React Native, Expo Router, 5 lingue',
        connector: "azioni dell'utente",
      },
      '6f73aff076c5': {
        name: "Stato dell'app",
        tech: 'React Context',
        connector: 'lettura / scrittura',
      },
      '6187aa6b6a78': {name: 'Archiviazione locale', tech: 'AsyncStorage'},
      '6ed8de7a601e': {
        name: 'Avvisi di rinnovo',
        tech: 'Expo Notifications, programmate in locale',
      },
      '73f0cae1fb9c': {name: 'Backend', tech: 'Nessun server, nessun account'},
    },
    decisions: {
      '200eea3523e3': {
        title: 'Tenere tutti i dati sul dispositivo',
        shortLabel: 'Offline-first',
        context:
          "Abbonamenti e spese sono dati finanziari sensibili, e l'app non ha bisogno di condividerli con nessuno.",
        decision:
          'Salvare tutto in locale con AsyncStorage. Nessun account, nessun server, nessuna sincronizzazione cloud.',
        tradeoff:
          "Nessuna sincronizzazione tra dispositivi, e i dati si perdono se l'app viene disinstallata.",
        alternatives: ['Firebase', 'Supabase', 'Un backend su misura'],
      },
      '28b65cc4cfd9': {
        title: 'Notifiche programmate in locale',
        shortLabel: 'Avvisi locali',
        context:
          'Gli utenti hanno bisogno di un promemoria prima del rinnovo di un abbonamento, così da avere il tempo di disdirlo.',
        decision:
          "Programmare gli avvisi di rinnovo sul dispositivo con Expo Notifications, in base alla data di ogni abbonamento e al preavviso scelto dall'utente.",
        tradeoff:
          'Gli avvisi vanno riprogrammati a ogni modifica di un abbonamento, e dipendono dal sistema operativo, che deve mantenere attive le notifiche programmate.',
        alternatives: ['Notifiche push inviate dal server (FCM)', 'Eventi di calendario'],
      },
      '2b879545324e': {
        title: "Distribuire l'APK tramite GitHub Releases",
        shortLabel: 'Release APK',
        context:
          "Per pubblicare su Google Play serve un account Google Play Developer, che non ho, ma l'app doveva comunque arrivare in modo semplice agli utenti Android.",
        decision:
          'Pubblicare un APK firmato su GitHub Releases, con il link nel README e sul sito.',
        tradeoff:
          "Gli utenti devono consentire l'installazione da origini sconosciute, e non ci sono aggiornamenti né recensioni dallo store.",
        alternatives: ['Google Play'],
      },
    },
  },

  '7f0d5716-1201-45aa-8fee-6fdd445acac9': {
    excerpt:
      'Catalogo prodotti per un negozio di ferramenta e forniture industriali a Montesarchio. I clienti sfogliano, filtrano e cercano i prodotti e inviano richieste via WhatsApp o email. Niente carrello e niente checkout.',
    role: 'Design e sviluppo (da solo)',
    platforms: 'Web · sito statico',
    architectureSummary: 'Export statico, nessun server',
    layersBoundary: 'DAL CMS AL BROWSER',
    coverAlt: 'UtensilSud',
    seoTitle: 'UtensilSud — Case study di un sito web',
    seoDescription:
      'Catalogo statico in Next.js per un negozio di ferramenta, gestito con Sanity. Il sito si aggiorna dal CMS e i clienti inviano richieste via WhatsApp o email.',
    layers: {
      '50fc44c2856f': {
        name: 'Contenuti',
        tech: 'Sanity Studio (in italiano)',
        connector: 'pubblicazione · avvio della build',
      },
      '7123790a2a72': {
        name: 'Worker di deploy',
        tech: 'Cloudflare Worker',
        connector: 'esegue la build',
      },
      '1a1df9af31cf': {
        name: 'Build',
        tech: 'Export statico Next.js + GROQ in fase di build',
        connector: 'carica i file statici',
      },
      '40db6456ca10': {
        name: 'Hosting',
        tech: 'File statici su Cloudflare Pages',
        connector: 'serve le pagine',
      },
      '55a90bb11b61': {name: 'Browser', tech: "React · filtri del catalogo nell'URL"},
      d4c1bed5bae2: {name: 'Server a runtime', tech: 'Nessun codice lato server'},
      dcdf9827e6ec: {name: 'Carrello e pagamenti', tech: 'Richieste via WhatsApp / email'},
      '07775c740dd5': {name: 'Embed di terze parti', tech: 'Niente mappe, niente analytics'},
    },
    decisions: {
      beb710542328: {
        title: 'Pubblicare il sito come export statico',
        shortLabel: 'Export statico',
        context:
          'Il sito è una vetrina di prodotti senza utenti registrati né dati in tempo reale. Un server aggiungerebbe costi e manutenzione per contenuti che cambiano solo quando il cliente li modifica.',
        decision:
          'Next.js compila con output: "export". Sanity viene interrogato solo in fase di build (useCdn: false, solo contenuti pubblicati), quindi il risultato è HTML, JS e immagini su un hosting statico.',
        tradeoff:
          'Ogni modifica ai contenuti, compresi la modalità manutenzione e i recapiti, richiede una build completa. Le immagini non vengono ottimizzate, quindi vanno ridimensionate a mano.',
        alternatives: ['Rendering lato server', 'ISR', 'Live Content API'],
      },
      '2c69567b3db2': {
        title: 'Far avviare la build dal CMS',
        shortLabel: 'Deploy in un clic',
        context:
          'Con un sito statico, i contenuti pubblicati vanno online solo dopo una build. Il cliente non può avviare build né usare git.',
        decision:
          'Uno strumento "Aggiorna sito" in Sanity Studio invia una POST con un token Bearer a un worker di deploy esterno. Avvisa se ci sono bozze non pubblicate e attende 60 secondi tra un\'esecuzione e l\'altra. Il token è salvato in un documento Sanity privato.',
        tradeoff:
          'Gli aggiornamenti non sono istantanei, e il worker di deploy è un componente separato da ospitare e mantenere sicuro.',
        alternatives: [
          'Webhook di Sanity a ogni pubblicazione',
          'Build programmate',
          'Deploy manuali da parte dello sviluppatore',
        ],
      },
      e5ce25efcde0: {
        title: 'Catalogo con richieste, non e-commerce',
        shortLabel: 'Niente checkout',
        context:
          'Il negozio vende a officine e professionisti, e prezzi e disponibilità vengono spesso concordati direttamente. Un negozio online richiederebbe pagamenti, ordini e sincronizzazione del magazzino.',
        decision:
          'Ogni pagina prodotto mostra la disponibilità, un prezzo facoltativo (pieno e scontato) e i pulsanti WhatsApp/email con il prodotto già indicato. Le vendite avvengono fuori dal sito.',
        tradeoff: 'Niente ordini online né pagamenti. Ogni vendita passa da una conversazione.',
        alternatives: ['Shopify', 'WooCommerce', 'Carrello su misura'],
      },
      b63418e7ebce: {
        title: "Filtrare il catalogo nel browser, con lo stato nell'URL",
        shortLabel: 'Filtri lato client',
        context:
          "Un sito statico non ha un'API per eseguire ricerche. Le viste filtrate devono comunque essere condivisibili e restare tali dopo il ricaricamento della pagina.",
        decision:
          'L\'elenco completo dei prodotti viene incluso in fase di build. Ricerca, categoria, disponibilità, ordinamento e "mostra altri" (12 per pagina) funzionano in React e vengono salvati nella query string.',
        tradeoff:
          "Tutti i prodotti vengono inviati al browser, e la pagina diventa più pesante man mano che il catalogo cresce. Non c'è un motore di ricerca full-text.",
        alternatives: ['Query a Sanity dal browser', 'Una pagina statica per ogni filtro'],
      },
      '2c062dcb3ea7': {
        title: 'Niente embed di terze parti né tracciamento',
        shortLabel: 'Senza cookie',
        context:
          'Una mappa Google incorporata e gli script di analytics impostano cookie di terze parti, che richiederebbero un banner per il consenso.',
        decision:
          'La sezione "Dove siamo" mostra indirizzo, orari di apertura e un link a Google Maps, senza mappa incorporata. Il sito non usa analytics.',
        tradeoff:
          'I visitatori devono lasciare il sito per vedere la mappa, e non ci sono dati sul traffico.',
        alternatives: ['Mappa Google incorporata', 'Google Analytics', 'Analytics senza cookie'],
      },
    },
  },

  'ab948802-8fd7-4858-b843-39bbe4d75340': {
    excerpt:
      'Ho realizzato un sito vetrina moderno e responsive per Keiben Srl, che presenta in modo chiaro la sua gamma di stucchi e rasanti.',
    role: 'Design e sviluppo (da solo)',
    platforms: 'Web · Aruba',
    architectureSummary: 'Sito statico, senza backend',
    coverAlt: 'Keiben Srl',
    layersBoundary: 'HOSTING LINUX ARUBA',
    seoTitle: 'Keiben Srl — Case study di un sito vetrina',
    seoDescription:
      'Come ho realizzato un sito vetrina veloce e responsive per Keiben Srl: export statico Next.js su hosting condiviso, catalogo prodotti nel codice e contatore visite in PHP.',
    gallery: {
      ca08d048c34f: {alt: 'Home page', caption: 'Home page'},
      d9259d7803f4: {alt: 'Elenco prodotti', caption: 'Elenco prodotti'},
      '2441534bbc79': {alt: 'Pagina prodotto', caption: 'Pagina prodotto'},
    },
    layers: {
      '6b2c6210b552': {
        name: 'Browser',
        tech: 'Pagine responsive',
        connector: 'richiesta della pagina',
      },
      '230c3b3be5c7': {
        name: 'Sito statico',
        tech: 'Export statico Next.js, catalogo prodotti nel codice',
        connector: 'visualizzazione della pagina',
      },
      '7aac7f62da2e': {name: 'Contatore visite', tech: 'Script PHP'},
      '715d9c3de379': {name: 'Server Node / CMS', tech: 'Non utilizzato'},
    },
    decisions: {
      b8621b26d05f: {
        title: "Export statico sull'hosting condiviso esistente",
        shortLabel: 'Export statico',
        context:
          'Il cliente aveva già un hosting condiviso Linux su Aruba, che non può eseguire Node.js.',
        decision:
          'Realizzare il sito con Next.js e pubblicarlo come export statico, caricato come semplici file HTML, CSS e JS.',
        tradeoff:
          'Niente rendering lato server, niente API route e niente ottimizzazione automatica delle immagini.',
        alternatives: ['Vercel', 'Un VPS con Node', 'WordPress'],
      },
      '6f233cd21ff2': {
        title: 'Catalogo prodotti nel codice',
        shortLabel: 'Niente CMS',
        context: 'La gamma di prodotti è piccola e cambia raramente.',
        decision:
          'Definire ogni prodotto direttamente nel codice invece di caricarlo da un CMS o da un database.',
        tradeoff:
          'Il cliente non può modificare i prodotti da solo: ogni modifica richiede un nuovo deploy.',
        alternatives: ['CMS headless', 'WordPress', 'Database'],
      },
      '668874691b62': {
        title: 'Contatore visite in PHP sullo stesso hosting',
        shortLabel: 'Contatore PHP',
        context: 'Il cliente voleva sapere quante visite riceve il sito.',
        decision:
          'Un piccolo script PHP sullo stesso hosting, che supporta già PHP, conta le visite.',
        tradeoff: 'Solo numeri di base, niente statistiche dettagliate.',
        alternatives: ['Google Analytics', 'GoatCounter'],
      },
    },
  },

  'd602d22d-ced7-4f4e-81ef-8d007edaa256': {
    excerpt:
      'Il mio portfolio personale: un sito Next.js esportato in statico e gestito con Sanity, dove ogni progetto è presentato come un piccolo case study con architettura e decisioni tecniche.',
    role: 'Design e sviluppo (da solo)',
    platforms: 'Web',
    architectureSummary: 'Export statico, CMS headless, nessun server',
    coverAlt: 'piccolopellegrino.dev',
    layersBoundary: 'PIPELINE DI BUILD',
    seoTitle: 'piccolopellegrino.dev — Case study del portfolio',
    seoDescription:
      'Come ho realizzato il mio portfolio: export statico Next.js, Sanity come CMS headless, query GROQ tipizzate e build in un clic dallo Studio.',
    gallery: {
      '8a91efe8fddb': {alt: 'Home page', caption: 'Hero, progetti in evidenza e stack'},
      '0cbef45b03c6': {alt: 'Elenco progetti', caption: 'Filtrabile per App, Web e Desktop'},
      '945aa890428e': {
        alt: 'Case study di un progetto',
        caption: "Diagramma dell'architettura e decisioni",
      },
      '15af540b6d51': {
        alt: 'Sanity Studio',
        caption: 'Gestione dei contenuti e strumento Update Site',
      },
    },
    layers: {
      b57b139adb5e: {
        name: 'Sanity Studio',
        tech: 'Gestione dei contenuti',
        connector: 'pubblicazione',
      },
      d64aa049b5ef: {
        name: 'Content Lake',
        tech: 'Sanity · API GROQ',
        connector: 'GROQ in fase di build',
      },
      '54ca94895985': {
        name: 'Build Next.js',
        tech: 'Export statico',
        connector: 'HTML, CSS, JS statici',
      },
      '42409df15796': {name: 'Sito statico', tech: 'Pagine pre-renderizzate'},
      cb2d1aebe79d: {name: 'Modulo di contatto', tech: 'Servizio esterno per i moduli'},
      a659e528e9d2: {name: 'Server applicativo', tech: 'Nessun server, nessuna API route'},
    },
    decisions: {
      d0ff0aa0e266: {
        title: 'Export statico invece del rendering lato server',
        shortLabel: 'Export statico',
        context: 'I contenuti cambiano raramente e il sito non ha dati specifici per utente.',
        decision:
          'Compilare l\'intero sito con Next.js output: "export" e servirlo come file statici.',
        tradeoff:
          'Per aggiornare i contenuti serve una nuova build, e le funzioni lato server (API route, ottimizzazione delle immagini) non sono disponibili.',
        alternatives: ['SSR su un server Node', 'ISR su Vercel'],
      },
      '09cf2a44d2fb': {
        title: 'Sanity come CMS headless',
        shortLabel: 'CMS headless',
        context:
          'Ogni progetto è un case study strutturato (livelli, decisioni, galleria), scomodo da mantenere in file Markdown.',
        decision:
          'Modellare i progetti in Sanity con campi tipizzati e validazione, modificati in uno Studio personalizzato.',
        tradeoff: 'Aggiunge una dipendenza esterna, e i contenuti vivono fuori dal repository.',
        alternatives: ['File MDX nel repository', 'File JSON'],
      },
      '02f7f6f784c7': {
        title: 'Build in un clic dallo Studio',
        shortLabel: 'Deploy manuale',
        context: 'Un sito statico va ricompilato per mostrare i nuovi contenuti.',
        decision:
          'Uno strumento "Update Site" nello Studio, protetto da password, avvia una build solo quando lo decido io.',
        tradeoff: 'Pubblicazione e deploy sono due passaggi separati.',
        alternatives: ['Webhook a ogni pubblicazione', 'Build programmate'],
      },
      '78577a97f97a': {
        title: 'Modulo di contatto senza backend',
        shortLabel: 'Senza backend',
        context: "Il modulo di contatto è l'unica funzione dinamica del sito.",
        decision: 'Inviare i dati a un servizio esterno per i moduli direttamente dal browser.',
        tradeoff: 'Dipende da un servizio esterno e dai suoi limiti.',
        alternatives: ['Funzione serverless', 'Semplice link mailto'],
      },
      '555f330d1948': {
        title: 'Query GROQ tipizzate',
        shortLabel: 'TypeGen',
        context:
          'Una modifica allo schema potrebbe rompere il frontend senza che nessuno se ne accorga.',
        decision: 'Generare i tipi TypeScript dallo schema e dalle query con Sanity TypeGen.',
        tradeoff: "C'è un passaggio di generazione in più dopo ogni modifica dello schema.",
        alternatives: ['Tipi scritti a mano', 'GraphQL con codegen'],
      },
    },
  },
}

export const stackGroups: Record<string, Item> = {
  d52f19542a4b: {title: 'Mobile'},
  b3242cd5c626: {title: 'Web'},
  '018ea5f50999': {title: 'Desktop'},
  d44d30c51618: {title: 'Backend e dati'},
  '4a236e6578ed': {title: 'DevOps'},
  '29f4c8b32b4e': {title: 'Flusso di lavoro'},
}

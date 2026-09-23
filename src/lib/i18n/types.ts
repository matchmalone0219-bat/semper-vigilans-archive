export type Locale = "zh" | "en";

export interface TranslationDictionary {
  nav: {
    dossier: string;
    facts: string;
    plot: string;
    cast: string;
    log: string;
    people: string;
    places: string;
    cases: string;
    universe: string;
    theBatman: string;
    thePenguin: string;
    dcComics: string;
    timeline: string;
    gear: string;
    production: string;
    noirCinema: string;
    score: string;
    soundtrack: string;
    cinematography: string;
    locations: string;
    gallery: string;
    interviews: string;
    collectibles: string;
    figures: string;
    props: string;
    statues: string;
    vehicles: string;
    lego: string;
    comics: string;
    media: string;
    posters: string;
    artPrints: string;
    fashion: string;
    lifestyle: string;
    toys: string;
    miniatures: string;
    cipher: string;
    searchButton: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  meta: {
    certainty: {
      confirmed: string;
      hint: string;
      rumor: string;
      debunked: string;
      classified: string;
    };
    sourceTier: {
      official: string;
      press: string;
      set: string;
      archive: string;
    };
    status: {
      alive: string;
      dead: string;
      arkham: string;
      gone: string;
      rumor: string;
    };
  };
  common: {
    all: string;
    collapse: string;
    expand: string;
    reset: string;
    copyLink: string;
    copied: string;
    backToTop: string;
    close: string;
    filter: string;
    count: string;
    source: string;
    verifiedAt: string;
    debunkedAt: string;
    details: string;
    learnMore: string;
  };
  home: {
    heroKicker: string;
    archiveTitle: string;
    movieTitleEn: string;
    movieTitleZh: string;
    director: string;
    releaseDate: string;
    format: string;
    countdownLabel: string;
    countdown: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    viewDossier: string;
    exploreMap: string;
    coreLinksKicker: string;
    coreLinksTitle: string;
    coreLinksSubtitle: string;
    coreLinks: {
      dossierTitle: string;
      dossierDesc: string;
      universeTitle: string;
      universeDesc: string;
      craftTitle: string;
      craftDesc: string;
      merchTitle: string;
      merchDesc: string;
    };
    signals: {
      title: string;
      subtitle: string;
      tabs: {
        all: string;
        confirmed: string;
        press: string;
        set: string;
      };
      empty: string;
    };
  };
  dossier: {
    tabs: {
      facts: string;
      plot: string;
      cast: string;
      log: string;
    };
    facts: {
      title: string;
      titleZhKey: string;
      directorKey: string;
      cinematographyKey: string;
      scoreKey: string;
      productionKey: string;
      distributionKey: string;
      workingTitleKey: string;
      principalKey: string;
      locationsKey: string;
      universeKey: string;
    };
    plot: {
      title: string;
      allClues: string;
      confirmedOnly: string;
      hintsOnly: string;
      rumorsOnly: string;
      debunkedOnly: string;
      debunkedWatermark: string;
    };
    cast: {
      title: string;
      subtitle: string;
      confirmedCast: string;
      rumoredCast: string;
    };
    shootLog: {
      title: string;
      subtitle: string;
      allMonths: string;
      filterKicker: string;
    };
  };
  relations: {
    description: string;
    compassTitle: string;
    compassTips: string;
    factionFilterLabel: string;
    kindFilterLabel: string;
    allRelations: string;
    focusPerson: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    fullscreen: string;
    exitFullscreen: string;
    warRoomTitle: string;
    escHint: string;
    closeCard: string;
    focusInTopology: string;
    quickFocusTitle: string;
    quickFocusHint: string;
    connectionListTitle: string;
    factions: {
      wayne: string;
      gcpd: string;
      falcone: string;
      underground: string;
      arkham: string;
    };
    kinds: {
      blood: string;
      bond: string;
      ally: string;
      foe: string;
      kill: string;
      rumor: string;
    };
  };
  search: {
    title: string;
    placeholder: string;
    hint: string;
    all: string;
    clues: string;
    people: string;
    places: string;
    gear: string;
    shootLog: string;
    merch: string;
    resultsCount: string;
    noResults: string;
  };
  footer: {
    siteDesc: string;
    disclaimer: string;
    sections: {
      dossier: string;
      artAndRoots: string;
      interactive: string;
    };
  };
}

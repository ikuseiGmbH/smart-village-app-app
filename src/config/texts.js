import appJson from '../../app.json';

export const texts = {
  backToTop: 'zurück nach oben',
  bbBus: {
    authority: {
      elevator: 'Aufzug vorhanden',
      openingTime: 'Öffnungszeiten',
      wheelchairAccessible: 'Rollstuhlgerecht'
    },
    categoryFilter: {
      label: 'Lebenslage'
    },
    employees: 'Ansprechpartner',
    initialFilter: {
      aToZ: 'A-Z',
      top10: 'Meistgesucht',
      search: 'Suche'
    },
    locationFilter: {
      label: 'Ort',
      searchPlaceholder: 'Suche'
    },
    textSearch: {
      label: 'Dienstleistung',
      placeholder: 'Was suchen Sie?'
    }
  },
  bookmarks: {
    bookmarks: 'Lesezeichen',
    noBookmarksinCategory:
      'In dieser Kategorie wurden noch keine Einträge für die Lesezeichenliste markiert. Sobald etwas markiert wurde, wird es hier zu finden sein!',
    noBookmarksYet:
      'Es wurden noch keine Beiträge, Touren oder Orte für die Lesezeichenliste markiert. Sobald etwas markiert wurde, wird es hier zu finden sein!',
    showAll: 'Alle anzeigen'
  },
  categoryFilter: {
    dataProvider: 'Datenquelle',
    category: 'Kategorie'
  },
  categoryList: {
    intro: ''
  },
  categoryTitles: {
    pointsOfInterest: 'Orte',
    tours: 'Touren'
  },
  constructionSites: {
    noInformationGiven: 'Derzeit sind zu keinen Baustellen Informationen vorhanden.'
  },
  detailTitles: {
    eventRecord: 'Veranstaltung',
    newsItem: 'Nachricht',
    pointOfInterest: 'Ort',
    tour: 'Tour'
  },
  errors: {
    noData: 'Bitte überprüfen Sie Ihre Internetverbindung.'
  },
  eventRecord: {
    appointments: 'Termine',
    description: 'Beschreibung',
    operatingCompany: 'Veranstalter',
    prices: 'Preise'
  },
  homeButtons: {
    events: 'Alle Veranstaltungen anzeigen',
    news: 'Alle Nachrichten anzeigen',
    pointsOfInterest: 'Alle Touren und Orte anzeigen'
  },
  homeTitles: {
    about: 'Über die App',
    events: 'Veranstaltungen',
    pointsOfInterest: 'Touren und Orte',
    service: 'Service',
    company: 'Städtische Unternehmen'
  },
  homeCategoriesNews: {
    categoryTitle: 'Nachrichten',
    categoryTitleDetail: 'Nachricht'
  },
  navigationTitles: {
    home: 'Übersicht'
  },
  pointOfInterest: {
    description: 'Beschreibung',
    location: 'Anfahrt',
    openingTime: 'Öffnungszeiten',
    operatingCompany: 'Anbieter',
    prices: 'Preise'
  },
  pushNotifications: {
    approve: 'Jetzt einschalten',
    decline: 'Vielleicht später',
    greetingBody:
      'Damit Sie wichtige Mitteilungen aus Ihrer Kommune erreichen, würden wir Ihnen gerne Benachrichtigungen schicken. Sie können diese Einstellung jederzeit in Ihrem persönlichen Bereich ändern.',
    greetingTitle: 'Willkommen',
    permissionMissingBody: 'Bitte überprüfe deine Benachrichtigungseinstellungen im System.',
    permissionMissingTitle: 'Hinweis'
  },
  screenTitles: {
    home: appJson.expo.name,
    service: appJson.expo.name,
    company: appJson.expo.name,
    about: appJson.expo.name,
    constructionSite: 'Baustelle',
    constructionSites: 'Baustellen',
    settings: 'Einstellungen',
    weather: 'Wetter'
  },
  settingsContents: {
    analytics: {
      no: 'Nein',
      onActivate:
        'Soll Matomo Analytics aktiviert werden? Dies trägt zur Verbesserung der App bei. Matomo Analytics wird nach der Aktivierung mit dem nächsten Neustart der App wirksam.',
      onDeactivate:
        'Soll Matomo Analytics deaktiviert werden? Die Deaktivierung von Matomo Analytics wird mit dem nächsten Neustart der App wirksam.',
      yes: 'Ja'
    }
  },
  settingsScreen: {
    intro: ''
  },
  settingsTitles: {
    analytics: 'Matomo Analytics',
    listLayouts: {
      cardList: 'Liste mit großen Bildern',
      eventRecordsTitle: 'Veranstaltungen',
      imageTextList: 'Liste mit kleinen Bildern',
      newsItemsTitle: 'Nachrichten',
      pointsOfInterestAndToursTitle: 'Touren und Orte',
      sectionTitle: 'Listen-Layouts',
      textList: 'Textliste'
    },
    pushNotifications: 'Push-Benachrichtigungen'
  },
  tabBarLabel: {
    home: 'Übersicht',
    service: 'Service',
    company: 'Unternehmen',
    about: 'Mehr'
  },
  tmb: {
    notice:
      '<p><br /><em>Dies ist ein Service der TMB Tourismus-Marketing Brandenburg GmbH und der regionalen Tourismuspartner. Mehr Informationen zu Reisen und Ausflügen ins Land Brandenburg erhalten sie auf <a href="https://www.reiseland-brandenburg.de" title="www.reiseland-brandenburg.de"><em>www.reiseland-brandenburg.de</em></a></em></p>'
  },
  tour: {
    description: 'Beschreibung',
    end: 'Tourende',
    operatingCompany: 'Veranstalter',
    start: 'Tourbeginn',
    tour: 'Tourverlauf'
  },
  weather: {
    alertsHeadline: 'Wetterwarnungen',
    currentHeadline: 'Aktuelles Wetter',
    nextDaysHeadline: 'Wetter der nächsten Tage'
  }
};

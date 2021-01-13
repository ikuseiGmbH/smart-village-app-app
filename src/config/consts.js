const ONCE_A_DAY = 'ONCE_A_DAY';

export const consts = {
  DRAWER: 'drawer',
  TABS: 'tabs',

  POLL_INTERVALS: {
    WEATHER: 3600000
  },

  REFRESH_INTERVALS: {
    // refresh intervals per time:
    ONCE_A_DAY: ONCE_A_DAY,
    // refresh intervals per type:
    STATIC_CONTENT: ONCE_A_DAY,
    NEWS: ONCE_A_DAY,
    EVENTS: ONCE_A_DAY,
    POINTS_OF_INTEREST: ONCE_A_DAY,
    TOURS: ONCE_A_DAY
  },

  DIMENSIONS: {
    // the max screen size we want to render full screen
    FULL_SCREEN_MAX_WIDTH: 414
  },

  MATOMO_TRACKING: {
    SCREEN_VIEW: {
      COMPANY: 'Company',
      CONSTRUCTION_SITE_DETAIL: 'Construction',
      CONSTRUCTION_SITES: 'Constructions',
      EVENT_RECORDS: 'Events',
      FEEDBACK: 'Feedback',
      HOME: 'Home',
      HTML: 'Content',
      MORE: 'More',
      NEWS_ITEMS: 'News',
      POINTS_OF_INTEREST_AND_TOURS: 'Points of interest and tours',
      POINTS_OF_INTEREST: 'Points of interest',
      SERVICE: 'Service',
      SETTINGS: 'Settings',
      TOURS: 'Tours',
      WEATHER: 'Weather',
      WEB: 'Web'
    }
  },

  LIST_TYPES: {
    TEXT_LIST: 'textList',
    IMAGE_TEXT_LIST: 'imageTextList',
    CARD_LIST: 'cardList'
  }
};

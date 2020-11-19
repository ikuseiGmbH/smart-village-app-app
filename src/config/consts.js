const ONCE_A_DAY = 'ONCE_A_DAY';

export const consts = {
  DRAWER: 'drawer',
  TABS: 'tabs',

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
      HOME: 'Home',
      NEWS_ITEMS: 'News',
      EVENT_RECORDS: 'Events',
      POINTS_OF_INTEREST: 'Points of interest',
      TOURS: 'Tours',
      POINTS_OF_INTEREST_AND_TOURS: 'Points of interest and tours',
      SERVICE: 'Service',
      COMPANY: 'Company',
      WEB: 'Web',
      FEEDBACK: 'Feedback',
      HTML: 'Content',
      MORE: 'More'
    }
  }
};

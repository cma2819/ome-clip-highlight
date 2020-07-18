
export type MessageMap = {
  'importClip': {
    data: {
      channel: string;
      sort: 'title'|'viewCount';
      length: number;
      start: string;
      end: string;
    };
  }

  'enableClip': {
    data: string
  }

  'disableClip': {
    data: string
  }

  'transitionTo': {
    data: string
  }
};

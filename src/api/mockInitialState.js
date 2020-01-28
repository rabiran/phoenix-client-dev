export default {
  groups: {
    rootGroupsIds: ['1', '4'],
    byId: {
      "1": {
        id: '1',
        name: 'אחד',
        children: ['2','3']
      },
      "2": {
        id: '2',
        name: 'שתיים',
        isAleaf: true
      },
      "3": {
        id: '3',
        name: 'שלוש',
        isAleaf: true
      },
      "4": {
        id: '4',
        name: 'מיאו',
        // children: ['5']
      },
    }
  }
};

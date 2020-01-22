export default {
  groups: {
    rootGroupsIds: ['1', '4'],
    byId: {
      "1": {
        id: '1',
        name: 'one',
        children: ['2','3']
      },
      "2": {
        id: '2',
        name: 'two',
        isAleaf: true
      },
      "3": {
        id: '3',
        name: 'three',
        isAleaf: true
      },
      "4": {
        id: '4',
        name: 'four',
        // children: ['5']
      },
    }
  }
};

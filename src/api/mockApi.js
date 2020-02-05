const timeout = 500;

const resolveAfter = (data, timeoutMs = timeout) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(data), timeoutMs);
});

export const fetchGroupChildren = id => id === '4' ? 
  resolveAfter([{ id: '5', name: 'חמש', isAleaf: true }, {id: '6', name: 'שש', isAleaf: true}, {id: '4', name: 'ארבע', children: ['5','6']},]) 
  : resolveAfter([]);

 
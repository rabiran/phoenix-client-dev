const timeout = 1000;

const resolveAfter = (data, timeoutMs = timeout) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(data), timeoutMs);
});

export const fetchGroupChildren = id => id === '4' ? resolveAfter([{ id: '5', name: 'חמש', isAleaf: true }]) 
  : resolveAfter([]);


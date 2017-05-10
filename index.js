/**
 * Soundfile.io Promise Batch Processing Gateway
 * 
 * @param {Array} items 
 * @param {Function} item processing function 
 * @returns {Promise}
 */
module.exports = (_items, fn) => {  
  if (_items === undefined) {
    throw new Error("Missing Items Argument");
  }

  if (fn === undefined) {
    throw new Error("Missing Process Function Argument");
  }

  if (!Array.isArray(_items)) {
    throw new Error("Items argument is not 'Array' type");
  }

  if (typeof fn !== "function") {
    throw new Error("Process Function is not 'function' type");
  }

  return new Promise((resolve, reject) => {  
    const items = _items.slice(0);
    const results = [];

    const process = () => {
      const item = items[0];
      fn(item, (error, result) => {
        if (error) {
          reject(error);
        } else {
          results.push(result);
          items.shift();
          if (items.length > 0) {
            process();
          } else {
            resolve(results);
          }
        }
      });
    };
    
    if (items.length > 0) {
      process();
    } else {
      resolve([]);
    }
  });
};

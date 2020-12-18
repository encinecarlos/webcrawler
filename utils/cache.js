const mCache = require('memory-cache');

const cache = {
    duration: 1000 * 60 * 10,
    getCache(key) {
        const cachedContent = mCache.get(key);
        if(cachedContent) {
            return JSON.parse(cachedContent);
        }

        return;
    },
    setCache(key, content) {
        return mCache.put(key, content, this.duration);
    } 
}

module.exports = cache;
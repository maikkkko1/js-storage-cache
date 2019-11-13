/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-11-13 16:33:17
 * @modify date 2019-11-13 16:33:17
 * @desc Simple cache system using the localStorage.
 */

'use strict';

const CACHE_NAME_KEY = '__c_2df2a4ade2936ea5639c79d631a51a08'; // Unique key to identify the cache in Storage.

export default class StorageCache {
    /**
     * Inserts a value into the cache.
     * @param cacheKey - Object key to cache.
     * @param value - Value to cache.
     * @param timeToExpire - Time in minutes to expire from cache, if no value is passed the cache will never expire.
     * @return {void}
     */
    set(cacheKey, value, timeToExpire) {
        let cacheObject = this._getCacheObject();

        timeToExpire = timeToExpire != null ? this._getExpireDate(timeToExpire) : 0;

        let initialInsertObject = [
            { key: cacheKey, data: value, expireWhen: timeToExpire },
        ];

        let insertObject = { key: cacheKey, data: value, expireWhen: timeToExpire };

        if (cacheObject == null) {
            localStorage.setItem(CACHE_NAME_KEY, this.toJSON(initialInsertObject));
        } else {
            cacheObject = this.parse(cacheObject);

            let findObject = false;

            for (let k = 0; k < cacheObject.length; k++) {
                if (cacheObject[k].key == cacheKey) {
                    cacheObject[k] = insertObject;

                    findObject = true;
                }
            }

            if (!findObject) {
                cacheObject.push(insertObject);
            }

            localStorage.setItem(CACHE_NAME_KEY, this.toJSON(cacheObject));
        }

        return true;
    }

    /**
     * Returns an object from the cache.
     * @param cacheKey - Item key in cache.
     * @return {object | boolean}
     */
    get(cacheKey) {
        let cacheObject = this._getCacheObject();

        if (cacheObject == null || cacheObject == undefined) return false;

        cacheObject = this.parse(cacheObject);

        for (let k = 0; k < cacheObject.length; k++) {
            this.verifyExpiredKeys(cacheObject[k].key);

            if (cacheObject[k].key == cacheKey) {
                return cacheObject[k].data;
            }
        }

        return false;
    }

    /**
     * Returns the existing keys in the cache object.
     */
    getKeys() {
        let cacheObject = this._getCacheObject();

        if (cacheObject == null || cacheObject == undefined) return null;

        cacheObject = this.parse(cacheObject);

        let cacheKeys = [];

        for (let k = 0; k < cacheObject.length; k++) {
            cacheKeys.push(cacheObject[k].key);
        }

        return cacheKeys;
    }

    /**
     * Checks if the informed cache key is expired.
     * @param cacheKey
     * @return {boolean}
     */
    isExpired(cacheKey) {
        let cacheObject = this._getCacheObject();

        if (cacheObject == null || cacheObject == undefined) return true;

        cacheObject = this.parse(cacheObject);

        let baseDate = new Date();
        let actualDate = new Date(
            baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
        );

        for (let k = 0; k < cacheObject.length; k++) {
            if (cacheObject[k].key == cacheKey) {
                if (cacheObject[k].expireWhen == 0) return false;

                if (new Date(cacheObject[k].expireWhen) > actualDate) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Removes a key and its object from the cache.
     * @param cacheKey
     * @return {boolean}
     */
    removeKey(cacheKey) {
        let cacheObject = this._getCacheObject();

        if (cacheObject == null || cacheObject == undefined) return false;

        cacheObject = this.parse(cacheObject);

        for (let k = 0; k < cacheObject.length; k++) {
            if (cacheObject[k].key == cacheKey) {
                cacheObject.splice(k, 1);
            }
        }

        localStorage.setItem(CACHE_NAME_KEY, this.toJSON(cacheObject));

        return true;
    }

    verifyExpiredKeys(cacheKey) {
        if (this.isExpired(cacheKey)) {
            this.removeKey(cacheKey);
        }
    }

    /**
     * Removes all keys and objects from the cache.
     */
    clear() {
        localStorage.removeItem(CACHE_NAME_KEY);
    }

    _getExpireDate(minutesToExpire) {
        let baseDate = new Date();
        let date = new Date(
            baseDate.valueOf() - baseDate.getTimezoneOffset() * 60000
        );

        return new Date(date.getTime() + minutesToExpire * 60000).toISOString();
    }

    _getCacheObject() {
        return localStorage.getItem(CACHE_NAME_KEY);
    }

    /**
     * Returns a formatted JSON value.
     * @param {String} value
     * @return {Object}
     */
    parse(value) {
        return JSON.parse(atob(value));
    }

    /**
     * Inserts a value in JSON format.
     * @param {*} value
     */
    toJSON(value) {
        return btoa(JSON.stringify(value));
    }
}
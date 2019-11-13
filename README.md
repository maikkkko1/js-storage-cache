# JS Storage Cache

### Easily cache data, request returns, and other data.

Installation
------ 

npm install js-storage-cache@1.0.0

Usage examples
------ 

Insert an item into the cache. 

```javascript
import StorageCache from 'js-storage-cache';

const storageCache = new StorageCache();

// Insert a string that will expire in 10 minutes.
storageCache.set('testKey', 'foo', 10);

// Insert a object/array that will expire in 5 minutes..
storageCache.set('testKey', [{a: 'foo'}, {a: 'bee'}], 5);
```

Retrieve an item from the cache.

```javascript
// Retrieve the item, if not found returns false.
storageCache.get('testKey');
```

Removes a key and its object from the cache.

```javascript
// Remove the item if exists.
storageCache.removeKey('testKey');
```

Documentation
------ 

#### Cache data will always be saved to browser localStorage with key '__c_2df2a4ade2936ea5639c79d631a51a08'.

#### Every time the **get** method is executed, an expired key check is performed, and if any are found, the key is removed.

* set(key, value, timeToExpire) - Inserts a value into the cache.
* get(key) - Returns an object from the cache.
* getKeys() - Returns the existing keys in the cache object.
* isExpired(key) - Checks if the informed cache key is expired.
* removeKey(key) - Removes a key and its object from the cache.
* verifyExpiredKeys(key) - Checks if a key is expired, if it removes the key.
* clear() - Removes all keys and objects from the cache.


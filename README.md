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

Methods documentation
------ 

* set(key, value, timeToExpire) - Inserts a value into the cache.
dsadas

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

// Insert a string.
storageCache.set('testKey', 'foo', 10);

// Insert a object/array.
storageCache.set('testKey', [{a: 'foo'}, {a: 'bee'}], 10);
```

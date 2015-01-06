meteor-memcached
================

Memcached package for meteor without Npm module requirements, based on 3rd-Eden node-memcached: https://github.com/3rd-Eden/node-memcached

```
  meteor add q42:memcached

  var memcached = new Memcached( [ 'localhost:11211', 'localhost:11212'] );

  memcached.set( "key", "value", 2, function (err, res) {
    console.log("memcached set action response", err, res);
  });
```

================

Note: Still Unvalidated version, we're working on testing and validating everything right now.

Note 2: the hashring algorithm in the memcached client is somewhat altered for porting reasons, still need to validate functionality.

Todo: Add all MIT license references to 3rd-Eden and other creators of the used open-source software.

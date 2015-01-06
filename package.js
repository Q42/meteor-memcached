Package.describe({
  name: 'q42:memcached',
  summary: 'Memcached client for Meteor. Wrapped 3rd-eden memcached module, based on version 2.0.0: https://github.com/3rd-Eden/node-memcached',
  version: '2.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2');
  //api.addFiles('q42:memcached.js');
  api.addFiles('server/utils.js');
  api.addFiles('server/ms.js');
  api.addFiles('server/connection-parse.js');
  api.addFiles('server/simple-lru.js');
  api.addFiles('server/retry-operation.js');
  api.addFiles('server/retry.js');
  api.addFiles('server/jackpot.js');
  api.addFiles('server/hashring.js');
  api.addFiles('server/connection.js');
  api.addFiles('server/memcached.js');
  api.export('Memcached');
});

Package.onTest(function(api) {

});

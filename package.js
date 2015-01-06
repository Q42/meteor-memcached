Package.describe({
  name: 'q42:memcached',
  summary: 'Memcached client for Meteor. Based on 3rd-eden node-memcached,version 2.0.0',
  version: '2.0.3',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2');

  api.addFiles(['lib/utils.js', 'lib/ms.js', 'lib/connection-parse.js', 'lib/simple-lru.js', 'lib/retry-operation.js',
  'lib/retry.js','lib/jackpot.js','lib/hashring.js','lib/connection.js','q42:memcached.js'], 'server');
  api.export('Memcached');

});

Package.onTest(function(api) {

});

var path = require('path');

exports.topics = [{
  name: 'devsync',
  description: 'Develop on Heroku'
}];

exports.commands = [{
  topic: 'devsync',
  command: 'init',
  description: 'Initialize your project to develop directly on Heroku',
  needsApp: false,
  needsAuth: false,
  args: [],
  run: function (ctx) {
    invoke('devsync-init')(ctx.app);
  }
}, {
  topic: 'devsync',
  command: 'watch',
  description: 'Starts watching for changes and sync back to the app',
  needsApp: true,
  needsAuth: false,
  run: function (ctx) {
    invoke('devsync-watch')(ctx.app);
  }
}];

function invoke(cmd) {
  return function (app) {
    cmd = path.resolve(process.env.HOME, './.devsync/' + cmd) + ' ' + app;

    var process = require('child_process').spawn(cmd);

    ['stdout', 'stderr'].forEach(function (io) {
      process[io].pipe(process[io]);
    });
  }
}

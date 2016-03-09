/* jshint -W097 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the laudable ' + chalk.red('avbrick') + ' generator!'));
  },

  prompting: function () {
    var done = this.async();


    var prompts = [];

    this.prompt({
      type: 'input',
      name: 'name',
      message: 'What is the name of your brick ?',
      required: true,
    }, function (answers) {
      this.name = answers.name;
      done();
    }.bind(this));
  },

  writing: {
    test: function() {
      console.log(this.name);

      this.fs.copyTpl(
        this.templatePath('test/src/index.html.twig'),
        this.destinationPath('test/src/index.html.twig')
      );

      this.fs.copyTpl(
        this.templatePath('test/src/style.scss'),
        this.destinationPath('test/src/style.scss'),
        { name: this.name }
      );
    },
    gui: function() {
      this.fs.copyTpl(
        this.templatePath('gui/gui.html.twig'),
        this.destinationPath('gui/gui.html.twig'),
        { name: this.name }
      );
      this.fs.copyTpl(
        this.templatePath('gui/gui.scss'),
        this.destinationPath('gui/gui.scss')
      );
    },
    scss: function() {
      this.fs.copyTpl(
        this.templatePath('pod.scss'),
        this.destinationPath(this.name + '.scss'),
        { name: this.name }
      );
    },
    twig: function() {
      this.fs.copyTpl(
        this.templatePath('pod.html.twig'),
        this.destinationPath(this.name + '.html.twig'),
        { name: this.name }
      );
    },
    injector: function() {
      this.fs.copyTpl(
        this.templatePath('injector.json'),
        this.destinationPath('injector.json'),
        { name: this.name }
      );
    },
    npm: function() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        { name: this.name }
      );
    },
    bower: function() {
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        { name: this.name }
      );
      this.fs.copyTpl(
        this.templatePath('_bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },
    linters: function() {
      this.fs.copyTpl(
        this.templatePath('_scss-lint.yml'),
        this.destinationPath('.scss-lint.yml')
      );
    },
    git: function() {
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    gulp: function() {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        { name: this.name }
      );
    },
    editorconfig: function() {
      this.fs.copyTpl(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },
  },

  install: function () {
    this.devDependencies = [
      'gulp',
      'gulp-size',
      'gulp-notify',
      'gulp-load-plugins',
      'fs-extra',
      'run-sequence',
      'gulp-twig',
      'gulp-ext-replace',
      'gulp-prettify',
      'gulp-sourcemaps',
      'gulp-sass',
      'gulp-autoprefixer',
      'browser-sync',
    ];
    this.npmInstall(this.devDependencies, { 'saveDev': true });
  }
});

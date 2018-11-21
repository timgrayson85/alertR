module.exports = function(grunt) {

grunt.initConfig({
    less: {
        development: {
          options: {
            paths: ["public"]
          },
          files: {
            "./public/style.css" : "./public/style.less" 
          }
        }
    },
    jshint: {
        files: ["app.js","public/functions.js","test/*.js" ]
    } 
});


grunt.loadNpmTasks("grunt-contrib-jshint");
grunt.loadNpmTasks('grunt-force-task');
grunt.loadNpmTasks('grunt-contrib-less');

grunt.registerTask("default", ["force:jshint","less"]);

};
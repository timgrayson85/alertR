module.exports = function(grunt) {

grunt.initConfig({
    jshint: {
        files: ["*.js","public/*.js","test/*.js" ]
    },
    


});

grunt.loadNpmTasks("grunt-contrib-jshint");
grunt.loadNpmTasks('grunt-force-task');


grunt.registerTask("default", ["force:jshint"]);

};
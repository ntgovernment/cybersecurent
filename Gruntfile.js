module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      ntgbase: {
        files: {
          "preflight/ntgbase/css/ntgbase.css": "src/sass/ntgbase.scss",
        },
      },
      squizUI: {
        files: {
          "preflight/squiz/squizUI.css": "src/sass/squizUI.scss",
        },
      },
      fontawesomeSCSS: {
        files: {
          "preflight/fontawesome.css": "src/sass/_fontawesome.scss",
        },
      },
    },
    cssmin: {
      ntgbase: {
        files: [
          {
            expand: true,
            cwd: "preflight/ntgbase/css",
            src: ["ntgbase.css"],
            dest: "dist/ntgbase",
            ext: ".min.css",
          },
        ],
      },
      plugins: {
        files: [
          {
            expand: true,
            cwd: "dist/globals/css",
            src: ["plugins.css"],
            dest: "dist/globals/css",
            ext: ".min.css",
          },
        ],
      },
      squizUI: {
        files: [
          {
            expand: true,
            cwd: "preflight/squiz",
            src: ["squizUI.css"],
            dest: "dist/globals/css",
            ext: ".min.css",
          },
        ],
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: "preflight",
            src: ["fontawesome.css"],
            dest: "dist/globals/css",
            ext: ".min.css",
          },
        ],
      },
    },
    uglify: {
      ntgbase: {
        files: [
          {
            expand: true,
            cwd: "src/js/plugins",
            src: ["**/*.js"],
            dest: "preflight/ntgbase/js/plugins",
            ext: ".min.js",
          },
          {
            expand: true,
            cwd: "src/js/ntgbase/components",
            src: ["**/*.js"],
            dest: "preflight/ntgbase/js/components",
            ext: ".min.js",
          },
          {
            expand: true,
            cwd: "src/js/ntgbase/global/1.0",
            src: ["**.js"],
            dest: "preflight/ntgbase/js",
            ext: ".min.js",
          },
        ],
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: "src/js/bootstrap/5.2.3",
            src: ["**/*.js"],
            dest: "dist/globals/js", // Updated destination
          },
        ],
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: "src/js/jquery/3.6.0",
            src: ["**/*.js"],
            dest: "dist/globals/js", // Updated destination
          },
        ],
      },
    },
    concat: {
      ntgbaseComponents: {
        src: ["preflight/ntgbase/js/components/**/*.js"],
        dest: "dist/ntgbase/ntgbase-components.min.js",
      },
      ntgbasePluginsCSS: {
        src: ["src/css/plugins/**/*.css"],
        dest: "dist/globals/css/plugins.css",
      },
      ntgbasePluginsJS: {
        src: ["preflight/ntgbase/js/plugins/**/*.js"],
        dest: "dist/ntgbase/ntgbase-plugins.min.js",
      },
      ntgbase: {
        src: ["preflight/ntgbase/js/main.min.js"],
        dest: "dist/ntgbase/ntgbase-main.min.js",
      },

      bootstrap: {},
      jquery: {},
    },
    clean: {
      ntgbasePluginsCSS: ["dist/globals/css/plugins.css"],
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: {
            path: "./",
            options: {
              index: "index.html",
            },
          },
          open: true,
        },
      },
    },
    watch: {
      ntgbaseSass: {
        files: ["src/sass/ntgbase/**/*.scss"],
        tasks: [
          "sass:ntgbase",
          "cssmin:ntgbase",
          "uglify:ntgbase",
          "concat:ntgbase",
        ],
      },
      fontawesomeSass: {
        files: ["src/sass/fontawesome/scss/*.scss"],
        tasks: ["sass:fontawesomeSCSS", "cssmin:fontawesome"],
      },
      ntgbaseJS: {
        files: [
          "src/js/bootstrap/**/*.js",
          "src/js/jquery/**/*.js",
          "src/js/plugins/**/*.js",
          "src/js/ntgbase/**/*.js",
        ],
        tasks: [
          "uglify:ntgbase",
          "concat:ntgbase",
          "concat:ntgbaseComponents",
          "concat:ntgbasePluginsJS",
        ],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("ntgbase", [
    "sass:ntgbase",
    "cssmin:ntgbase",
    "uglify:ntgbase",
    "concat:ntgbase",
    "concat:ntgbaseComponents",
    "concat:ntgbasePluginsJS",
  ]);

  grunt.registerTask("cssPlugins", [
    "concat:ntgbasePluginsCSS",
    "cssmin:plugins",
    "clean:ntgbasePluginsCSS",
  ]);
  grunt.registerTask("squizUI", ["sass:squizUI", "cssmin:squizUI"]);
  grunt.registerTask("fontawesomeSCSS", ["sass:fontawesomeSCSS"]);
  grunt.registerTask("fontawesome", ["cssmin:fontawesome"]);
  grunt.registerTask("bootstrap", ["uglify:bootstrap", "concat:bootstrap"]);
  grunt.registerTask("jquery", ["uglify:jquery", "concat:jquery"]);

  grunt.registerTask("run", [
    "ntgbase",
    "cssPlugins",
    "squizUI",
    "fontawesomeSCSS",
    "fontawesome",
    "bootstrap",
    "jquery",
    "connect",
    "watch",
  ]);
};

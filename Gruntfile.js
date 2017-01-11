module.exports = function(grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require('load-grunt-tasks')(grunt);

  // описываем задачи, которые планируем использовать (их запуск - см. низ этого файла)
  grunt.initConfig({

    // компилируем препроцессор
    less: {
      style: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
        },
        files: {
          // в какой файл, из какого файла
          'app/css/style.css': ['source/less/style.less']
        },
      }
    },

    //красивость стилей
    csscomb: {
    	style: {
    		expand: true,
    		src: ['source/less/**/*.less']
    	}
    },

    // обрабатываем postcss-ом (там только autoprefixer, на самом деле)
    postcss: {
      options: {
        processors: [
          // автопрефиксер и его настройки
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        // какие файлы обрабатывать (все .css в указанной папке)
        src: "app/css/*.css"
      }
    },

    // объединяем медиавыражения
    cmq: {
      style: {
        files: {
          // в какой файл, из какого файла (тут это один и тот же файл)
          'app/css/style.css': ['app/css/style.css']
        }
      }
    },

    // минимизируем стилевые файлы
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: [{
          expand: true,
          // в какой папке брать исходники
          cwd: 'app/css',
          // какие файлы (ЛЮБОЕ_ИМЯ.css, но не ЛЮБОЕ_ИМЯ.min.css)
          src: ['*.css', '!*.min.css'],
          // в какую папку писать результат
          dest: 'app/css',
          // какое расширение дать результатам обработки
          ext: '.min.css'
        }]
      }
    },

    // процесс копирования
    copy: {
      // копируем картинки
      img: {
        expand: true,
        // откуда
        cwd: 'source/img/',
        // какие файлы (все картинки (см. расширения) из корня указанной папки и всех подпапок)
        src: ['**/*.{png,jpg,gif,svg}'],
        // куда
        dest: 'app/img/',
      },

      js: {
        expand: true,
        // откуда
        cwd: 'source/js/',
        // какие файлы
        src: ['*.js'],
        // куда
        dest: 'app/js/',
      },
    },

    // обрабатываем разметку (инклуды, простейший шаблонизатор)
    includereplace: {
      html: {
        expand: true,
        // откуда брать исходные файлы
        cwd: 'source/',
        // какие файлы обрабатывать
        src: '*.html',
        // куда писать результат обработки
        dest: 'app/',
      }
    },

   // публикация на GitHub Pages (будет доступен в сети по адресу http://ВАШ-НИКНЕЙМ.github.io/ВАШ-РЕПОЗИТОРИЙ/)
    'gh-pages': {
      options: {
        // какую папку считать результатом работы
        base: 'app'
      },
      src: '**/*'
    },

    // слежение за файлами
    watch: {
      // перезагрузка? да, детка!
      livereload: {
        options: { livereload: true },
        files: ['app/**/*'],
      },
      // следить за стилями
      style: {
        // за фактом с сохранения каких файлов следить
        files: ['source/less/**/*.less'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['style'],
        options: {
          spawn: false,
        },
      },
      // следить за картинками
      images: {
        // за фактом с сохранения каких файлов следить
        files: ['source/img/**/*.{png,jpg,gif,svg}'],
        // какую задачу при этом запускать (сами задачи — см. ниже)
        tasks: ['img'],
        options: {
          spawn: false
        },
      },
      // следить за файлами разметки
      html: {
        // за фактом с сохранения каких файлов следить
        files: ['source/*.html', 'source/_html_inc/*.html'],
        // какую задачу при этом запускать (указан сам процесс)
        tasks: ['includereplace:html'],
        options: {
          spawn: false
        },
      },
    },

    // локальный сервер, автообновление
    browserSync: {
      dev: {
        bsFiles: {
          // за изменением каких файлов следить для автообновления открытой в браузере страницы с локального сервера
          src : [
            'app/css/*.css',
            'app/js/*.js',
            'app/img/*.{png,jpg,gif,svg}',
            'app/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            // корень сервера
            baseDir: "app/",
          },
          // синхронизация между браузерами и устройствами (если одна и та же страница открыта в нескольких браузерах)
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });



  // задача по умолчанию
  grunt.registerTask('default', [
    'style',
    'img',
    'includereplace:html',
    'copy:js',
    'browserSync',
    'watch'
  ]);

  // только компиляция стилей
  grunt.registerTask('style', [
    'less',
    'csscomb',
    'postcss',
    'cmq',
    'cssmin',
  ]);

  // только обработка картинок
  grunt.registerTask('img', [
    'copy:img',
  ]);

  // сборка
  grunt.registerTask('app', [
    'style',
    'img',
    'includereplace',
    'gh-pages'
  ]);

};
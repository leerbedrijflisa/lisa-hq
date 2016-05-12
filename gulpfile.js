var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("serve", function() {
    browserSync({
        server: {
            baseDir: "www"
        }
    });
});

gulp.task("watch", [ "serve" ], function() {
    gulp.watch(["*.js", "*.html", "*.css"], {cwd: "www"}, browserSync.reload); 
});
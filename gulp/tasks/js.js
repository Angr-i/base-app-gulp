
import webpack from 'webpack-stream'
export  const js = () =>{
  return app.gulp.src(app.path.src.js,{sourcemaps:app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title:"SCSS",
        message:"Error: <%= error.message %>"
      }))
    )
    .pipe(webpack({
      mode:app.idBuild ? 'production' : 'development',
      output:{
        filename: 'app.min.js'
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
}
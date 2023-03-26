import gulp  from "gulp";

import { path } from "./gulp/config/path.js";

import { plugins } from "./gulp/config/plugins.js";
global.app={
  isBuild:process.argv.includes('--build'),
  isDev:!process.argv.includes('--build'),
  path:path,
  gulp:gulp,
  plugins:plugins
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf,ttfToWoff,fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
const watcher =()=>{
  gulp.watch(path.watch.files,copy);
  gulp.watch(path.watch.html,html);
  gulp.watch(path.watch.scss,scss);
  gulp.watch(path.watch.js,js);
  gulp.watch(path.watch.images,images);
}

export {svgSprive}

const fonts = gulp.series(otfToTtf,ttfToWoff,fontsStyle)

const mainTask=gulp.series(fonts,gulp.parallel(copy,html,scss,js,images))

const dev = gulp.series(reset,mainTask,gulp.parallel(watcher,server))

const build = gulp.series(reset,mainTask)

const deployZIP = gulp.series(reset, mainTask, zip)
export {dev}
export {build}
export {deployZIP}

gulp.task('default',dev)
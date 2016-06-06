fis.match('*',{
	release:false
});
// 清除其他配置，只保留如下配置
fis.match('(ko-tab).js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js'),
  release:'$1.min.js'
});

fis.match('(ko-tab).css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css'),
  release:'$1.min.css'
});
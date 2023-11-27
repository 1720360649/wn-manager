const { defineConfig } = require('@vue/cli-service')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
          @import "@/include.scss";
        `,
			},
		},
	},
	configureWebpack: {
		plugins: [
      
		],
	},
})

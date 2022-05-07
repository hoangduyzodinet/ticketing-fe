/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");
const { i18n } = require("./i18n");

module.exports = withPlugins([], {
    experimental: {
        outputStandalone: true,
    },
    i18n,
});

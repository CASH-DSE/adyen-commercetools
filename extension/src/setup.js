const config = require('./config/config')
const ctpClientBuilder = require('./ctp')
const logger = require('./utils').getLogger()
const { ensureResources } = require('./config/init/ensure-resources')
const auth = require('./validator/authentication')

async function setupExtensionResources(apiExtensionBaseUrl) {
  const moduleConfig = config.getModuleConfig()
  const ctpProjectKeys = config.getAllCtpProjectKeys()
  const adyenMerchantAccounts = config.getAllAdyenMerchantAccounts()

  await Promise.all(
    ctpProjectKeys.map(async (ctpProjectKey) => {
      const ctpConfig = config.getCtpConfig(ctpProjectKey)
      const ctpClient = ctpClientBuilder.get(ctpConfig)
      await ensureResources(
        ctpClient,
        ctpConfig.projectKey,
        apiExtensionBaseUrl || moduleConfig.apiExtensionBaseUrl,
        auth.generateBasicAuthorizationHeaderValue(ctpConfig.projectKey)
      )
    })
  )

  logger.info(
    `Configured commercetools project keys are: ${JSON.stringify(
      ctpProjectKeys
    )}. ` +
      `Configured adyen merchant accounts are: ${JSON.stringify(
        adyenMerchantAccounts
      )}`
  )
}

module.exports = {
  setupExtensionResources,
}

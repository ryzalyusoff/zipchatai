ShopifyApp.configure do |config|
  config.application_name = "My Shopify App"
  
  config.old_secret = ""
  config.scope = "read_products"
  config.embedded_app = true
  config.new_embedded_auth_strategy = false #true
  config.after_authenticate_job = false
  config.api_version = "2025-04"
  config.shop_session_repository = 'Shop'
  config.log_level = :info
  config.reauth_on_access_scope_changes = true
  config.webhooks = [
    { topic: "app/uninstalled", address: "webhooks/app_uninstalled"},
    { topic: "customers/data_request", address: "webhooks/customers_data_request" },
    { topic: "customers/redact", address: "webhooks/customers_redact"},
    { topic: "shop/redact", address: "webhooks/shop_redact"}
  ]
  config.api_key = ENV.fetch('SHOPIFY_API_KEY', '').presence
  config.secret = ENV.fetch('SHOPIFY_API_SECRET', '').presence
  
  
  # Your existing billing configuration (commented out)
  # config.billing = ShopifyApp::BillingConfiguration.new(...)
  
  if defined? Rails::Server
    raise('Missing SHOPIFY_API_KEY. See https://github.com/Shopify/shopify_app#requirements') unless config.api_key
    raise('Missing SHOPIFY_API_SECRET. See https://github.com/Shopify/shopify_app#requirements') unless config.secret
  end
end

Rails.application.config.after_initialize do
  if ShopifyApp.configuration.api_key.present? &&
     ShopifyApp.configuration.secret.present?
    ShopifyAPI::Context.setup(
      api_key:        ShopifyApp.configuration.api_key,
      api_secret_key: ShopifyApp.configuration.secret,
      api_version:    ShopifyApp.configuration.api_version,
      host:           ENV.fetch('HOST'),  
      scope:          ShopifyApp.configuration.scope,
      is_private:     !ENV.fetch('SHOPIFY_APP_PRIVATE_SHOP', '').empty?,
      is_embedded:    ShopifyApp.configuration.embedded_app,
      user_agent_prefix: "ShopifyApp/#{ShopifyApp::VERSION}"
    )
    ShopifyApp::WebhooksManager.add_registrations
  end
end
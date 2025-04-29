Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'zipchatai.myshopify.com'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end
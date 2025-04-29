require_relative "boot"

require "rails/all"
require "importmap-rails"  

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Zipchatai
  class Application < Rails::Application
    config.load_defaults 8.0

    config.autoload_lib(ignore: %w[assets tasks])

    config.action_dispatch.default_headers.delete('X-Frame-Options')
  end
end

# app/controllers/extensions_controller.rb
class ExtensionsController < AuthenticatedController
  def register
    begin
      # Use the shop from the current session
      shop = ShopifyAPI::Auth::Session.new(shop: shop_domain)
      ShopifyAPI::Context.activate_session(shop)
      
      # Register the extension using details from your configuration
      ShopifyAPI::UIExtension.register
      
      flash[:notice] = "Extension successfully registered"
    rescue => e
      flash[:error] = "Failed to register extension: #{e.message}"
      Rails.logger.error("Extension registration error: #{e.message}\n#{e.backtrace.join("\n")}")
    end
    redirect_to root_path
  end
  
  private
  
  def shop_domain
    @shop_domain ||= ShopifyApp::CurrentShopDomain.extract(request)
  end
end
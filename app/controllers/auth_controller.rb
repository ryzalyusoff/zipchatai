# app/controllers/auth_controller.rb
def update_permissions
  shop = ShopifyApp::CurrentShopDomain.extract(request)
  redirect_to "/auth?shop=#{shop}"
end
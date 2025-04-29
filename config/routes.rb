Rails.application.routes.draw do
  root to: 'home#index'
  get '/products', to: 'products#index'
  mount ShopifyApp::Engine, at: '/'

  get 'up' => 'rails/health#show'

  post '/chat_messages', to: 'chat_messages#create'

  get '/chat', to: 'chat#index'
  post '/chat', to: 'chat_messages#create', defaults: { format: :json }

  get 'extensions/register', to: 'extensions#register'

  get 'update_permissions', to: 'auth#update_permissions'
end

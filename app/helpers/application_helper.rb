module ApplicationHelper
	# app/helpers/application_helper.rb
	def needs_new_scopes?
	  current_session = ShopifyAPI::Utils::SessionUtils.current_session(session)
	  return false unless current_session
	  
	  required_scopes = ShopifyApp.configuration.scope.split(",")
	  granted_scopes = current_session.scope.split(",")
	  
	  !required_scopes.all? { |scope| granted_scopes.include?(scope) }
	end
end

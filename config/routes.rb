NinjahippoCms::Application.routes.draw do
  devise_for :users

  get '/auth_token' => 'static#auth_token'

  match '*path' => 'static#index'

  root :to => 'static#index'
end

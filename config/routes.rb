NinjahippoCms::Application.routes.draw do
  devise_for :users

  scope '/api', defaults: { format: 'json' } do
    scope '/v1' do
      resources :sites do
        resources :pages
      end
    end
  end

  match '*path' => 'static#index'

  root :to => 'static#index'
end

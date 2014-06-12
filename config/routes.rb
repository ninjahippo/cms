NinjahippoCms::Application.routes.draw do
  devise_for :users

  resources :static

  resources :sites do
    resources :pages
  end

  scope '/api', defaults: { format: 'json' } do
    scope '/v1' do
      resources :sites do
        resources :pages
      end
    end
  end


  get 'dashboard' => 'sites#index', :as => :dashboard

  root :to => 'static#index'
end

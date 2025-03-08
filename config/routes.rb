Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  root to: "application#root"
  resources :widgets, controller: :application, action: :root, only: [:index, :show]
  namespace :api do
    resources :widgets, only: [ :index, :create, :show, :update, :destroy ]
  end

  if Rails.env.test?
    get '/test_login', to: 'test_sessions#create'
  end
end

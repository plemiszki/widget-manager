Rails.application.routes.draw do
  root to: "application#root"
  resource :session
  resources :passwords, param: :token

  resources :users, only: [:new]
  resources :widgets, controller: :application, action: :root, only: [:index, :show]

  namespace :api do
    resources :widgets, only: [ :index, :create, :show, :update, :destroy ]
  end

  if Rails.env.test?
    get '/test_login', to: 'test_sessions#create'
  end
end

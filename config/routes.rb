Rails.application.routes.draw do
  root to: "application#root"

  # unauthenticated routes
  resource :session, only: [:new]
  resources :users, only: [:new]
  # resources :passwords, param: :token

  namespace :api do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :widgets, only: [:index, :create, :show, :update, :destroy]
  end

  if Rails.env.test?
    get '/test_login', to: 'test_sessions#create'
  end

  match "*path", to: "application#root", via: :all
end

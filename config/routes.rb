Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  root to: "application#root"
  resources :widgets, controller: :application, action: :root, only: [:index, :show]
  namespace :api do
    resources :widgets, only: [ :index, :create, :show, :update, :destroy ]
  end
end

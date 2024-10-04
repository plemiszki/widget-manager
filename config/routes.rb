Rails.application.routes.draw do
  root to: "application#root"
  namespace :api do
    resources :widgets, only: [ :index, :show ]
  end
end

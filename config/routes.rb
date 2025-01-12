Rails.application.routes.draw do
  root to: "application#root"
  get "/widgets" => "application#root"
  get "/widgets/:id" => "application#root"
  namespace :api do
    resources :widgets, only: [ :index, :create, :show, :update, :destroy ]
  end
end

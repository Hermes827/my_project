Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes
      resources :comments
    end
      namespace :v2 do
      resources :quotes
    end
    end
  end

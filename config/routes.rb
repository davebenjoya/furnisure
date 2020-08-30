Rails.application.routes.draw do
  resources :pieces, not: [:edit, :update]
  resources :rooms
end

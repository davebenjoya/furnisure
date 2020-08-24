Rails.application.routes.draw do
  get 'pieces/index'
  get 'pieces/show'
  get 'pieces/new'
  get 'pieces/destroy'
  resources :pieces, not: [:edit, :update]
  resources :rooms, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

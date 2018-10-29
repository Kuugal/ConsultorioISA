Rails.application.routes.draw do
  get 'prueba', to: 'home#prueba'
  get 'usuarios', to: 'users#index'
  resources :appointments
  get 'citasAjax', to:"home#citasAjax"
  root 'home#index'
      devise_for :users
      as :user do
      get '/users/sign_out' => 'devise/sessions#destroy'
      end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end

Rails.application.routes.draw do
  get 'prueba', to: 'home#prueba'
  get 'historial', to: 'home#historial'
  get 'usuarios', to: 'users#index'
  resources :appointments
  resources :consults
  get 'citasAjax', to:"home#citasAjax"
  get 'procAjax', to:"home#procAjax"
  root 'home#index'
      devise_for :users
      as :user do
      get '/users/sign_out' => 'devise/sessions#destroy'
      end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end

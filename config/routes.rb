# frozen_string_literal: true

Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      constraints(lambda { |req| req.format == :json }) do
        resources :users, only: :create
        resource :session, only: %i[create destroy]
        resources :categories, only: %i[create index]
        resources :quizzes, only: %i[index create show update]
        namespace :admin do
          resources :quizzes, only: %i[index create update] do
            resources :questions, only: %i[index create update destroy]
          end
        end
      end
    end
  end

  get "health", to: "health#index"
  root "home#index"
  get "*path", to: "home#index", via: :all
end

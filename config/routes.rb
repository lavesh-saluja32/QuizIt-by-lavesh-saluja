# frozen_string_literal: true

Rails.application.routes.draw do

  namespace :api do
      namespace :v1, defaults: { format: :json } do
          resources :submissions, only: %i[create update index]
          resources :users, only: %i[create update show]
          resource :session, only: %i[create destroy]
          resources :categories, only: %i[create index]
          resources :quizzes, only: %i[index create show update] do
            resources :questions, only: %i[index]
          end

          namespace :admin do
            resource :organizations, only: :update
            resources :quizzes, only: %i[index create update show destroy] do
              resource :report, only: %i[create show], controller: "reports"
              resources :submissions, only: %i[index]
              member do
                post :clone
              end

              collection do
                delete :bulk_delete
                patch :bulk_update
              end
              resources :questions, only: %i[index create update destroy show], shallow: true do
                member do
                  post :clone
                end
              end
            end
          end
        end
    end

  get "health", to: "health#index"
  root "home#index"
  get "*path", to: "home#index", via: :all
end

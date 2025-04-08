# frozen_string_literal: true

Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      constraints(lambda { |req| req.format == :json }) do
        resources :submissions, only: %i[create update index]
        resources :users, only: :create
        resource :session, only: %i[create destroy]
        resources :categories, only: %i[create index]
        resources :quizzes, only: %i[index create show update] do
          resources :questions, only: %i[index]
        end

        namespace :admin do
          resources :quizzes, only: %i[index create update show destroy] do
            resources :submissions, only: :index
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
  end

  get "health", to: "health#index"
  root "home#index"
  get "*path", to: "home#index", via: :all
end

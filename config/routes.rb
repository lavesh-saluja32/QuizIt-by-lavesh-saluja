# frozen_string_literal: true

Rails.application.routes.draw do
  get "health", to: "health#index"
  root "home#index"
  get "*path", to: "home#index", via: :all
end

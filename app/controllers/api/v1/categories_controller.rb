# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  after_action :verify_authorized, except: :index
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    puts Organization.first
    @categories = Api::V1::CategoriesFilterService.new(params, Organization.last.categories).process
    render :index
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end

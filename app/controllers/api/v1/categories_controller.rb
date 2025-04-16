# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    @categories = CategoriesFilterService.new(params, Organization.last.categories).process
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end

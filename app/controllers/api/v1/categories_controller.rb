# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  after_action :verify_authorized, except: :index
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    @categories = Api::V1::CategoriesFilterService.new(params, Category.all).process
    render :index
  end

  def create
    category = Category.new(category_params)
    authorize category
    if category.save
      render_notice(t("successfully_created", entity: "Category"))
    else
      render_error(category.errors.full_messages, :unprocessable_entity)
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end

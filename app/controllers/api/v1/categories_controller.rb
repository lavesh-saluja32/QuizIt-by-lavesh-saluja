# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  after_action :verify_authorized, except: :index

  def index
    puts "Hello"
    @categories = Category.all
    puts @categories
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

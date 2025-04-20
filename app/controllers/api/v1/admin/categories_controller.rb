# frozen_string_literal: true

class Api::V1::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy reorder show]
  after_action :verify_authorized, except: %i[index show]
  before_action :load_organization, only: %i[index create]

  def index
    @categories = @organization.categories.includes(:quizzes).order(:position)
  end

  def create
    category = @organization.categories.new(category_params)
    authorize([:admin, category])
    category.save!
  end

  def show
    render
  end

  def destroy
    authorize([:admin, @category])
    Admin::CategoriesDeletionService.new(@category, delete_params[:new_category_id]).process!
  end

  def update
    authorize([:admin, @category])
    @category.update!(category_params)
  end

  def reorder
    authorize([:admin, @category])
    puts @category
    puts "lop"
    @category.insert_at(reorder_params[:position])
  end

  private

    def delete_params
      params.require(:category).permit(:new_category_id)
    end

    def category_params
      params.require(:category).permit(:name)
    end

    def reorder_params
      params.require(:category).permit(:position)
    end

    def load_category!
      @category = @current_user.organization.categories.find(params[:id])
    end

    def load_organization
      @organization = @current_user.organization
    end
end

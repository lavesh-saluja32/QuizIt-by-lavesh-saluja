# frozen_string_literal: true

class Api::V1::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy reorder]
  after_action :verify_authorized, except: %i[index]
  before_action :load_organization, only: :index

  def index
    @categories = @organization.categories.includes(:quizzes)
  end

  def create
  end

  def destroy
  end

  def update
  end

  def reorder
    authorize([:admin, @category])
    puts @category
    puts "lop"
    @category.insert_at(reorder_params[:position])
  end

  private

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

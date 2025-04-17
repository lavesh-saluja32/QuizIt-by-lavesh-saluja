# frozen_string_literal: true

class Api::V1::Admin::RedirectionsController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_organization, only: :create
  before_action :load_redirection!, only: %i[update destroy]

  def index
  end

  def create
    redirection = @organization.redirections.new(redirection_params)
    authorize([:admin, redirection])
    redirection.save!
  end

  def update
    puts "1"
    @redirection.update!(redirection_params)
  end

  def destroy
    @redirection.destroy!
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_organization
      @organization = @current_user.organization
    end

    def load_redirection!
      load_organization
      puts @organization.redirections.inspect
      puts params[:id]
      @redirection = @organization.redirections.find(id: params[:id])
    end
end

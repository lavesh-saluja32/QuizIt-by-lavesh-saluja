# frozen_string_literal: true

class Api::V1::Admin::RedirectionsController < ApplicationController
  after_action :verify_authorized, except: %i[index]
  before_action :load_organization, only: %i[create index]
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = @organization.redirections
  end

  def create
    redirection = @organization.redirections.new(redirection_params)
    authorize([:admin, redirection])
    redirection.save!
  end

  def update
    authorize([:admin, @redirection])
    @redirection.update!(redirection_params)
  end

  def destroy
    authorize([:admin, @redirection])
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
      @redirection = @organization.redirections.find(params[:id])
    end
end

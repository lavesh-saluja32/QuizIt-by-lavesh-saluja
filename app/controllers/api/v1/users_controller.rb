# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    existing_user = User.find_by(email: user_params[:email])

    if existing_user&.role == "standard_user"
      render_error(t("errors.messages.standard_user_cannot_be_admin"), :unprocessable_entity) and return
    end

    Organization.first.users.create!(user_params.merge(role: "admin_user"))
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end

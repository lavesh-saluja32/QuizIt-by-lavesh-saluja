# frozen_string_literal: true

class RegisterService
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def process!
    register_user
  end

  private

    def register_user
      User.find_or_create_by!(email: params[:email]) do |user|
        user.name = params[:name]
        password = SecureRandom.alphanumeric(10)
        user.password = password
        user.password_confirmation = password
      end
    end
end

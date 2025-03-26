# frozen_string_literal: true

class CategoryPolicy
  attr_reader :user

  def initialize(user, category)
    @user = user
  end

  def create?
    @user.role == "admin_user"
  end
end

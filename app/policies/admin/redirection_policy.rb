# frozen_string_literal: true

class Admin::RedirectionPolicy
  attr_reader :user, :redirection
  def initialize(user, redirection)
    @user = user
    @redirection = redirection
  end

  def create?
    update?
  end

  def update?
    user.organization_id == redirection.organization_id
  end

  def destroy?
    update?
  end

  def show?
    update?
  end

  def clone?
    update?
  end

  def download?
    update?
  end
end

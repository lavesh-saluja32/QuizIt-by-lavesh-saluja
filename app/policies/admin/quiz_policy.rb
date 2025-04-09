# frozen_string_literal: true

class Admin::QuizPolicy
  attr_reader :user, :quiz
  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def create?
    user.role == "admin_user"
  end

  def update?
    user.role == "admin_user" && user.id == quiz.user.id
  end

  def destroy?
    user.role == "admin_user" && user.id == quiz.user.id
  end

  def show?
    user.role == "admin_user" && user.id == quiz.user.id
  end

  def clone?
    update?
  end

  def download?
    update?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user: user)
    end
  end
end

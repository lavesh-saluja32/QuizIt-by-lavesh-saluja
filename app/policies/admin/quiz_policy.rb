# frozen_string_literal: true

class Admin::QuizPolicy
  attr_reader :user, :quiz
  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def update?
    user.id == quiz.user.id
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

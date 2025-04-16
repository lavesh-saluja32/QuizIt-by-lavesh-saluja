# frozen_string_literal: true

class Admin::QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
    @user = user
    @question = question
  end

  def create?
    user.id == question.quiz.user_id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def show?
    create?
  end

  def clone?
    create?
  end
end

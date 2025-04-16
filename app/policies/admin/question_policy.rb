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

  class Scope
    attr_reader :user, :scope, :quiz_id

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.role == "admin_user" && scope
        scope
      else
        scope.none
      end
    end
  end
end

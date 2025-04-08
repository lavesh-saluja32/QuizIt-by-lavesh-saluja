# frozen_string_literal: true

class Admin::SubmissionPolicy
  attr_reader :user, :submission

  def initialize(user, submission)
    @user = user
    @submission = submission
  end

  class Scope
    attr_reader :user, :scope, :quiz

    def initialize(user, scope, quiz)
      @user = user
      @scope = scope
      @quiz = quiz
    end

    def resolve
      if user.role == "admin_user" && quiz.user_id == user.id
        @quiz.submissions.includes(:user)
      else
        scope.none
      end
    end
  end
end

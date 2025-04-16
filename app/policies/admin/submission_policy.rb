# frozen_string_literal: true

class Admin::SubmissionPolicy
  attr_reader :user, :submission

  def initialize(user, submission)
    @user = user
    @submission = submission
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if scope&.first&.quiz&.user_id == user.id
        scope.includes(:user)
      else
        scope.none
      end
    end
  end
end

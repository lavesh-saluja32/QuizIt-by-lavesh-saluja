# frozen_string_literal: true

class SubmissionPolicy
  attr_reader :user, :submission

  def initialize(user, submission)
    @user = user
    @submission = submission
  end

  def create?
    @submission.user.role == "standard_user"
  end

  def update?
    create?
  end
end

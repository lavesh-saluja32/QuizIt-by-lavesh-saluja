# frozen_string_literal: true

class Api::V1::Admin::SubmissionsController < ApplicationController
  before_action :load_quiz!, only: :index

  def index
    @submissions = Admin::SubmissionPolicy::Scope.new(current_user, Submission, @quiz).resolve
    render
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:quiz_id])
    end
end

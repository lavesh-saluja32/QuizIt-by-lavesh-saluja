# frozen_string_literal: true

class Api::V1::Admin::SubmissionsController < ApplicationController
  before_action :load_quiz!, only: :index
  after_action :verify_authorized, except: %i[index]

  def index
    puts params
    @submissions = Admin::SubmissionPolicy::Scope.new(current_user, Submission, @quiz).resolve
    @submissions = Api::V1::Admin::SubmissionsFilterService.new(params, @submissions).process!
    render
  end

  private

    def load_quiz!
      @quiz = Quiz.find(params[:quiz_id])
    end
end

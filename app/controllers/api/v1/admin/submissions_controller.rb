# frozen_string_literal: true

class Api::V1::Admin::SubmissionsController < ApplicationController
  before_action :load_quiz!, only: :index
  after_action :verify_authorized, except: %i[index]

  def index
    @submissions = Admin::SubmissionsFilterService.new(params, policy_scope([:admin, @quiz.submissions])).process!
  end

  private

    def load_quiz!
      puts
      @quiz = @current_user.organization.quizzes.find(params[:quiz_id])
    end
end

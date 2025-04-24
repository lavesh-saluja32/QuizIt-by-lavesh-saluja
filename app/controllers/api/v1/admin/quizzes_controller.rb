# frozen_string_literal: true

class Api::V1::Admin::QuizzesController < ApplicationController
  after_action :verify_authorized, except: %i[index bulk_delete bulk_update create]
  before_action :load_quiz!, only: %i[update show clone destroy download]

  def index
    @quizzes = @current_user.organization.quizzes.includes(:category, :questions)
    @status_counts = @quizzes.group(:status).count
    @filtered_quizzes = Admin::QuizzesFilterService.new(@quizzes, params).process
    @quizzes = @filtered_quizzes.quizzes.order(updated_at: :desc)
    @total_size = @filtered_quizzes.filtered_size
  end

  def update
    authorize [:admin, @quiz]
    @quiz.update!(update_params)
  end

  def create
    @quiz = @current_user.organization.quizzes.create!(quiz_params.merge(user: @current_user))
    render_json(@quiz.id)
  end

  def show
    authorize [:admin, @quiz]
  end

  def clone
    authorize([:admin, @quiz])
    @quiz.clone_quiz!
  end

  def destroy
    authorize([:admin, @quiz])
    @quiz.destroy!
  end

  def bulk_delete
    Quiz.where(id: bulk_delete_params[:ids], user_id: current_user.id).destroy_all
  end

  def bulk_update
    Admin::QuizzesBulkUpdateService.new(
      user: @current_user,
      params: bulk_update_params
    ).process
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id)
    end

    def update_params
      params.require(:quiz).permit(
        :name, :status, :is_public, :is_timer_enabled, :time, :is_shuffle_options_enabled,
        :is_shuffle_questions_enabled, :is_email_notification_enabled)
    end

    def load_quiz!
      @quiz = @current_user.organization.quizzes.find(params[:id])
    end

    def bulk_delete_params
      params.permit(ids: [])
    end

    def bulk_update_params
      params.require(:quizzes).permit(:status, :category_id, ids: [])
    end
end

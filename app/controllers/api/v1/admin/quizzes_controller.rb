# frozen_string_literal: true

class Api::V1::Admin::QuizzesController < ApplicationController
  after_action :verify_authorized, except: %i[index bulk_delete bulk_update create]
  before_action :load_quiz!, only: %i[update show clone destroy download]

  def index
    @quizzes = @current_user.organization.quizzes.includes(:category, :questions, :user, :submissions)
    @status_counts = @quizzes.group(:status).count
    @filtered_quizzes = Admin::QuizzesFilterService.new(@quizzes, params).process
    @quizzes = @filtered_quizzes.quizzes.order(updated_at: :desc)
    @total_size = @filtered_quizzes.filtered_size
    render "api/v1/quizzes/index"
  end

  def update
    authorize [:admin, @quiz]
    puts update_params
    @quiz.update!(update_params)
  end

  def create
    @current_user.organization.quizzes.create!(quiz_params.merge(user: @current_user))
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
    permitted_params = bulk_update_params
    updates = permitted_params.slice(:status, :category_id).to_h.compact

    quizzes = Quiz.where(id: permitted_params[:ids], user_id: @current_user.id)
    if updates.key?(:status)
      Quiz.transaction do
        quizzes.each do |quiz|
          quiz.update!(updates.merge(last_saved_at: Time.current))
        end
      end
    elsif updates.key?(:category_id)
      quizzes.update_all(category_id: updates[:category_id], last_saved_at: Time.current)
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id)
    end

    def update_params
      params.require(:quiz).permit(
        :name, :status, :is_public, :is_time_enabled, :time, :shuffle_options,
        :shuffle_questions, :email_notification)
    end

    def load_quiz!
      scope = @current_user.organization.quizzes
      scope = scope.includes(questions: :options) if action_name == "destroy"
      @quiz = scope.find(params[:id])
    end

    def bulk_delete_params
      params.permit(ids: [])
    end

    def bulk_update_params
      params.require(:quizzes).permit(:status, :category_id, ids: [])
    end
end

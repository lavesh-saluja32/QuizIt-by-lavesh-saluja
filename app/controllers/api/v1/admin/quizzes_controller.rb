# frozen_string_literal: true

class Api::V1::Admin::QuizzesController < ApplicationController
  after_action :verify_authorized, except: %i[index bulk_delete bulk_update]
  before_action :load_quiz!, only: %i[update show clone destroy download]

  def index
    @quizzes = policy_scope([:admin, Quiz.includes(:category, :questions, :user)])
    @status_counts = @quizzes.group(:status).count
    @quizzes_filter = Api::V1::Admin::QuizzesFilterService.new(@quizzes, params).process!
    @quizzes = @quizzes_filter.quizzes.order(updated_at: :desc)
    @total_size = @quizzes_filter.filtered_size

    render "api/v1/quizzes/index"
  end

  def update
    authorize [:admin, @quiz]
    @quiz.update!(update_params)
    @quiz.update_last_saved
    render_json
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    puts quiz_params
    authorize [:admin, quiz]
    quiz.save!
    puts @quiz.inspect
    quiz.update_last_saved
    render_json
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
    @quiz.destroy
    render_json
  end

  def bulk_delete
    Quiz.where(id: bulk_delete_params[:ids], user_id: current_user.id).destroy_all
    render_json
  end

  def bulk_update
    permitted_params = bulk_update_params
    updates = permitted_params.slice(:status, :category_id).to_h.compact

    quizzes = Quiz.where(id: permitted_params[:ids], user_id: @current_user.id)

    Quiz.transaction do
      quizzes.each do |quiz|
        quiz.update!(updates.merge(last_saved_at: Time.current))
      end
    end

    render_json
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :category_id)
    end

    def update_params
      params.require(:quiz).permit(:name, :status)
    end

    def load_quiz!
      @quiz = if action_name == "destroy"
        Quiz.includes(questions: :options).find(params[:id])
              else
                Quiz.find(params[:id])
      end
    end

    def bulk_delete_params
      params.permit(ids: [])
    end

    def bulk_update_params
      params.require(:quizzes).permit(:status, :category_id, ids: [])
    end
end

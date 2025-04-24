# frozen_string_literal: true

class AddTimingsToQuiz < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :is_timer_enabled, :boolean, default: false, null: false
    add_column :quizzes, :time, :integer, default: 0, null: false
  end
end

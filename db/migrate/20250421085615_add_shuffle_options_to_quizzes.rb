# frozen_string_literal: true

class AddShuffleOptionsToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :shuffle_questions, :boolean, default: false
    add_column :quizzes, :shuffle_options, :boolean, default: false
  end
end

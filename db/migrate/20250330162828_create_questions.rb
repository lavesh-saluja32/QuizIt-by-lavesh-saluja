# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :questions, id: :uuid do |t|
      t.references :quiz, null: false, foreign_key: true, type: :uuid
      t.string :question_text, null: false

      t.timestamps
    end
  end
end

# frozen_string_literal: true

class CreateSubmissions < ActiveRecord::Migration[7.1]
  def change
    create_table :submissions, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :quiz, null: false, foreign_key: true, type: :uuid
      t.string :status, null: false, default: "incomplete"
      t.datetime :submission_time
      t.integer :correct_answers, null: false, default: 0
      t.integer :wrong_answers, null: false, default: 0
      t.integer :unanswered, null: false, default: 0

      t.timestamps
    end
  end
end

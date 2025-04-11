# frozen_string_literal: true

class SubmissionsReportJob
  include Sidekiq::Job
  def perform(quiz_id, user_id)
    ActionCable.server.broadcast(
      user_id,
      { message: I18n.t("report.render"), progress: 25 })

    quiz = Quiz.find(quiz_id)
    submissions = quiz.submissions.includes(:user)
    html_content = ApplicationController.render(
      assigns: {
        submissions:,
        quiz:
      },
      template: "api/v1/admin/submissions/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string html_content
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })
    if quiz.report.attached?
      quiz.report.purge
    end

    quiz.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf", identify: false
      )
    quiz.save!
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
  end
end

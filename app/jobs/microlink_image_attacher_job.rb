require "down"

class MicrolinkImageAttacherJob < ApplicationJob
  queue_as :default

  def perform(link)
    if link.image.present?
      tempfile = Down.download(link.image)
      link.thumbnail.attach(io: tempfile, filename: tempfile.original_filename) 
    end
  end
end

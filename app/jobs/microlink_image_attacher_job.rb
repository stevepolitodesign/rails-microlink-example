require "down"

class MicrolinkImageAttacherJob < ApplicationJob
  queue_as :default
  discard_on Down::InvalidUrl

  def perform(link)
    if link.image.present?
      tempfile = Down.download(link.image)
      link.thumbnail.attach(io: tempfile, filename: tempfile.original_filename) 
    end
  end
end

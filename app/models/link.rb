class Link < ApplicationRecord
    validates :url, presence: true
end

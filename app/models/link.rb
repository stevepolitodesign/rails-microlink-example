class Link < ApplicationRecord
    # https://api.rubyonrails.org/classes/ActiveRecord/Store.html
    store :meta_data, accessors: [ :description, :image, :title  ], coder: JSON
    validates :url, presence: true
    has_one_attached :thumbnail
end

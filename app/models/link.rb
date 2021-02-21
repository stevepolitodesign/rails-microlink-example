class Link < ApplicationRecord
    # https://api.rubyonrails.org/classes/ActiveRecord/Store.html
    store :meta_data, accessors: [ :description, :image, :title  ], coder: JSON
    validates :url, presence: true
end

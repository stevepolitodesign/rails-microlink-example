class AddMetaDataToLink < ActiveRecord::Migration[6.1]
  def change
    add_column :links, :meta_data, :jsonb
  end
end

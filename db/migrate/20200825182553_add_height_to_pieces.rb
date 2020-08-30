class AddHeightToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :height, :integer
  end
end

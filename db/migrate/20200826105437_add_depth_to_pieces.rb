class AddDepthToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :depth, :integer
  end
end

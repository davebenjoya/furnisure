class AddWidthToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :width, :integer
  end
end

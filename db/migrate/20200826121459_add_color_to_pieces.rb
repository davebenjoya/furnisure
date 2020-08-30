class AddColorToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :color, :string
  end
end

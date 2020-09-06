class AddAvailableColorsToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :available_colors, :string
  end
end

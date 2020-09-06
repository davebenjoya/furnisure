class AddCategoryToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :category, :string
  end
end

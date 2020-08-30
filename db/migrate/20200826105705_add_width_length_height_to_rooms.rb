class AddWidthLengthHeightToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :width, :integer
    add_column :rooms, :length, :integer
    add_column :rooms, :height, :integer
  end
end

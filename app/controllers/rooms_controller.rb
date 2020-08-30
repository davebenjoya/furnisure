class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def show
    @room = Room.find(params[:id])
  end

  def new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to rooms_path
    else
      puts "Not saved"
    end
  end

  def destroy
  end


  private

  def room_params
    params.require(:room).permit(:name, :width, :length, :height)
  end

end

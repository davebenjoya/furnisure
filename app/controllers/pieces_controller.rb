class PiecesController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
    @piece = Piece.new(piece_params)
    if @piece.save
      redirect_to pieces_path
    else
      puts "Not saved"
    end
  end

  def destroy
  end


  private

  def piece_params
    params.require(:piece).permit(:name, :id, :description, :url)
  end
end

class Api::V1::NotesController < ApplicationController
  before_action :find_note, only: [:update]
  def index
    @notes = Note.order(created_at: :desc)
    render json: @notes
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note, status: :accepted #here is the error, accepted
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def edit
    @note = Note.find(params[:id])
  end

  def update
    @note.update(note_params)
    if @note.save
      render json: @note, status: :accepted
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
     @note = Note.find(params[:id])
     @note.destroy
   end

  private

  def note_params
    # params.permit(:title, :content)
    params.require(:note).permit!
  end

  def find_note
    @note = Note.find(params[:id])
  end
end

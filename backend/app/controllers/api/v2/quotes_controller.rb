class Api::V2::QuotesController < ApplicationController

  def index
    @quotes = Quote.all
    render json: @quotes
  end

  def create
    @quote = Quote.create(quote_params)
    render json: @quote
  end

  private

  def quote_params
    params.require(:quote).permit!
  end
end

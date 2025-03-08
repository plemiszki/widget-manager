class TestSessionsController < ApplicationController
  allow_unauthenticated_access

  def create
    user = User.find(params[:user_id])
    start_new_session_for(user)
    head :ok
  end
end

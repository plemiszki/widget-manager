class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url }

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: {
        redirect_to_url: after_authentication_url,
      }, status: 200
    else
      render json: {
        errors: {
          credentials: true,
        }
      }, status: 401
    end
  end

  def destroy
    terminate_session
    head :ok
  end
end

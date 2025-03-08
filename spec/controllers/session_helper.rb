module SessionHelper
  def create_user_session
    cookies.signed[:session_id] = Session.first.id
  end
end

RSpec.configure do |config|
  config.include SessionHelper
end

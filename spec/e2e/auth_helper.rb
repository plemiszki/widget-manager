module AuthenticationHelper
  def authenticated_path(path, user)
    visit "/test_login?user_id=#{user.id}"
    path
  end
end

RSpec.configure do |config|
  config.include AuthenticationHelper, type: :feature
end

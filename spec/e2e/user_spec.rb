require 'rails_helper'

describe 'user', type: :feature do

  let(:user) { User.create!(email_address: 'test@example.com', password: 'password') }

  it 'signs in' do
    visit widgets_path
    expect(page).to have_button('Sign in')
    email_field, password_field = find_all('input')

    email_field.set(user.email_address)
    password_field.set(user.password)

    sign_in_button = find('input[type="submit"]')
    sign_in_button.click

    expect(page).to have_current_path('/widgets')
    expect(page).to have_content('Widgets')
  end

  it 'signs out' do
    visit authenticated_path(widgets_path, user)
    expect(page).to have_button('Sign Out')
    sign_out_button = find('button', text: "SIGN OUT")
    sign_out_button.click

    expect(page).to have_button('Sign in')
  end

  it 'signs up' do
    visit new_user_path
    expect(page).to have_content('Sign Up')
    email_field, password_field = find_all('input')

    email_field.set("user@domain.com")
    password_field.set("password")

    sign_up_button = find('button', text: 'CREATE ACCOUNT')
    sign_up_button.click
    expect(page).to have_no_css("div[data-test='spinner']")

    expect(User.count).to eq(1)
    user = User.first
    expect(user.email_address).to eq("user@domain.com")

    expect(page).to have_current_path('/session/new')
  end

end

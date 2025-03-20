require 'rails_helper'

describe 'user', type: :feature do

  let(:user) { User.create!(email_address: 'test@example.com', password: 'password') }

  it 'signs in' do
    visit widgets_path
    expect(page).to have_content('Sign In')
    email_field, password_field = find_all('input')

    email_field.set(user.email_address)
    password_field.set(user.password)

    sign_in_button = find('button', text: "SIGN IN")
    sign_in_button.click

    expect(page).to have_current_path('/widgets')
    expect(page).to have_content('Widgets')
  end

  it 'signs out' do
    visit authenticated_path(widgets_path, user)
    expect(page).to have_button('Sign Out')
    sign_out_button = find('button', text: "SIGN OUT")
    sign_out_button.click

    expect(page).to have_content('Sign In')
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

  it 'validates the presence of an email address and password' do
    visit new_user_path
    expect(page).to have_content('Sign Up')

    sign_up_button = find('button', text: 'CREATE ACCOUNT')
    sign_up_button.click
    expect(page).to have_no_css("div[data-test='spinner']")

    expect(page).to have_content("Email address can't be blank")
    expect(page).to have_content("Password can't be blank")

    expect(User.count).to eq(0)
  end

  it 'validates email uniqueness' do
    User.create!(email_address: "user@domain.com", password: "password")

    visit new_user_path
    expect(page).to have_content('Sign Up')

    email_field, password_field = find_all('input')
    email_field.set("user@domain.com")
    password_field.set("password")

    sign_up_button = find('button', text: 'CREATE ACCOUNT')
    sign_up_button.click
    expect(page).to have_no_css("div[data-test='spinner']")

    expect(page).to have_content("Email address has already been taken")

    expect(User.count).to eq(1)
  end

  it 'validates password length' do
    visit new_user_path
    expect(page).to have_content('Sign Up')

    email_field, password_field = find_all('input')
    email_field.set("user@domain.com")
    password_field.set("passwor")

    sign_up_button = find('button', text: 'CREATE ACCOUNT')
    sign_up_button.click
    expect(page).to have_no_css("div[data-test='spinner']")

    expect(page).to have_content("Password is too short (minimum is 8 characters)")

    expect(User.count).to eq(0)
  end

  it 'validates email address' do
    visit new_user_path
    expect(page).to have_content('Sign Up')

    email_field, password_field = find_all('input')
    email_field.set("user@domain.")
    password_field.set("password")

    sign_up_button = find('button', text: 'CREATE ACCOUNT')
    sign_up_button.click
    expect(page).to have_no_css("div[data-test='spinner']")

    expect(page).to have_content("Email address is invalid")

    expect(User.count).to eq(0)
  end

end

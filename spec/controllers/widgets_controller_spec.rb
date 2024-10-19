require 'rails_helper'

RSpec.describe Api::WidgetsController do

  context '#index' do
    it 'returns an OK status code' do
      get :index
      expect(response).to render_template('api/widgets/index', formats: [:json], handlers: [:jbuilder])
      expect(response.status).to eq(200)
    end
  end

end

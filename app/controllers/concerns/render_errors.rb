module RenderErrors

  def render_errors(entity)
    errors = entity.errors.as_json(full_messages: true)
    render json: {
      errors: errors
    }, status: 422
  end

end

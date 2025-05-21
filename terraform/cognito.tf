resource "aws_cognito_user_pool" "biterunners_users" {
  name = "biterunners-user-pool"

  username_attributes        = ["email"]
  auto_verified_attributes   = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = true
  }
}

resource "aws_cognito_user_pool_client" "frontend_client" {
  name         = "biterunners-frontend-client"
  user_pool_id = aws_cognito_user_pool.biterunners_users.id
  generate_secret = false

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  callback_urls                        = ["https://d3h4khzbrw9jmy.cloudfront.net/"]
  logout_urls                          = ["https://d3h4khzbrw9jmy.cloudfront.net/"]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user_pool" "biterunners_users" {
  name = "biterunners-user-pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"  # Uses Amazon SES managed by AWS
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE" # Sends a 6-digit code to verify
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = false
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
}

resource "aws_cognito_user_pool_client" "frontend_client" {
  name         = "biterunners-frontend-client"
  user_pool_id = aws_cognito_user_pool.biterunners_users.id
  generate_secret = false

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]

  callback_urls = [
    "https://d3h4khzbrw9jmy.cloudfront.net/"
  ]
  logout_urls = [
    "https://d3h4khzbrw9jmy.cloudfront.net/"
  ]

  supported_identity_providers = ["COGNITO"]
}

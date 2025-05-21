output "s3_website_url" {
  value = aws_s3_bucket.frontend.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "user_pool_id" {
  value = aws_cognito_user_pool.biterunners_users.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.frontend_client.id
}
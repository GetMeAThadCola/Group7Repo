output "s3_website_url" {
  value = aws_s3_bucket.frontend.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}

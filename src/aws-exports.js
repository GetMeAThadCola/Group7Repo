const awsconfig = {
  Auth: {
    region: "us-west-2", // Your AWS region
    userPoolId: "us-west-2_eK09AENLt", // Your Cognito User Pool ID
    userPoolWebClientId: "4fd67n28oak7cgl870a7h0em4e", // Your App Client ID
    authenticationFlowType: "USER_PASSWORD_AUTH",
    mandatorySignIn: false,
  }
};

export default awsconfig;
# Install

# Create AWS account

- Create an AWS account https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/
- Create an IAM user for your AWS account (follow these steps) https://sst.dev/chapters/create-an-iam-user.html
- Download AWS-CLI https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- run

```bash
aws configure
```

- link acount with AWS-CLI
- This will allow our framework to link to our AWS account and use AWS's compute resources for development/production

# Create bitbucket AppPassword

- https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/
- This will allow the cloning of the project via command-line

# Clone project

```bash
git clone https://cameroncarl@bitbucket.org/cameroncarl/cgi-lus-app.git
cd cgi-lus-app
npm install
```

```bash
cd frontend
npm install
```

# Run

- Make sure the backend is built first
- Use two seperate terminals

BACKEND

```bash
npm start
```

- let the framework build the backend infrastructure
- it will spit out an API URL
- create a .env file inside of /frontend and paste the following, including the URL
- DEV_API_URL=<PASTE_URL_HERE>
- open the sst dev console in browser
- see docs for help https://docs.sst.dev/

FRONTEND

```bash
cd frontend
expo start
```

- install the Expo Go app on your phone
- make sure your phone is connected to the same network as dev environment
- might have to disable firewall
- see docs for help https://docs.expo.dev/

# Clean up

```bash
npx sst remove
```

- this cleans up the occupied resources in AWS that youre using for the dev environment

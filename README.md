# AWS Cognito Core UI

AWS Cognito Core UI is a library package that allows designers to customize the UX to work with AWS Cognito.

## Install

```bash
npm install aws-cognito-core-ui # or yarn add aws-cognito-core-ui
```

---

## Usage

It might be easier to use [aws-cognito-react-ui](https://github.com/luke-guan/aws-cognito-react-ui) or [aws-cognito-react-native-ui](https://github.com/luke-guan/aws-cognito-react-native-ui). Look at the those package's source code.

Create UX for each screen:

```
- SignIn
- ErrorMsg
- ForgotPassword (Type in user, to receive email code)
- ForgotPasswordSubmit (Type in newPassword and code)
- SignOut
- ConfirmSignUp (Type in code to validate user)
- ConfirmSignIn (Type in mfaCode)
- NewPasswordRequired (Setup newPassword required from Cognito)
- MfaSetup (Setup 2FA)
- ChangePassword (Change Password)
- ChangePasswordSuccess (Screen when password successful)
- Loading
```

More info can be found at [Basic Usage](docs/BasicUsage.md).

##### Import Package

```javascript
import AuthProvider from 'aws-cognito-core-ui';
```

##### Design Component Object for each screen

The object keys end in C, (leave alone), the value on the right should point to your UX screen. In this case we are creating the LoadingUI.

Example for HTML (web):

```javascript
const LoadingUI = () => (
    <div>
        <h1>Loading</h1>
    </div>
);
```

Example for App (react-native):

```javascript
const LoadingUI = () => (
    <View>
        <Text>Loading</Text>
    </View>
);
```

##### Link Component to your UX

Reference the documentation on what is needed to contruct each component.

```javascript
const MyScreenComponents = {
    signInC: SignInUI,
    errorMsgC: ErrorMsgUI,
    forgotPasswordC: ForgotPasswordUI,
    forgotPasswordSubmitC: ForgotPasswordSubmitUI,
    signOutC: SignOutUI,
    signUpC: SignUpUI,
    confirmSignUpC: ConfirmSignUpUI,
    confirmSignInC: ConfirmSignInUI,
    newPasswordRequiredC: NewPasswordRequiredUI,
    mfaSetupC: MfaSetupUI,
    changePasswordC: ChangePasswordUI,
    changePasswordSuccessC: ChangePasswordSuccessUI,
    loadingC: LoadingUI,
};
```

##### Wrap your App with AuthProvider

Pass in your awsconfig, along with your screens to ComponentObject.

```javascript
<AuthProvider awsconfig={awsconfig} ComponentObject={MyScreenComponents}>
    <MyApp />
</AuthProvider>
```

[FAQs](docs/FAQs.md)

## Support

Feedback / Questions / Thoughts / Hire me?
[Discord](https://discord.gg/Mfwc5sg)

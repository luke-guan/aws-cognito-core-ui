### Basic Usage

##### Estatus

######Estatus has the following options:

```
LOADING
ERROR
COMPLETED
SIGNIN
CONFIRM_SIGNIN
FORGOTPASSWORD
SIGNOUT
SIGNUP
CONFIRM_SIGN_UP
NEW_PASSWORD_REQUIRED
MFA_SETUP
CHANGE_PASSWORD
SetUser
ClearUser
```

Dispatch an action allowed by Estatus to change screens

```javascript
import { useAuthDispatch, Estatus } from 'aws-cognito-core-ui';

function SignUpC() {
    const dispatch = useAuthDispatch()
    return (
        <button
            onClick={() => {
                // button to switch to SIGNIN
                dispatch({ type: Estatus.SIGNIN });
            }}
        >
            Change Screen to Sign In
        </button>;
    )
}
```

```javascript
dispatch({ type: Estatus.LOADING })
dispatch({ type: Estatus.ERROR, MESSAGE: 'U C Message' })
dispatch({ type: Estatus.COMPLETED })
dispatch({ type: Estatus.SIGNIN })
dispatch({ type: Estatus.CONFIRM_SIGNIN, AUTH_DATA: { COGNITOUSER: AuthObject } })
dispatch({ type: Estatus.SetUser, USER: 'Ender' })
dispatch({ type: Estatus.ClearUser })
dispatch({ type: Estatus.FORGOTPASSWORD })
dispatch({ type: Estatus.SIGNOUT })
dispatch({ type: Estatus.SIGNUP })
dispatch({ type: Estatus.CONFIRM_SIGN_UP, AUTH_DATA: { username: 'Ender' } })
dispatch({ type: Estatus.NEW_PASSWORD_REQUIRED, AUTH_DATA: { COGNITOUSER: AuthObject } })
dispatch({ type: Estatus.MFA_SETUP, AUTH_DATA: COGNITOUSER: AuthObject })
dispatch({ type: Estatus.CHANGE_PASSWORD })
```

---

Most UI that submit will also have a error returned if such things happen. Display the error at your convenience.

#### Basic UI Component

This only include the basic minimum needed to work. Design your UX and trigger the submit with the necessary fields. Build around onSubmit({ required field })

##### LoadingUI

```javascript
function LoadingUI() {
    return <h1>Loading</h1>;
}
```

##### ErrorMsgUI

```javascript
function ErrorMsgUI({ error }) {
    return <h1>{error}</h1>;
}
```

##### SignUpUI

```javascript
function SignUpUI({ onSubmit, error }) {
    return (
        <button
            type="submit"
            onClick={() => {
                onSubmit({ username, password, email, phoneNumber });
            }}
        >
            SignUp
        </button>
    );
}
```

##### ConfirmSignUpUI

```javascript
function ConfirmSignUpUI({ USER, onSubmit, resendSignUp, error }) {
    return (
        <button onClick={()=> {
            resendSignUp()
        }}>
            Resend Code receive from email
        </button>
        <button type="submit" onClick={() => onSubmit({ code })}>
            Confirm SignUp
        </button>
    )
}
```

##### MfaSetupUI

```javascript
import QRCode from 'qrcode.react' // npm install qrcode.react # yarn add qrcode.react
function MfaSetupUI({ onSubmit, rawCode, code, error }) {
    // rawCode is the code provided by AWS
    // allows you to customize the Issuer
    return (
        <QRCode value={ code } />
        <button type="submit"
            onClick={() => {
                onSubmit({ challengeAnswer })
            }}>
        Submit the mfaCode from your Authenticator Device
        </button>
    )
}
```

##### SignInUI

```javascript
function SignInUI({ onSubmit, error }) {
    return (
        <button
            type="submit"
            onClick={() => {
                onSubmit({ username, password });
            }}
        >
            Sign In
        </button>
    );
}
```

##### ConfirmSignInUI

```javascript
function ConfirmSignInUI({ onSubmit, error}) {
    return (
        <button onClick={() => onSubmit({ code })}>
            Confirm SignIn with code
        </button>
        <button type="submit" onClick={() => onSubmit({ code })}>
            Confirm SignIn
        </button>
    )
}
```

##### SignOutUI

```javascript
function SignOut({ onSubmit, error }) {
    return (
        <button
            type="submit"
            onClick={() => {
                onSubmit({});
            }}
        >
            Sign Out
        </button>
    );
}
```

##### NewPasswordRequiredUI

```javascript
function NewPasswordRequiredUI({ onSubmit, error }) {
    return (
        <button type="submit" onClick={() => onSubmit({ newPassword })}>
            Set New Password
        </button>
    );
}
```

##### ForgotPasswordUI

```javascript
function ForgotPasswordSubmit({ onSubmit, error }) {
    return (
        <button type="submit" onClick={() => onSubmit({ user })}>
            User that forgot the password
        </button>
    );
}
```

##### ForgotPasswordSubmitUI

```javascript
function ForgotPasswordSubmitUI({ onSubmit, username, error }) {
    return (
        <button type="submit" onClick={() => onSubmit({ code, newPassword })}>
            Set newPassword
        </button>
    );
}
```

##### ChangePasswordUI

```javascript
function ChangePasswordUI({ onSubmit, error }) {
    return (
        <button
            type="submit"
            onClick={() => onSubmit({ oldPassword, newPassword })}
        >
            Change Password
        </button>
    );
}
```

##### ChangePasswordSuccessUI

```javascript
function ChangePasswordSuccessUI() {
    return (
        <>Password Changed Success<>
    )
}
```

---

#### Extra Info

##### State

Get the current State

```javascript
import { useAuthState } from 'aws-cognito-core-ui';
const state = useAuthState();
```

state has the following keys, STATUS, USER, MESSAGE, AUTH_DATA
If user is signed in, USER will show username, otherwise null.

##### checkUser

Check if the user is logged in, if user is not authenticated, user will be routed to signIn Screen.

```javascript
import {useAuthCheckUser} from 'aws-cognito-core-ui'
const checkUser = useAuthCheckUser()
<button onClick={() => {
    checkUser()
}}>Press button to check if user is logged in</button>
```

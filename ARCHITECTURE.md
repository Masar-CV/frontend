# Authentication System Architecture

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ Login Page (Login.jsx) or Register Page (Register.jsx)                  │
│ ├─ User enters credentials                                              │
│ ├─ Form validation (client-side)                                        │
│ └─ Submit to handler                                                    │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    REACT HOOK (useAuth.js)                              │
├─────────────────────────────────────────────────────────────────────────┤
│ - login(email, password)                                                │
│ - register(userData)                                                    │
│ - logout()                                                              │
│ - getUser()                                                             │
│ - isAuthenticated()                                                     │
│ - getToken()                                                            │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              AUTHENTICATION SERVICE (authService.js)                    │
├─────────────────────────────────────────────────────────────────────────┤
│ - login(): POST /api/auth/login                                         │
│ - register(): POST /api/auth/register                                   │
│ - requestPasswordReset(): POST /api/auth/forgot-password                │
│ - verifyOtp(): POST /api/auth/verify-otp                                │
│ - resetPassword(): POST /api/auth/reset-password                        │
│ - logout()                                                              │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   HTTP CLIENT (httpClient.js)                           │
├─────────────────────────────────────────────────────────────────────────┤
│ Axios Instance with Interceptors                                        │
│ ├─ Request Interceptor                                                  │
│ │  └─ Add Authorization: Bearer {token}                                │
│ ├─ API Call                                                             │
│ │  └─ POST to API_CONFIG.BASE_URL + endpoint                           │
│ └─ Response Interceptor                                                │
│    ├─ Check for 401 (token expired)                                    │
│    ├─ Clear auth data if 401                                           │
│    └─ Return response or error                                         │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ✓ SUCCESS        ✗ ERROR (4xx/5xx)   ✗ NETWORK ERROR
    200 OK                                  (Timeout, etc)
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 ERROR HANDLER (errorHandler.js)                         │
├─────────────────────────────────────────────────────────────────────────┤
│ parseError(error)                                                       │
│ ├─ Check network error (no response)                                   │
│ ├─ Extract HTTP status code                                            │
│ ├─ Parse bilingual message (English | العربية)                        │
│ ├─ Extract validation errors if present                                │
│ └─ Return formatted error object                                       │
│                                                                         │
│ Result:                                                                 │
│ {                                                                       │
│   message: "User-friendly error message",                              │
│   type: "error_400",                                                   │
│   status: 400,                                                         │
│   details: { fieldName: ["error"] }                                    │
│ }                                                                       │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    SAVE IN STORAGE    RETURN ERROR      LOG FOR DEBUG
    (tokenManager.js) (to component)   (console.error)
          │                  │                  │
          ▼                  ▼                  ▼
    localStorage        setError()    Development Console
    ├─ authToken    render message
    ├─ userId       to user UI
    ├─ userEmail
    ├─ userFullName
    ├─ userRole
    └─ tokenExpiresAt
```

---

## Component Integration Flow

```
┌─────────────────┐
│  Login.jsx      │
└────────┬────────┘
         │ useState: formData, loading, error
         │ useAuth: login function
         │
         ▼
    handleLogin()
         │
         ├─ validateForm()
         │  ├─ Check email format
         │  ├─ Check password length
         │  └─ Check required fields
         │
         ├─ login(email, password)
         │  └─ Returns: { success, data, error }
         │
         ├─ Save token (automatic in authService)
         │
         ├─ Navigate to /dashboard (on success)
         │
         └─ setError() (on failure)


┌─────────────────┐
│ Register.jsx    │
└────────┬────────┘
         │ useState: formData, loading, error, termsAccepted
         │ useAuth: register function
         │
         ▼
    handleRegister()
         │
         ├─ validateForm()
         │  ├─ Check fullName (letters only)
         │  ├─ Check email format
         │  ├─ Check password length
         │  ├─ Check terms accepted
         │  └─ Check required fields
         │
         ├─ register(userData)
         │  └─ Returns: { success, data, error }
         │
         ├─ Save token (automatic in authService)
         │
         ├─ Navigate to /dashboard (on success)
         │
         └─ setError() (on failure)


┌──────────────────────┐
│ ProtectedRoute.jsx   │
└────────┬─────────────┘
         │ Check isAuthenticated()
         │
         ├─ Yes: Render children (Dashboard, etc)
         │
         └─ No: Redirect to /login
```

---

## Token Lifecycle

```
USER LOGS IN
    │
    ├─ POST /api/auth/login
    │
    ├─ Server returns JWT token
    │
    ├─ authService.login() called
    │
    ├─ tokenManager.saveAuthData()
    │       │
    │       └─ localStorage.setItem('authToken', token)
    │
    ├─ Return success to component
    │
    └─ Navigate to Dashboard


USER MAKES API REQUEST (with token)
    │
    ├─ httpClient.interceptors.request
    │       │
    │       └─ Add Authorization: Bearer {token}
    │
    ├─ Send request to API
    │
    ├─ API validates token
    │
    └─ Return response


TOKEN EXPIRES (401 Response)
    │
    ├─ httpClient.interceptors.response
    │       │
    │       └─ Detect status 401
    │
    ├─ tokenManager.clearAuthData()
    │       │
    │       └─ localStorage.removeItem('authToken')
    │
    ├─ (Optional) Redirect to /login
    │
    └─ User must login again


USER LOGS OUT
    │
    ├─ authService.logout()
    │
    ├─ tokenManager.clearAuthData()
    │       │
    │       └─ localStorage.removeItem('authToken')
    │
    └─ Navigate to /login
```

---

## File Dependencies

```
Login.jsx
├─ authService (useAuth)
├─ errorHandler
├─ constants (SUCCESS_MESSAGES)
└─ useAuth (hook)

Register.jsx
├─ authService (useAuth)
├─ errorHandler
├─ constants (SUCCESS_MESSAGES, USER_ROLES)
└─ useAuth (hook)

useAuth.js
├─ authService
└─ errorHandler

authService.js
├─ httpClient
├─ tokenManager
└─ errorHandler

httpClient.js
├─ axios
├─ API_CONFIG (constants)
└─ tokenManager

tokenManager.js
└─ TOKEN_CONFIG (constants)

errorHandler.js
└─ ERROR_MESSAGES (constants)

ProtectedRoute.jsx
└─ tokenManager
```

---

## Error Handling Examples

### Network Error
```
Error: Network error (timeout, no internet, etc)
    ↓
errorHandler.parseError()
    ↓
Returns:
{
  message: "Network error. Please check your connection.",
  type: "network",
  status: null,
  details: "Error message from axios"
}
    ↓
useAuth returns:
{
  success: false,
  data: null,
  error: "Network error. Please check your connection."
}
```

### Validation Error (400)
```
Error: 400 Bad Request
Body: {
  "errors": {
    "Email": ["Email is required"],
    "Password": ["Password must be at least 8 characters"]
  }
}
    ↓
errorHandler.parseError()
    ↓
Returns:
{
  message: "Please check your input and try again.",
  type: "error_400",
  status: 400,
  details: {
    "Email": ["Email is required"],
    "Password": ["Password must be at least 8 characters"]
  }
}
```

### Authentication Error (401)
```
Error: 401 Unauthorized
Body: {
  "message": "Invalid email or password | كلمة المرور أو البريد الإلكتروني غير صحيح"
}
    ↓
errorHandler.parseError()
    ↓
errorHandler.parseMessage() // Extract English part
    ↓
Returns:
{
  message: "Invalid email or password",
  type: "error_401",
  status: 401,
  details: null
}
```

### Server Error (500)
```
Error: 500 Internal Server Error
    ↓
errorHandler.parseError()
    ↓
Returns:
{
  message: "Server error. Please try again later.",
  type: "error_500",
  status: 500,
  details: null
}
```

---

## Data Flow in Components

### Login Component Data Flow
```
User Input
    ↓
formData = { email, password }
    ↓
validateForm() ─→ true/false
    ↓
login(email, password) ─→ Call useAuth
    ↓
authService.login() ─→ Call API
    ↓
Response Successful
├─ tokenManager.saveAuthData(response)
├─ return { success: true, data: {...} }
└─ Component navigates to /dashboard

Response Failed
├─ errorHandler.getUiMessage(error)
├─ return { success: false, error: "message" }
└─ Component displays error
```

---

## Configuration Hierarchy

```
constants.js (Single Source of Truth)
    │
    ├─ API_CONFIG
    │  └─ Used in httpClient.js
    │
    ├─ TOKEN_CONFIG
    │  └─ Used in tokenManager.js
    │
    ├─ USER_ROLES
    │  └─ Used in Register.jsx
    │
    └─ ERROR_MESSAGES, SUCCESS_MESSAGES
       └─ Used in components
```

---

## To Change API Base URL

Edit `src/utils/constants.js`:

```javascript
// Before:
export const API_CONFIG = {
  BASE_URL: 'https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net',
};

// After:
export const API_CONFIG = {
  BASE_URL: 'https://new-api-url.com',
};
```

All endpoints will automatically use the new URL!

---

## Testing the System

### Test Login
```javascript
Email: abdo.masar@gmail.com
Password: Pp!12345678
Expected: Redirect to dashboard
```

### Test Register
```javascript
Full Name: Test User
Email: test@example.com
Password: Pp!12345678
Role: Student
Expected: Redirect to dashboard
```

### Test Error Handling
```javascript
Email: invalid-email
Password: pass
Expected: "Please enter a valid email"
```

---

**This architecture ensures clean code, zero duplication, and maintainability.** ✨

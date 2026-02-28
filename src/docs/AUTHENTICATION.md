## Authentication System Documentation

### Overview

This authentication system follows clean code principles with proper separation of concerns and single responsibility for each module.

---

### File Structure

```
src/
├── services/
│   ├── api.js                    # API service entry point
│   ├── httpClient.js             # Axios instance with interceptors
│   ├── authService.js            # Auth API operations
│   └── index.js                  # Service exports
├── hooks/
│   ├── useAuth.js                # Authentication hook
│   └── index.js                  # Hook exports
├── utils/
│   ├── constants.js              # API config, tokens, messages
│   ├── tokenManager.js           # Token & user data storage
│   ├── errorHandler.js           # Centralized error handling
│   └── helpers.js                # Utilities (existing)
├── pages/
│   └── auth/
│       ├── Login.jsx             # Login page (updated)
│       ├── Register.jsx          # Register page (updated)
│       ├── Login.css
│       └── Register.css
```

---

### Module Responsibilities

#### 1. **constants.js** - Configuration & Messages
- Centralized API base URL, endpoints, and timeouts
- Token storage key names
- User role constants
- Error and success messages
- **Single Responsibility**: Configuration management

#### 2. **tokenManager.js** - Token & User Data Storage
- Save authentication data (token, user info)
- Retrieve token and user data
- Check authentication status
- Clear authentication data on logout
- Generate authorization headers
- **Single Responsibility**: Token and user data persistence

#### 3. **errorHandler.js** - Error Processing
- Parse API error responses
- Convert bilingual messages (English | Arabic) to English
- Extract validation errors
- Format user-friendly error messages
- Log errors for debugging
- **Single Responsibility**: Error transformation and logging

#### 4. **httpClient.js** - HTTP Communication
- Axios instance with baseURL and timeout configuration
- Request interceptor (adds auth token to all requests)
- Response interceptor (handles 401 and token expiration)
- **Single Responsibility**: HTTP client setup with interceptors

#### 5. **authService.js** - Authentication Operations
- `login()` - User login
- `register()` - User registration
- `requestPasswordReset()` - Request OTP
- `verifyOtp()` - Verify OTP code
- `resetPassword()` - Reset password
- `logout()` - Clear auth data
- `isAuthenticated()` - Check auth status
- `getCurrentUser()` - Get user data
- **Single Responsibility**: Authentication API operations

#### 6. **useAuth.js** - React Hook for Auth
- Provides authentication methods to React components
- Handles errors and returns standardized responses
- Wraps authService for easier component usage
- **Single Responsibility**: React component integration for auth

---

### How to Use

#### Basic Login Example

```javascript
import { useState } from 'react';
import { useAuth } from '../../hooks';
import errorHandler from '../../utils/errorHandler';

function LoginComponent() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    setLoading(true);
    const result = await login(email, password);
    
    if (result.success) {
      console.log('Login successful:', result.data);
      // Navigate to dashboard
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {/* Form fields */}
    </form>
  );
}
```

#### Basic Register Example

```javascript
import { useState } from 'react';
import { useAuth } from '../../hooks';

function RegisterComponent() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (userData) => {
    setLoading(true);
    const result = await register({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: 'Student'
    });
    
    if (result.success) {
      // Navigate to dashboard
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    // Form component
  );
}
```

#### Get Current User

```javascript
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';

function UserProfileComponent() {
  const { getUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [getUser]);

  return (
    <div>
      {user && (
        <>
          <h1>{user.fullName}</h1>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}
```

#### Check Authentication Status

```javascript
import { useAuth } from '../../hooks';

function ProtectedComponent() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

### API Response Flow

```
Component
  ↓
useAuth Hook
  ↓
authService.js
  ↓
httpClient (Axios)
  ├─ Request Interceptor (add token)
  ├─ Make API Call
  ├─ Response Interceptor (handle 401)
  └─ Return Response
  ↓
tokenManager.js (save data)
  ↓
Return to Component
```

---

### Error Handling Flow

```
API Call Error
  ↓
httpClient Interceptor
  ↓
authService catches error
  ↓
errorHandler.parseError()
  ├─ Check response status
  ├─ Extract message
  ├─ Parse bilingual message
  └─ Format response
  ↓
useAuth returns { success, data, error }
  ↓
Component receives user-friendly error message
```

---

### Available endpoints (from API Gateway)

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**: `{ email, password }`
- **Returns**: `{ userID, email, fullName, role, token, expiresAt }`

#### Register
- **Endpoint**: `POST /api/auth/register`
- **Body**: `{ email, password, fullName, role }`
- **Returns**: `{ userID, email, fullName, role, token, expiresAt }`

#### Forgot Password (Request OTP)
- **Endpoint**: `POST /api/auth/forgot-password`
- **Body**: `{ email }`
- **Returns**: `{ message }`

#### Verify OTP
- **Endpoint**: `POST /api/auth/verify-otp`
- **Body**: `{ email, otpCode }`
- **Returns**: `{ message }`

#### Reset Password
- **Endpoint**: `POST /api/auth/reset-password`
- **Body**: `{ email, otpCode, newPassword }`
- **Returns**: `{ message }`

---

### Token Management

Tokens are automatically stored in localStorage with the following keys:

```javascript
- authToken          : JWT token
- userId             : User ID
- userEmail          : User email
- userFullName       : User full name
- userRole           : User role (Student|Admin)
- tokenExpiresAt     : Token expiration time
- rememberedEmail    : (optional) Remembered email for login
```

Tokens are automatically added to all API requests via the request interceptor.

---

### No Code Duplication

- **API Calls**: All API calls go through `authService.js`
- **Error Handling**: Centralized in `errorHandler.js`
- **Token Management**: Centralized in `tokenManager.js`
- **HTTP Setup**: Single `httpClient.js` instance
- **React Integration**: Reusable `useAuth` hook

Each module has a single responsibility and is used consistently throughout the application.

---

### Future Enhancements

- Implement token refresh logic
- Add password strength validation
- Implement role-based access control (RBAC)
- Add two-factor authentication (2FA)
- Implement OAuth integrations (Google, Facebook)
- Add logout interceptor to clear old tokens
- Implement auth state management (Redux/Zustand)

---

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net
VITE_API_TIMEOUT=10000
```

To use in code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

### Testing

Example test cases:

```javascript
// authService.test.js
describe('authService', () => {
  it('should login user with valid credentials', async () => {
    const result = await authService.login('test@example.com', 'password123');
    expect(result.token).toBeDefined();
    expect(result.userID).toBeDefined();
  });

  it('should throw error with invalid credentials', async () => {
    await expect(authService.login('test@example.com', 'wrongpass')).rejects.toThrow();
  });

  it('should save token to localStorage on login', async () => {
    await authService.login('test@example.com', 'password123');
    const token = localStorage.getItem('authToken');
    expect(token).toBeDefined();
  });
});

// tokenManager.test.js
describe('tokenManager', () => {
  it('should save and retrieve auth data', () => {
    const data = {
      token: 'test-token',
      userID: 1,
      email: 'test@example.com'
    };
    tokenManager.saveAuthData(data);
    expect(tokenManager.getToken()).toBe('test-token');
  });

  it('should clear auth data on logout', () => {
    const data = { token: 'test-token', userID: 1, email: 'test@example.com' };
    tokenManager.saveAuthData(data);
    tokenManager.clearAuthData();
    expect(tokenManager.isAuthenticated()).toBe(false);
  });
});
```

---

**Last Updated**: February 14, 2026

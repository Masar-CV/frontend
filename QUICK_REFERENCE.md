# Quick Reference - Authentication Use Cases

## 🔐 Frequently Used Patterns

### Pattern 1: Login in Component

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Pattern 2: Register New User

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister}>
      <input 
        value={formData.fullName}
        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        placeholder="Full Name"
      />
      <input 
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <input 
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
      />
      <select 
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
      >
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
}
```

---

### Pattern 3: Display Current User

```javascript
import { useAuth } from '../hooks';

function UserProfile() {
  const { getUser } = useAuth();
  const user = getUser();

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Expires: {user.expiresAt}</p>
    </div>
  );
}
```

---

### Pattern 4: Check if User is Logged In

```javascript
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <h1>Welcome to Dashboard!</h1>;
}
```

---

### Pattern 5: Logout User

```javascript
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
```

---

### Pattern 6: Protect a Route

```javascript
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';

// In your Router
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

### Pattern 7: Get Token Directly

```javascript
import { useAuth } from '../hooks';

function MyComponent() {
  const { getToken } = useAuth();
  const token = getToken();

  // Use token for API calls
  const makeRequest = async () => {
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  return <div>Token: {token?.substring(0, 20)}...</div>;
}
```

---

### Pattern 8: Handle Specific Errors

```javascript
import { useState } from 'react';
import { useAuth } from '../hooks';
import errorHandler from '../utils/errorHandler';

function LoginPage() {
  const { login } = useAuth();
  const [errors, setErrors] = useState({});

  const handleLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        // Get validation errors if available
        const validationErrors = errorHandler.getValidationErrors(
          new Error(result.error)
        );
        
        if (validationErrors) {
          setErrors(validationErrors);
        } else {
          setErrors({ general: result.error });
        }
      }
    } catch (error) {
      setErrors({ general: 'Unexpected error occurred' });
    }
  };

  return (
    <form>
      {errors.Email && <p>{errors.Email[0]}</p>}
      {errors.Password && <p>{errors.Password[0]}</p>}
      {errors.general && <p>{errors.general}</p>}
    </form>
  );
}
```

---

### Pattern 9: Conditional Rendering Based on Role

```javascript
import { useAuth } from '../hooks';

function AdminPanel() {
  const { getUser } = useAuth();
  const user = getUser();

  if (user?.role !== 'Admin') {
    return <p>Access Denied</p>;
  }

  return <h1>Admin Panel</h1>;
}
```

---

### Pattern 10: Form with Real-Time Validation

```javascript
import { useState } from 'react';
import { useAuth } from '../hooks';

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.email, formData.password);

    if (!result.success) {
      setErrors({ submit: result.error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}

      {errors.submit && <p style={{color: 'red'}}>{errors.submit}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Pattern 11: Auto-Login on App Load

```javascript
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';

function App() {
  const { isAuthenticated, getUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = getUser();
    if (user) {
      console.log('User already logged in:', user.fullName);
    }
    setIsLoaded(true);
  }, [getUser]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isAuthenticated() ? <Dashboard /> : <Login />}
    </div>
  );
}
```

---

### Pattern 12: Global Error Toast

```javascript
import { useAuth } from '../hooks';
import { useState } from 'react';

function LoginWithToast() {
  const { login } = useAuth();
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    
    if (result.success) {
      showToast('Login successful!');
      // Navigate to dashboard
    } else {
      showToast(result.error);
    }
  };

  return (
    <>
      {/* Your login form */}
      
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#f8d7da',
          padding: '10px',
          borderRadius: '4px'
        }}>
          {toast.message}
        </div>
      )}
    </>
  );
}
```

---

## 🎯 Common Scenarios

### Scenario 1: User navigates to /dashboard without logging in
```
1. ProtectedRoute checks isAuthenticated()
2. Returns false
3. <Navigate to="/login" /> redirects user
4. User sees login page
```

### Scenario 2: User logs in successfully
```
1. Form submitted
2. login(email, password) called
3. API returns { token, userID, ... }
4. tokenManager.saveAuthData() stores everything
5. { success: true } returned
6. Component navigates to /dashboard
```

### Scenario 3: User enters wrong password
```
1. API returns 401 { message: "Invalid credentials | ..." }
2. errorHandler parses error
3. Converts bilingual message to English
4. Returns { success: false, error: "Invalid email or password" }
5. Component displays error message
```

### Scenario 4: Token expires (401 response)
```
1. User makes API request with expired token
2. httpClient interceptor detects 401
3. tokenManager.clearAuthData() clears token
4. httpClient returns error
5. Component shows "Session expired" message
6. User redirected to /login
```

---

## 🔧 Debugging Tips

### Check if logged in
```javascript
// In browser console
localStorage.getItem('authToken')
```

### Check user data
```javascript
// In browser console
JSON.parse(localStorage.getItem('userId'))
```

### Check API response
```javascript
// In DevTools Network tab
// Look for POST /api/auth/login request
// View Response to see returned data
```

### Check errors
```javascript
// In browser console
// Login will log errors automatically
// Look for [authService.login] messages
```

---

## 📚 Quick Lookup

| Need | Use |
|------|-----|
| Login | `useAuth().login()` |
| Register | `useAuth().register()` |
| Logout | `useAuth().logout()` |
| Get User | `useAuth().getUser()` |
| Check Auth | `useAuth().isAuthenticated()` |
| Get Token | `useAuth().getToken()` |
| Protect Route | `<ProtectedRoute>` |
| Handle Errors | `errorHandler.getUiMessage()` |

---

## 🚀 Copy & Paste Ready

All code snippets on this page are ready to copy and use!

Just replace:
- `../hooks` with correct path to hooks
- `../utils` with correct path to utils
- Field names to match your form
- Component imports to match your structure

---

Last Updated: February 14, 2026

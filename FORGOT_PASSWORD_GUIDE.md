# Forgot Password Flow Documentation

## Overview

The forgot password feature implements a 3-step process:
1. **Request OTP** - User enters email
2. **Verify OTP** - User enters 6-digit code sent to email
3. **Reset Password** - User creates new password

---

## Page Structure

### URL
```
/forgot-password
```

### File Location
```
src/pages/auth/ForgotPassword.jsx
src/pages/auth/ForgotPassword.css
```

---

## Step-by-Step Flow

### Step 1: Request OTP
```javascript
// User enters email
POST /api/auth/forgot-password
{
  "email": "ali.masar@example.com"
}

// Response
{
  "message": "OTP sent successfully to your email | تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح"
}
```

**Validation:**
- Email required
- Valid email format
- Must match registered user

**Error Handling:**
- "User with this email does not exist"
- Email validation errors
- Network errors

---

### Step 2: Verify OTP
```javascript
// User enters 6-digit code
POST /api/auth/verify-otp
{
  "email": "ali.masar@example.com",
  "otpCode": "123456"
}

// Response
{
  "message": "OTP verified successfully | تم التحقق من رمز OTP بنجاح"
}
```

**Validation:**
- OTP code required
- Must be exactly 6 digits
- Must be within 10-minute expiration

**Error Handling:**
- "Invalid or expired OTP code"
- Format validation errors
- Network errors

---

### Step 3: Reset Password
```javascript
// User enters new password
POST /api/auth/reset-password
{
  "email": "ali.masar@example.com",
  "otpCode": "123456",
  "newPassword": "NewSecurePass123"
}

// Response
{
  "message": "Password reset successfully | تم إعادة تعيين كلمة المرور بنجاح"
}
```

**Validation:**
- New password required
- Minimum 8 characters
- Confirm password must match
- OTP must still be valid

**Error Handling:**
- "Invalid or expired OTP code"
- Password validation errors
- Network errors

---

## Component Features

### UI Elements
- **Email Input** - Step 1
- **OTP Input** - Step 2 (auto-formatted, max 6 digits)
- **Password Fields** - Step 3 (with confirm)
- **Error Messages** - All steps
- **Success Messages** - Between steps
- **Loading States** - All buttons
- **Back Buttons** - Navigate between steps

### State Management
```javascript
const [step, setStep] = useState('email');       // 'email', 'otp', 'password'
const [email, setEmail] = useState('');
const [otpCode, setOtpCode] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState('');
```

---

## Service Integration

### authService Methods Used

#### 1. Request OTP
```javascript
await authService.requestPasswordReset(email);
```
- **Parameter:** email (string)
- **Returns:** Promise
- **Throws:** Error on failure

#### 2. Verify OTP
```javascript
await authService.verifyOtp(email, otpCode);
```
- **Parameters:** 
  - email (string)
  - otpCode (string - 6 digits)
- **Returns:** Promise
- **Throws:** Error on failure

#### 3. Reset Password
```javascript
await authService.resetPassword(email, otpCode, newPassword);
```
- **Parameters:**
  - email (string)
  - otpCode (string - 6 digits)
  - newPassword (string - min 8 chars)
- **Returns:** Promise
- **Throws:** Error on failure

---

## Error Handling

All errors are handled by the centralized `errorHandler`:

```javascript
try {
  await authService.requestPasswordReset(email);
} catch (err) {
  const userMessage = errorHandler.getUiMessage(err);
  setError(userMessage);
  errorHandler.logError('ForgotPassword.requestOtp', err);
}
```

### Common Errors
```
✓ "Email is required"
✓ "Please enter a valid email"
✓ "User with this email does not exist"
✓ "OTP code is required"
✓ "OTP must be exactly 6 digits"
✓ "Invalid or expired OTP code"
✓ "New password is required"
✓ "Password must be at least 8 characters"
✓ "Passwords do not match"
✓ "Network error. Please check your connection."
✓ "Server error. Please try again later."
```

---

## Styling

### CSS Classes
- `.forgot-password-page` - Main container
- `.forgot-password-left` - Left side (image)
- `.forgot-password-right` - Right side (form)
- `.forgot-password-form-container` - Form wrapper
- `.forgot-password-heading` - Title
- `.form-input` - Input fields
- `.btn-primary` - Submit button
- `.btn-secondary` - Back button
- `.form-error` - Error message
- `.form-success` - Success message

### Responsive
- Mobile (< 480px)
- Tablet (< 768px)
- Desktop (> 768px)

---

## Navigation

### From Forgot Password
- **Back to Login:** `/login`
- **Remember password:** Click "Back to Login" link
- **After reset:** Auto-redirect to `/login` after 2 seconds

### To Forgot Password
- **From Login:** Click "Forgot Password?" link
- **From Register:** Click "Back to Login" → then "Forgot Password?"

---

## Data Flow

```
User Input (Email)
    ↓
validateForm()
    ↓
authService.requestPasswordReset()
    ↓
Success: Move to OTP step
Failure: Show error message
    ↓
User Input (OTP Code)
    ↓
validateForm()
    ↓
authService.verifyOtp()
    ↓
Success: Move to Password step
Failure: Show error message
    ↓
User Input (New Password)
    ↓
validateForm()
    ↓
authService.resetPassword()
    ↓
Success: Redirect to /login
Failure: Show error message
```

---

## Security Features

✅ **OTP Validation** - Must be 6 digits  
✅ **Password Validation** - Minimum 8 characters  
✅ **Email Validation** - Must be valid format  
✅ **Expiration Handling** - 10-minute OTP validity  
✅ **Error Handling** - No sensitive info leaked  
✅ **HTTPS** - All API calls to secure endpoint  
✅ **Token-free** - No auth token required  

---

## Testing

### Test Case 1: Happy Path
```
1. Navigate to /forgot-password
2. Enter email: ali.masar@example.com
3. Click "Send OTP"
4. Receive OTP: 123456
5. Enter OTP: 123456
6. Click "Verify OTP"
7. Enter new password: NewPass123
8. Confirm password: NewPass123
9. Click "Reset Password"
10. Should redirect to /login
```

### Test Case 2: Invalid Email
```
1. Navigate to /forgot-password
2. Enter email: invalid-email
3. Click "Send OTP"
4. Should show: "Please enter a valid email"
```

### Test Case 3: Invalid OTP
```
1. Go through Step 1-2
3. Enter OTP: 000000
4. Click "Verify OTP"
5. Should show: "Invalid or expired OTP code"
```

### Test Case 4: Password Mismatch
```
1. Go through Step 1-2
2. Enter password: NewPass123
3. Enter confirm: DifferentPass456
4. Click "Reset Password"
5. Should show: "Passwords do not match"
```

### Test Case 5: Go Back
```
1. Go to Step 2 (OTP)
2. Click "Back to Email"
3. Should return to Step 1
4. Email should be preserved
```

---

## Integration with App.jsx

The route is already configured:

```javascript
import ForgotPassword from './pages/auth/ForgotPassword';

<Route path="/forgot-password" element={<ForgotPassword />} />
```

---

## Endpoints Used

| Step | Method | Endpoint | Request | Response |
|------|--------|----------|---------|----------|
| 1 | POST | `/api/auth/forgot-password` | `{ email }` | `{ message }` |
| 2 | POST | `/api/auth/verify-otp` | `{ email, otpCode }` | `{ message }` |
| 3 | POST | `/api/auth/reset-password` | `{ email, otpCode, newPassword }` | `{ message }` |

---

## Code Example: Using in Components

If you need to call forgot password from another component:

```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <button onClick={handleForgotPassword}>
      Forgot Password?
    </button>
  );
}
```

---

## Troubleshooting

### OTP not received?
- Check email spam folder
- OTP valid for 10 minutes only
- Request new OTP by clicking "Back to Email"

### Can't verify OTP?
- Ensure OTP is exactly 6 digits
- Check OTP hasn't expired (10 minutes)
- Copy from email carefully

### Password reset failed?
- Ensure passwords match exactly
- Password must be 8+ characters
- OTP must still be valid

### Server error?
- Check internet connection
- API might be down
- Try again in a few moments

---

## Future Enhancements

- [ ] Resend OTP functionality
- [ ] OTP countdown timer
- [ ] Email confirmation before password change
- [ ] Password strength indicator
- [ ] Biometric unlock option
- [ ] Multi-factor authentication (2FA)

---

**Last Updated:** February 14, 2026

# Front-End Testing Strategies

This document explains the testing approach for the front-end source code in `src/`.
It is written for a React + Vite application and focuses on three levels of testing:

1. Unit testing
2. Integration testing
3. User testing

The goal is to make sure the front end is reliable, easy to maintain, and safe to extend as new features are added.

## 1. Why Testing Matters

The front end contains many interactive features such as authentication, profile management, CV analysis, job tracking, dashboard visualizations, and mock interview screens.
Testing helps us:

- catch bugs early
- confirm that UI behavior matches the expected user flow
- protect important features from breaking during refactoring
- improve confidence when adding new pages or services
- verify that form validation, routing, and data rendering work correctly

## 2. Unit Testing

Unit testing checks a small piece of code in isolation.
For this project, unit tests should focus on logic that does not require the full application to run.

### What to test

- helper functions in `src/utils/`
- validation functions in forms
- mapping and formatting functions
- custom hooks with isolated logic
- small reusable UI components
- service functions when requests are mocked

### Good unit test targets in this project

- `src/pages/auth/login/loginValidation.js`
- `src/pages/auth/register/registerValidation.js`
- `src/pages/auth/forgotPassword/forgotPasswordValidation.js`
- `src/pages/cv-analysis/analysis/cvAnalysisFormatters.js`
- `src/pages/cv-analysis/analysis/cvAnalysisResultMapper.js`
- `src/pages/resources/templateEditor/templateEditorUtils.js`
- `src/features/cv-optimization/hooks/useCVOptimization.js`
- `src/hooks/useLocalStorage.js`
- `src/utils/helpers.js`

### Example unit test ideas

- verify that email and password validation return the correct error messages
- confirm that result formatting converts raw API data into readable labels
- check that local storage helpers save and read values correctly
- ensure utility functions return the expected output for edge cases

### Unit testing benefits

- fast execution
- easy debugging
- low maintenance when the logic is isolated

### Recommended tools

If you add automated tests later, a common setup for this project would be:

- Vitest for the test runner
- React Testing Library for rendering components and simulating user behavior
- Jest DOM for better DOM assertions

## 3. Integration Testing

Integration testing checks how multiple parts work together.
This is important for a React application because most features depend on components, hooks, routing, and API calls working together.

### What to test

- page level workflows
- form submission and validation together
- route protection and navigation
- API calls with loading, success, and error states
- interaction between parent and child components
- state updates that affect multiple UI sections

### Good integration test targets in this project

- authentication pages in `src/pages/auth/`
- protected routes in `src/components/ProtectedRoute.jsx`
- dashboard rendering in `src/pages/dashboard/`
- CV analysis flow in `src/pages/cv-analysis/`
- job tracker actions in `src/pages/job-tracker/`
- mock interview setup and results in `src/pages/mock-interview/`
- resources and template editor flows in `src/pages/resources/`

### Example integration test scenarios

- a user fills the login form, submits it, and sees either a success path or an error message
- a protected page redirects unauthenticated users to the login page
- a CV upload form shows loading state while the request is in progress
- dashboard cards render correctly when fetched data is available
- adding a job application updates the table and summary statistics
- template editor changes are reflected in the preview panel

### Integration testing benefits

- verifies real user flows
- reduces regression risk between connected modules
- catches issues that unit tests may miss

### Recommended tools

- React Testing Library
- Vitest
- MSW for mocking API requests in a realistic way

## 4. User Testing

User testing checks whether real people can use the interface successfully.
This is especially important for a graduation project because it shows that the system is not only working technically, but is also understandable and practical for users.

### What to observe

- can users understand the purpose of each page
- can they complete important tasks without help
- do they notice errors and validation messages
- is the layout clear on desktop and mobile
- do buttons, forms, and navigation feel intuitive
- do users understand the results shown on analysis and dashboard pages

### Suggested user testing tasks

- create an account
- log in and log out
- upload a CV and review the analysis result
- update profile information
- add a new job application in the tracker
- open a CV template and use the editor
- start a mock interview session

### User testing checklist

- text is readable
- buttons are easy to identify
- forms are not confusing
- feedback messages are visible
- navigation is simple
- pages work on different screen sizes
- error states are understandable

### How to run user tests

1. Give the tester a clear task.
2. Ask them to complete it without extra instructions.
3. Watch where they hesitate or get confused.
4. Note which labels, buttons, or steps caused problems.
5. Improve the UI based on the feedback.

## 5. Testing Focus By Feature

### Authentication

- validation rules
- login and register flows
- forgot password steps
- protected route behavior

### CV Analysis

- file upload handling
- loading and error states
- result rendering
- recommendation cards and score display

### Dashboard

- KPI cards
- charts and trend sections
- status summaries
- empty or missing data handling

### Job Tracker

- add job modal
- application table
- status updates
- summary cards

### Resources and Template Editor

- template selection
- form editing
- preview updates
- download actions

### Mock Interview

- setup screen
- interview state changes
- result summary
- retry flow

## 6. Suggested Test Structure

If automated tests are added, a simple structure could be:

```text
src/
  __tests__/
    utils/
    hooks/
    components/
    pages/
```

Another option is to place tests beside the files they cover:

```text
loginValidation.js
loginValidation.test.js
```

Both approaches work. The most important thing is to keep the structure consistent.

## 7. Priority Order

If time is limited, test in this order:

1. Validation and utility functions
2. Authentication flows
3. Core page workflows
4. Important UI interactions
5. Full user testing sessions

This order gives the best balance between speed and project safety.

## 8. Conclusion

For this front end, unit testing should protect the logic, integration testing should protect the user flows, and user testing should confirm that the interface is actually easy to use.

Together, these three levels give a strong quality process for a graduation project and help ensure the application is stable, understandable, and ready for presentation.

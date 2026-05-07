import micBotImage from '../../../assets/images/mice.svg';
import {
  DIFFICULTY_OPTIONS,
  EXPECTATIONS,
  JOB_ROLE_OPTIONS,
} from './mockInterviewData';

const SetupScreen = ({
  jobRole,
  difficulty,
  setJobRole,
  setDifficulty,
  handleStartInterview,
}) => (
  <>
    <section className="mi1-hero">
      <div>
        <h1>Mock Interview</h1>
        <p>
          Practice with AI-generated interview questions tailored to your target
          role
        </p>
      </div>
      <img src={micBotImage} alt="AI interview assistant" />
    </section>

    <section className="mi1-card">
      <div className="mi1-card-head">
        <h2>Setup Your Interview</h2>
        <p>Choose your preferences to get started</p>
      </div>

      <div className="mi1-field">
        <label htmlFor="jobRole">Job Role</label>
        <select
          id="jobRole"
          value={jobRole}
          onChange={(event) => setJobRole(event.target.value)}
        >
          <option value="">Select a job role</option>
          {JOB_ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="mi1-field">
        <label htmlFor="difficulty">Difficulty Level</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option value="">Select difficulty</option>
          {DIFFICULTY_OPTIONS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="mi1-expect">
        <h3>What to Expect:</h3>
        <ul>
          {EXPECTATIONS.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M8 12.5l2.2 2.2L16 9" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="mi1-start-btn"
        onClick={handleStartInterview}
      >
        <span className="mi1-play">&gt;</span>
        Start Interview
      </button>
    </section>
  </>
);

export default SetupScreen;

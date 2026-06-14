import micBotImage from '../../../assets/images/mice.svg';
import { EXPECTATIONS } from './mockInterviewData';

const SetupScreen = ({
  cvFile,
  jobDescription,
  setupError,
  isGenerating,
  setCvFile,
  setJobDescription,
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
        <label htmlFor="cvFile">Upload CV</label>
        <input
          id="cvFile"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => setCvFile(event.target.files?.[0] || null)}
        />
        {cvFile && <p className="mi1-file-name">{cvFile.name}</p>}
      </div>

      <div className="mi1-field">
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the job description here..."
          className="mi1-description-input"
        />
      </div>

      {setupError && <p className="mi1-error">{setupError}</p>}

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
        disabled={isGenerating}
      >
        <span className="mi1-play">&gt;</span>
        {isGenerating ? 'Generating Questions...' : 'Start Interview'}
      </button>
    </section>
  </>
);

export default SetupScreen;

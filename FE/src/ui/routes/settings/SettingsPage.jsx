import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { SETTINGS_KEY } from "../../common/constants";

const SettingsPageComponent = ({
  isMockHostName,
  toggleMockHostName,
  doTestGet,
  testResponse
}) => {
    const textAreaValue = testResponse && JSON.stringify(testResponse);
  return (
    <div>
      <h1>SettingsPage</h1>
      <div>
        <p>
          <label>Mock hostname</label>
          <input
            type="checkbox"
            value={isMockHostName}
            checked={isMockHostName}
            onChange={toggleMockHostName}
          />
        </p>
        <p>
          <button onClick={doTestGet}>Test Get </button>
          <textarea defaultValue={textAreaValue} onMouseEnter={() => {
              console.log(testResponse)
              }}></textarea>
        </p>
      </div>
    </div>
  );
};

export const SettingsPage = withChangeIconOnInit(SETTINGS_KEY)(
  SettingsPageComponent
);

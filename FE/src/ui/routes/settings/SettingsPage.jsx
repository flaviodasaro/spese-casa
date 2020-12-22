import { useState } from "react";
import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { SETTINGS_KEY } from "../../common/constants";

const SettingsPageComponent = ({
  isMockHostName,
  toggleMockHostName,
  doTestGet,
  testGetUserById,
  testResponse
}) => {
    const textAreaValue = testResponse && JSON.stringify(testResponse);
    const [idUtente, setIdUtente] = useState(0);
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
      <div>
        <label>ID</label>
        <input type="number" value={idUtente} onChange={event => setIdUtente(event.target.value)} />
        <button onClick={() => testGetUserById(idUtente)}>Submit</button>
      </div>
    </div>
  );
};

export const SettingsPage = withChangeIconOnInit(SETTINGS_KEY)(
  SettingsPageComponent
);

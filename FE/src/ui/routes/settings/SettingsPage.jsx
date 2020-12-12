import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { SETTINGS_KEY } from "../../common/constants";

const SettingsPageComponent = props => {
    return <>SettingsPage</>
}

export const SettingsPage = withChangeIconOnInit(SETTINGS_KEY)(SettingsPageComponent);
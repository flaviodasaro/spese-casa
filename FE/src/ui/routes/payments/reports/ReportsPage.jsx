import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";

const ReportsPageComponent = props => {
    return <>ReportsPage</>
}

export const ReportsPage = withChangeIconOnInit(PAYMENTS_KEY)(ReportsPageComponent);


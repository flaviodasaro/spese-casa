import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PAYMENTS_KEY } from "../../../common/constants";

const AddPaymentPageComponent = props => {
    return <>AddPaymentPage</>
}

export const AddPaymentPage = withChangeIconOnInit(PAYMENTS_KEY)(AddPaymentPageComponent);
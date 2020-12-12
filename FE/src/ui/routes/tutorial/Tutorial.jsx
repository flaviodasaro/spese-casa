import TestContainer from "../../testComponent/TestContainer";
import {
  ClassCounterComponent,
  FunctionCounterComponent,
} from "../../class-counter-component/ClassCounterComponent";

export const Tutorial = props => (
  <div>
    <TestContainer normalInput="Input Normale" />
    <ClassCounterComponent startingColourClassName={1} />
    <ClassCounterComponent startingColourClassName={2} />
    <FunctionCounterComponent />
    <FunctionCounterComponent startingColourClassName={1} />
  </div>
);

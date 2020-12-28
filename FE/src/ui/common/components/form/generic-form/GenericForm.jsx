import { Input } from "../input/Input";
import { withNamespaces } from "react-i18next";
import "./GenericForm.scss";
import { useEffect, useState } from "react";
import { Button } from "../button/Button";

const UtilityInput = ({ input }) => (
  <Input
    key={input.name}
    onChange={event => {
      input.onChange && input.onChange(event);
    }}
    {...input}
  />
);

const InputRow = ({ input1, input2 }) => {
  return (
    <div className="input-row">
      <UtilityInput input={input1} />
      {input2 && <UtilityInput input={input2} />}
    </div>
  );
};

const GenericFormComponent = ({
  preventDefaultOnSubmit,
  useInternalState,
  inputPropsList,
  onSubmit,
  submitLabelKey,
  t
}) => {
  const handleSubmit = event => {
    if (preventDefaultOnSubmit) {
      event.preventDefault();
      onSubmit({
        originalEvent: event,
        formDataEntries: new FormData(event.target).entries()
      });
    }
  };

  const [nameValuePairs, setNameValuePairs] = useState({});
  const [inputList, setInputList] = useState(inputPropsList);
  const [auxiliarArray, setAuxiliarArray] = useState([]);

  useEffect(() => {
    if (useInternalState) {
      setNameValuePairs(
        inputPropsList.reduce(
          (acc, current) => ({ ...acc, [current.name]: current.value }),
          {}
        )
      );

      const newInputList = inputPropsList.map(input => {
        const nameValuePairByKey = nameValuePairs[input.name];

        return {
          ...input,
          value: nameValuePairByKey,
          onChange: event => {
            if (event.target.name === input.name) {
              setNameValuePairs({
                ...nameValuePairs,
                [input.name]: event.target.value
              });
            }

            input.externalOnChange && input.externalOnChange(event);
          }
        };
      });

      setInputList(newInputList);

      const newAuxiliarArray = [];
      for (let i in newInputList) {
        if (i % 2 === 0) {
          newAuxiliarArray.push(i);
        }
      }

      setAuxiliarArray(newAuxiliarArray);
    }
  }, [inputPropsList]);

  return (
    <form onSubmit={handleSubmit} className="form-tag">
      <div className="inputs-container">
        {auxiliarArray.map(index => (
          <InputRow
            input1={inputList[index]}
            input2={inputList[1 + Number(index)]}
          />
        ))}
      </div>
      <div className="submit-container">
        <Button type="submit" labelKey={submitLabelKey} />
      </div>
    </form>
  );
};

GenericFormComponent.defaultProps = {
  preventDefaultOnSubmit: true,
  useInternalState: true
};

export const GenericForm = withNamespaces()(GenericFormComponent);

import React from "react";
import { ReactTypeformEmbed } from "react-typeform-embed";
import { ButtonWithText } from "./styledComponents";

class TypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    console.log("RENDER TYPEFORM");
    return (
      <>
        <ReactTypeformEmbed
          popup={true}
          autoOpen={false}
          url="https://heartworkhq.typeform.com/to/hWmJqK"
          // hideHeaders
          // hideFooter
          // buttonText="Go!"
          // style={{ top: 100 }}
          ref={(tf) => {
            this.typeformEmbed = tf;
          }}
        />
        <ButtonWithText onClick={this.openForm}>
          1min FEEDBACK PLEASE <br />
          🙏👌🐠
        </ButtonWithText>
      </>
    );
  }
}

export default TypeForm;

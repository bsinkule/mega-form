export const postWarranty = async (values, e, resetForm, initialValues) => {
  e.preventDefault();

  const body = JSON.stringify(values);
  const options = {
    method: "POST",
    body: body,
    headers: new Headers({
      "content-type": "application/json"
    })
  };

  const url = `/SOMEapiENDPOINT`;
  let response;
  try {
    response = await fetch(url, options);
  } catch (err) {
    this.setState({ errorBool: true });
    console.error("Error sending registration: ", err);
    return;
  }

  if (response.status < 200 || response.status > 299) {
    let msg = "";
    switch (response.status) {
      case 409:
        msg = "Error creating warranty, warranty exists. Please contact ";
        break;
      case 500:
        msg =
          "Internal Server Error: please try again. If it persists please contact ";
        break;
      default:
        msg =
          "Could not register, please try again. If it persists please contact ";
    }
    this.setState({ errorBool: true, errorMessage: msg });

    return;
  }

  console.log(
    "[Registration][postWarranty] Successfully submitted new warranty"
  );

  resetForm(initialValues);
  this.setState({ submitBool: true });
  setTimeout(() => {
    this.setState({
      submitBool: false,
      errorBool: false
    });
    this.props.history.push("/registration/five");
  }, 2000);
};
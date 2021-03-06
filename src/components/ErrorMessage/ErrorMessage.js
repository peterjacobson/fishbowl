import React from "react";
import "./ErrorMessage.css";
import { Error} from "../styledComponents";

function ErrorMessage(props) {
  const { errorCode } = props;

  function getErrorMessage() {
    switch (errorCode) {
      case "anonymous-auth-failed":
        return "Anonymous authentication failed. Try again.";
      case "all-fields-required":
        return "You gotta put your name and all three 🐠fishies (words or phrases)";
      case "grocery-list-get-fail":
        return "Failed to retrieve the grocery list. Try again.";
      case "add-list-item-error":
        return "Failed to add grocery item to list. Try again.";
      case "create-list-error":
        return "Failed to create the grocery list. Try again.";
      case "add-user-to-list-error":
        return "Failed to add user to the grocery list. Try again.";
      case "grocery-item-desc-req":
        return "grocery item description required";
      case "duplicate-item-error":
        return "grocery item on list already";
      case "user-name-required":
        return "your name is required";
      case "grocery-list-item-get-fail":
        return "failed to get grocery list items";
      default:
        return "Oops, something went wrong.";
    }
  }

  return errorCode ? (
    <Error>
      {getErrorMessage()} {props.children}
    </Error>
  ) : null;
}

export default ErrorMessage;

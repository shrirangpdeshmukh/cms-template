import React, { Component } from "react";
import styles from "../../views/styles/tagsInput.module.css";

class TagInput extends Component {
  removeTags = (index) => {
    const updated = [...this.props.tags.filter((_, idx) => idx !== index)];
    this.props.updateTags(updated);
  };

  addTags = (event) => {
    if (this.props.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (event.target.value !== "" && pattern.test(event.target.value)) {
        this.props.updateTags([...this.props.tags, event.target.value]);

        event.target.value = "";
      }
    } else {
      if (event.target.value !== "") {
        this.props.updateTags([...this.props.tags, event.target.value]);

        event.target.value = "";
      }
    }
  };

  render() {
    return (
      <div className={styles.tagsInput}>
        <ul className={styles.tags}>
          {this.props.tags.map((tag, index) => (
            <li key={index} className={styles.tag}>
              <span className={styles.tagTitle}>{tag}</span>
              <span
                className={styles.tagCloseIcon}
                onClick={() => this.removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) =>
            event.key === "Enter" ? this.addTags(event) : null
          }
          placeholder={
            this.props.isEmail
              ? "Enter emails. Press enter after each one."
              : "Press enter to add tags"
          }
        />
      </div>
    );
  }
}

export default TagInput;

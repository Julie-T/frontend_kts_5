import React from "react";

import styles from "./GitHubError.module.scss";

export const GitHubError: React.FC<any> = ({ errorMessage }) => {
  return <div className={styles.github_error}>Error: {errorMessage}</div>;
};

import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer " +
      "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",
  },
});

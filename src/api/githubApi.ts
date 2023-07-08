import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer " +
      "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",
  },
});

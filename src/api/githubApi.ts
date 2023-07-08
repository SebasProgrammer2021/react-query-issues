import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer " +
      "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",
  },
});

import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer " +
      "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",
  },
});

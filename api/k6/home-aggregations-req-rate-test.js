import http from "k6/http";

export const options = {
  scenarios: {
    my_scenario1: {
      executor: "constant-arrival-rate",
      duration: "30s",
      // to allocate runtime resources preAll
      preAllocatedVUs: 50,
      // number of constant iterations given `timeUnit`
      rate: 100,
      timeUnit: "1s",
    },
  },
};

export default function () {
  http.get("http://localhost:5000/api/aggregations/home");
}

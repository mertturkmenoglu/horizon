import http from "k6/http";

export const options = {
  thresholds: {
    // http errors should be less than 1%
    http_req_failed: ["rate<0.01"],
    // 95% of requests should be below 50ms
    http_req_duration: ["p(95)<50"],
  },
  stages: [
    { duration: "1m", target: 100 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 0 },
  ],
};

export default function () {
  http.get("http://localhost:5000/api/aggregations/home");
}

import http from "k6/http";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<50"], // 95% of requests should be below 50ms
  },
  vus: 5,
  duration: "1m",
};

export default function () {
  http.get("http://localhost:5000/api/aggregations/home");
}

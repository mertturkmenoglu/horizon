import { sleep } from "k6";
import http from "k6/http";

export const options = {
  // Key configurations for breakpoint in this section
  // Assure load increase if the system slows
  executor: "ramping-arrival-rate",
  stages: [
    // just slowly ramp-up to a HUGE load
    { duration: "10m", target: 20000 },
  ],
};

export default () => {
  http.get("http://localhost:5000/api/aggregations/home");
  sleep(1);
};

export interface ResultMetricProps {
  name: string;
  percentage: number;
  rating: string;
  color: string;
}

export function getMetricRating(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent Match",
      className: "metric-excellent",
    };
  }

  if (score >= 80) {
    return {
      label: "Strong Match",
      className: "metric-strong",
    };
  }

  if (score >= 70) {
    return {
      label: "Good Match",
      className: "metric-good",
    };
  }

  if (score >= 60) {
    return {
      label: "Fair Match",
      className: "metric-fair",
    };
  }

  if (score >= 50) {
    return {
      label: "Weak Match",
      className: "metric-weak",
    };
  }

  return {
    label: "Poor Match",
    className: "metric-poor",
  };
}

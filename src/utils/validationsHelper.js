export const isNotEmpty = (values) => {
  for (const value of values) {
    if (!value.trim()) {
      return false;
    }
  }

  return true;
};

export const isSuperiorOrEqualToZero = (values) => {
  for (const value of values) {
    if (value < 0) {
      return false;
    }
  }

  return true;
};

export const isSuperiorToZero = (values) => {
  for (const value of values) {
    if (value <= 0) {
      return false;
    }
  }

  return true;
};

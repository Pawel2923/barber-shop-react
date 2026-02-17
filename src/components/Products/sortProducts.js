const replacePlLetters = (string) => {
  let updatedString = string;

  updatedString = updatedString.replaceAll("ą", "a");
  updatedString = updatedString.replaceAll("ć", "c");
  updatedString = updatedString.replaceAll("ę", "e");
  updatedString = updatedString.replaceAll("ł", "l");
  updatedString = updatedString.replaceAll("ń", "n");
  updatedString = updatedString.replaceAll("ó", "o");
  updatedString = updatedString.replaceAll("ś", "s");
  updatedString = updatedString.replaceAll("ź", "z");
  updatedString = updatedString.replaceAll("ż", "z");

  return updatedString;
};

const SortFunctions = {
  titleA: (a, b) => {
    let stringA = a.title.trim().toLowerCase();
    let stringB = b.title.trim().toLowerCase();

    stringA = replacePlLetters(stringA);
    stringB = replacePlLetters(stringB);

    if (stringA < stringB) {
      return -1;
    }
    if (stringA > stringB) {
      return 1;
    }
    return 0;
  },
  titleZ: (a, b) => {
    let stringA = a.title.trim().toLowerCase();
    let stringB = b.title.trim().toLowerCase();

    stringA = replacePlLetters(stringA);
    stringB = replacePlLetters(stringB);

    if (stringB < stringA) {
      return -1;
    }
    if (stringB > stringA) {
      return 1;
    }
    return 0;
  },
  priceMax: (a, b) => {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  },
  priceMin: (a, b) => {
    if (b.price > a.price) {
      return -1;
    }
    if (b.price < a.price) {
      return 1;
    }
    return 0;
  },
  score: (a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  },
};

export const sortProducts = (data, sortBy) => {
  let updatedData = [...data];

  if (sortBy === "titleA") {
    updatedData.sort(SortFunctions.titleA);
  }

  if (sortBy === "titleZ") {
    updatedData.sort(SortFunctions.titleZ);
  }

  if (sortBy === "priceMin") {
    updatedData.sort(SortFunctions.priceMin);
  }

  if (sortBy === "priceMax") {
    updatedData.sort(SortFunctions.priceMax);
  }

  if (sortBy === "score") {
    updatedData.sort(SortFunctions.score);
  }

  return updatedData;
};

export default sortProducts;

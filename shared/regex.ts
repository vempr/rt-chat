export const passwordRegex = new RegExp(
  /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,50}$/u
);

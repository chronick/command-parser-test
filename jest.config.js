export default {
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "src/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["node_modules"],
};

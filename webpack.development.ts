import common from "./webpack.common";

import merge from "webpack-merge";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";

export default merge(common, {
  watchOptions: {
    poll: true
  },
  watch: true,
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  output: {
    filename: '[name].bundle.js',
    // I couldn't figure out how to get Spring Boot or Intellij to deploy changed webpack bundles instantaneously
    // so we just have webpack deploy directly into the build folder here.
    path: path.resolve(__dirname, 'src/assets/bundles')
  },
  stats: {
    errorDetails: true
  }
});
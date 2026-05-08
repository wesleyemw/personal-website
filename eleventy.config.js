import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // configure image plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
  });
  // copy assets folder to dist/assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // current year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  dir: {
    input: "src",
    output: "dist",
  },
};

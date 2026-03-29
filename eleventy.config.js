import { I18nPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // set default language
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en",
  });
  // configure image plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
  });
  // copy assets folder to dist/assets
  eleventyConfig.addPassthroughCopy("src/assets");
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

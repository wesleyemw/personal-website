import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";

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

  //watch css changes
  eleventyConfig.addWatchTarget("./assets/css/");

  // rss plugin configuration
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.LL.dd");
  });
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

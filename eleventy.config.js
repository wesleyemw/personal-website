import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import { IdAttributePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // markdown it
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };
  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", markdownLib);

  // add attributes id to headers
  eleventyConfig.addPlugin(IdAttributePlugin);

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

  // format date to YY.MM.DD
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.LL.dd");
  });

  // exclude filter
  //https://cri.dev/posts/2024-09-21-how-to-exclude-tags-collection-filter-eleventy/
  eleventyConfig.addFilter("exclude", (arr, exclude) =>
    arr.filter((el) => el !== exclude),
  );

  // add a limit filter to an array
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // add draft - set 'draft: true' anywhere on data cascade
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
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

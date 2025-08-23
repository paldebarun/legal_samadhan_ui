/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL ,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.8,
    exclude: ["/admin/*", "/private/*"],
    robotsTxtOptions: {
      additionalSitemaps: [
        `${process.env.SITE_URL}/sitemap.xml`,
      ],
    },
  };

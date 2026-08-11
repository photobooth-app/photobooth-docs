import { defineConfig, HeadConfig } from "vitepress";
import lightbox from "vitepress-plugin-lightbox";

// Replace with your actual Matomo Domain and Site ID
const MATOMO_URL = "matmo.mgineer85.de";
const SITE_ID = "2";

const matomoScript: HeadConfig[] = [
    [
        "script",
        {},
        `
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="https://${MATOMO_URL}/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '${SITE_ID}']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    `,
    ],
];
// Only inject the script during production builds
const isProd = process.env.NODE_ENV === "production";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: "docs",
    cleanUrls: true,
    head: isProd ? matomoScript : [],
    title: "Photobooth-App",
    description: "Photobooth-App: Open-source, perfect for your DIY build!",
    markdown: {
        config: (md) => {
            md.use(lightbox, {});
        },
    },
    ignoreDeadLinks: [
        // ignore all localhost links
        /^https?:\/\/localhost/,
    ],
    // ignoreDeadLinks: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/assets/logo-notext-blue-transparent.png",
        search: { provider: "local" },
        nav: [
            { text: "Introduction", link: "/introduction" },

            { text: "Setup", link: "/setup/" },

            { text: "Wigglecam", link: "/wigglegramcamera/" },

            {
                text: "More",
                items: [
                    { text: "Reference", link: "/reference/" },
                    { text: "Extras", link: "/extras/" },
                    {
                        text: "3D Printed Photobooth",
                        link: "/3dprintedphotobooth/",
                    },
                    { text: "Help", link: "/help/" },
                ],
            },
        ],

        sidebar: {
            "/introduction/": [
                { text: "Introduction", link: "/introduction" },
                { text: "Feature Comparison", link: "/introduction/features" },
                { text: "Projects", link: "/introduction/projects" },
                { text: "Screenshots", link: "/introduction/screenshots" },
            ],
            "/setup/": [
                { text: "Setup", link: "/setup/" },
                { text: "Installation", link: "/setup/installation" },
                { text: "Update", link: "/setup/update" },
                {
                    text: "Configuration",
                    collapsed: false,
                    items: [
                        {
                            text: "Admin Center",
                            link: "/setup/configuration/admincenter",
                        },
                        {
                            text: "Camera Setup",
                            link: "/setup/configuration/camera_setup",
                        },
                        {
                            text: "Actions",
                            link: "/setup/configuration/actions",
                        },
                        {
                            text: "Media Processing",
                            link: "/setup/configuration/mediaprocessing",
                        },
                        {
                            text: "Synchronize",
                            link: "/setup/configuration/synchronize",
                        },
                        {
                            text: "Synchronize Legacy",
                            link: "/setup/configuration/synchronizelegacy",
                        },
                        {
                            text: "QR Share Service",
                            link: "/setup/configuration/qrshareservice",
                        },
                        {
                            text: "Share & Print",
                            link: "/setup/configuration/share_print",
                        },
                        { text: "GPIO", link: "/setup/configuration/gpio" },
                        {
                            text: "Commander",
                            link: "/setup/configuration/commander",
                        },
                    ],
                },
            ],

            "/reference/": [
                { text: "Reference", link: "/reference/" },
                { text: "Landing Pages", link: "/reference/landingpages" },
                { text: "Data Storage", link: "/reference/datastorage" },
                { text: "Customize Theme", link: "/reference/customizetheme" },
                {
                    text: "Bulk Transfer Files",
                    link: "/reference/bulktransferfiles",
                },
                { text: "API", link: "/reference/api" },
                { text: "Plugins", link: "/reference/plugins" },
            ],

            "/extras/": [
                { text: "Extras", link: "/extras/" },
                { text: "Buzzer", link: "/extras/buzzer" },
                { text: "UPS", link: "/extras/ups" },
                { text: "Printer Example", link: "/extras/printerexample" },
                { text: "WLED", link: "/extras/wled" },
            ],

            "/wigglegramcamera/": [
                { text: "Wigglegram Camera", link: "/wigglegramcamera/" },
                { text: "Wigglegrams", link: "/wigglegramcamera/wigglegrams" },
                { text: "How to Start", link: "/wigglegramcamera/howtostart" },
                { text: "Build", link: "/wigglegramcamera/build" },
                {
                    text: "Install Nodes",
                    link: "/wigglegramcamera/install-nodes",
                },
                {
                    text: "Setup Photobooth",
                    link: "/wigglegramcamera/setup-photobooth",
                },
                {
                    text: "Troubleshooting",
                    link: "/wigglegramcamera/troubleshooting",
                },
            ],

            "/3dprintedphotobooth/": [
                {
                    text: "3D Printed Photobooth",
                    link: "/3dprintedphotobooth/",
                },
                {
                    text: "Designs",
                    items: [
                        {
                            text: "2024 7–10 inch Picamera/DSLR",
                            link: "/3dprintedphotobooth/designs/2024_7-10inch_picamera-dslr/",
                        },
                        {
                            text: "2026 10 inch Wigglecam",
                            link: "/3dprintedphotobooth/designs/2026_10inch_wigglecam/",
                        },
                    ],
                },
            ],

            "/help/": [
                { text: "Help", link: "/help/" },
                { text: "Troubleshooting", link: "/help/troubleshooting" },
                { text: "FAQ", link: "/help/faq" },
            ],
        },

        footer: {
            message: "2026 - Crafted with care in the EU.",
            copyright: "Donate via PayPal",
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/photobooth-app/photobooth-app",
            },
        ],
    },
});

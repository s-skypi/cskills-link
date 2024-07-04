module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: "url",
      plugin: "cskills-link",
      type: "string",
      inputSize: {
        // optional
        default: 4,
        isResizable: true,
      },
    });
    
  },
};


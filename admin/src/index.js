// @ts-nocheck
import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import LinkIcon from './components/LinkIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: 'url',
      pluginId: 'cskills-link',
      type: 'string', // storing as a string
      intlLabel: {
        id: 'cskills-link.url.label',
        defaultMessage: 'Link',
      },
      intlDescription: {
        id: 'cskills-link.url.description',
        defaultMessage: 'Enter a valid URL and Link Text',
      },
      icon: LinkIcon,
      components: {
        Input: async () => import(
          /* webpackChunkName: "input-component" */ "./components/LinkInput"
        ),
      },
      options: {
        // declare options here if needed
      },
    });
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginPkg.strapi.name),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

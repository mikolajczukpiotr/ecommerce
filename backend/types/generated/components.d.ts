import type { Schema, Attribute } from '@strapi/strapi';

export interface AvailableSizesAvailableSizes extends Schema.Component {
  collectionName: 'components_available_sizes_available_sizes';
  info: {
    displayName: 'availableSizes';
  };
  attributes: {
    ExtraSmall: Attribute.Integer;
    Small: Attribute.Integer;
    Medium: Attribute.Integer;
    Large: Attribute.Integer;
    ExtraLarge: Attribute.Integer;
  };
}

export interface ColorColor extends Schema.Component {
  collectionName: 'components_color_colors';
  info: {
    displayName: 'color';
  };
  attributes: {
    red: Attribute.Boolean;
    green: Attribute.Boolean;
    black: Attribute.Boolean;
    blue: Attribute.Boolean;
    yellow: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'available-sizes.available-sizes': AvailableSizesAvailableSizes;
      'color.color': ColorColor;
    }
  }
}

import React from 'react';
import BehindTheDoorsPortfolio from './BehindTheDoorsPortfolio';

/**
 * DoorsTheme
 * Behind The Doors (3D architectural exhibition portfolio).
 * Backwards and forwards compatible adapter wrapping <BehindTheDoorsPortfolio />.
 */
export default function DoorsTheme({ portfolio, data, isPreview = false }) {
  const activeData = portfolio || data;
  return <BehindTheDoorsPortfolio data={activeData} isPreview={isPreview} />;
}

import React from 'react';
import BingeSeriesPortfolio from './BingeSeriesPortfolio';

/**
 * BingeTheme
 * The Binge Series (Netflix-inspired cinematic streaming portfolio).
 * Backwards and forwards compatible adapter wrapping <BingeSeriesPortfolio />.
 */
export default function BingeTheme({ portfolio, data, isPreview = false }) {
  const activeData = portfolio || data;
  return <BingeSeriesPortfolio data={activeData} isPreview={isPreview} />;
}

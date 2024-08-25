'use client';

import RefinementList from './refinement-list';

export default function Filters() {
  return (
    <>
      <div className="text-lg font-semibold tracking-tight underline">
        Filters
      </div>

      <RefinementList attribute="category" />

      <RefinementList attribute="price" />

      <RefinementList attribute="priceUnit" />

      <RefinementList attribute="priceTimespan" />

      <RefinementList attribute="isOnline" />

      <RefinementList attribute="deliveryTime" />

      <RefinementList attribute="deliveryTimespan" />
    </>
  );
}

export const slugGenerator = (listing) => {
  const parts = [];

  if (listing?.StreetNumber) {
    parts.push(listing.StreetNumber);
  }

  if (listing?.StreetName) {
    const streetName = listing.StreetName.trim().replace(/ /g, "-");
    parts.push(streetName);
  }

  if (listing?.StreetSuffix) {
    parts.push(listing.StreetSuffix);
  }

  if (listing?.ListingKey) {
    parts.push(listing.ListingKey);
  }

  return parts.filter(Boolean).join("-");
};

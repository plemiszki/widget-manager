export const getCsrfToken = () => {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute("content");
  } else {
    return null;
  }
};

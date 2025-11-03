export function showError(container, message) {
  if (!(container instanceof Element)) {
    throw new TypeError("The provided container arg must be of type Element");
  }
  const error = document.createElement("div");
  error.className = "error-msg";
  error.textContent = message;
  container.appendChild(error);
}

export function showLoading(container) {
  if (!(container instanceof Element)) {
    throw new TypeError("The provided container arg must be of type Element");
  }
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Loading...";
  container.appendChild(loader);
}
export function hideLoading(container) {
  if (!(container instanceof Element)) {
    throw new TypeError("The provided container arg must be of type Element");
  }
  const loader = container.querySelector(".loader");
  if (loader) {
    container.removeChild(loader);
  }
}

export function clearContainer(container) {
  if (!(container instanceof Element)) {
    throw new TypeError("The provided container arg must be of type Element");
  }
  const header = container.querySelector("header");
  container.innerHTML = "";
  // Clear everything except headers
  if (header) {
    container.appendChild(header);
  }
}

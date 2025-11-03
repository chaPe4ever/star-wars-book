export function createCard({
  title,
  contentInnerHTML,
  btnText,
  onBtnClickCb,
  isTogglable = true,
  isExpanded = false,
}) {
  // Create the card container
  const card = document.createElement("div");
  card.className = "card-container";

  // Create the title
  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.textContent = title;
  card.appendChild(cardTitle);

  // Create the content conditionally
  if (contentInnerHTML) {
    const content = document.createElement("div");
    content.className = "card-content";
    content.style.display = isExpanded ? "block" : "none";
    content.innerHTML = contentInnerHTML;
    card.appendChild(content);

    // Add click event to toggle content
    if (isTogglable) {
      card.addEventListener("click", function () {
        if (content.style.display === "none") {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    }
  }

  // Create the button conditionally
  if (btnText) {
    const btn = document.createElement("button");
    btn.className = "card-btn";
    btn.textContent = btnText;
    card.appendChild(btn);

    btn.addEventListener("click", function (e) {
      // Stop bubbling up the event
      e.stopPropagation();
      onBtnClickCb(card);
      card.className;
    });
  }

  // Return the card element
  return card;
}

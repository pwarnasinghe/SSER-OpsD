// Show/hide a site's details panel
function toggleDetails(id) {
  const details = document.getElementById(id);
  if (!details) return;
  const isHidden = details.style.display === "none" || details.style.display === "";
  details.style.display = isHidden ? "block" : "none";
}

// Open the default email client with pre-filled fields
function sendEmail(recipients, subject, body) {
  const cc = "onshore.ops.planning@sse.com"; // default CC
  const mailtoLink = "mailto:" + recipients +
    "?cc=" + encodeURIComponent(cc) +
    "&subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
  window.location.href = mailtoLink;
}

// Make Enter key toggle the currently focused card (basic a11y)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('site-box')) {
    // expect a child details element with id on click handlers
    const details = e.target.querySelector('.site-details');
    if (details && details.id) toggleDetails(details.id);
  }
});

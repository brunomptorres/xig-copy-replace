const preferredDomains = {
  instagram: "instafix.zzinstagram.com",
  twitter: "fxtwitter.com",
};
function modifyClipboard(event) {
  event.preventDefault();

  let clipboardText = window.getSelection().toString();

  if (clipboardText === "") {
    clipboardText = window.location.href;
    if (
      !clipboardText.match(/(instagram|x|twitter)\.com\/.{4,15}\/status\/\d+/)
    ) {
      return;
    }
  }

  let modifiedText;

  if (clipboardText.includes("instagram.com")) {
    modifiedText = clipboardText
      .replace(/((?:www)\.)?(?:instagram)\.com/g, preferredDomains.instagram)
      .replace(/\?.*$/, "");
  }

  if (
    clipboardText.includes("x.com") ||
    clipboardText.includes("twitter.com")
  ) {
    modifiedText = clipboardText
      .replace(/(?:twitter|x)\.com/g, preferredDomains.twitter)
      .replace(/\?.*$/, "");
  }

  const finalClipboardText = modifiedText ?? clipboardText;

  navigator.clipboard
    .writeText(finalClipboardText)
    .then(() => {
      console.log("Successfully modified clipboard: " + finalClipboardText);
    })
    .catch((error) => {
      console.error("Failed to modify clipboard: " + error);
    });
}

document.addEventListener("copy", modifyClipboard);

export default function reportError(error: Error, currentUser?: any) {
  const { message, stack } = error;
  const hookUrl = process.env.ERROR_REPORTING_WEBHOOK;
  if (hookUrl) {
    const content = JSON.stringify(
      {
        user: currentUser?.email || "GUEST",
        userFullName: currentUser?.name || "GUEST",
        error,
        message,
        stack,
        url: window?.location,
      },
      null,
      2
    );

    const fd = new FormData();
    fd.append("content", "App crash notification");
    fd.append(
      "file",
      new Blob([content], { type: "text/plain" }),
      "log-" + Date.now() + ".json"
    );

    fetch(hookUrl, {
      method: "POST",
      body: fd,
    });
  }
}

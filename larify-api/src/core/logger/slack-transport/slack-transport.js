export default async function (opts) {
  const { webhookUrl } = opts;

  return async function (log) {
    try {
      const payload = {
        text: `🚨🚨 *ERROR:* \n\`\`\`${log.msg}\`\`\``,
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error('Error while sending slack message', e);
    }
  };
}

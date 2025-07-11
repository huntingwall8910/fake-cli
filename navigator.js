function safeMatch(regex, str) {
  const match = str.match(regex);
  return match ? match[1] : null;
}
export function navigatorInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  let browser = "Unknown";
  let browserVersion = "Unknown";
  const browserRegexes = [
    { name: "Edge", regex: /Edg\/([\d\.]+)/i },
    { name: "Opera", regex: /OPR\/([\d\.]+)/i },
    { name: "Chrome", regex: /Chrome\/([\d\.]+)/i },
    { name: "Safari", regex: /Version\/([\d\.]+).*Safari/i },
    { name: "Firefox", regex: /Firefox\/([\d\.]+)/i },
    { name: "IE", regex: /MSIE\s([\d\.]+);/i },
    { name: "IE", regex: /Trident\/.*rv:([\d\.]+)/i }
  ];
  for (const { name, regex } of browserRegexes) {
    const version = safeMatch(regex, ua);
    if (version) {
      browser = name;
      browserVersion = version;
      break;
    }
  }
  let os = "Unknown";
  let osVersion = "Unknown";
  const windowsVersions = {
    "10.0": "10",
    "6.3": "8.1",
    "6.2": "8",
    "6.1": "7",
    "6.0": "Vista",
    "5.1": "XP",
    "5.0": "2000"
  };
  if (/Windows NT ([\d\.]+)/i.test(ua)) {
    const version = ua.match(/Windows NT ([\d\.]+)/i)[1];
    os = "Windows";
    osVersion = windowsVersions[version] || version;
  } else if (/Mac OS X ([\d_]+)/i.test(ua)) {
    os = "Mac OS";
    osVersion = ua.match(/Mac OS X ([\d_]+)/i)[1].replace(/_/g, ".");
  } else if (/Android ([\d\.]+)/i.test(ua)) {
    os = "Android";
    osVersion = ua.match(/Android ([\d\.]+)/i)[1];
  } else if (/iPhone OS ([\d_]+)/i.test(ua)) {
    os = "iOS";
    osVersion = ua.match(/iPhone OS ([\d_]+)/i)[1].replace(/_/g, ".");
  } else if (/iPad.* OS ([\d_]+)/i.test(ua)) {
    os = "iOS";
    osVersion = ua.match(/iPad.* OS ([\d_]+)/i)[1].replace(/_/g, ".");
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }
  let deviceType = "Desktop";
  if (/Mobi|Android/i.test(ua)) {
    deviceType = "Mobile";
  } 
  if (/Tablet|iPad/i.test(ua)) {
    deviceType = "Tablet";
  }
  return {
    browser,
    browserVersion,
    os,
    osVersion,
    deviceType,
    userAgent: ua,
    platform,
    language,
    isTouch
  };
}

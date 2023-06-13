{
  let max = 0,
    curr = 0,
    entries = [];

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.hadRecentInput) continue;
      while (entries.length && entry.startTime - entries[0].startTime > 1000)
        curr -= entries.shift().value;
      entries.push(entry);
      curr += entry.value;
      max = Math.max(max, curr);
      console.log("Current MAX-sliding-1s value:", max, entry);
    }
  }).observe({ type: "layout-shift", buffered: true });
}

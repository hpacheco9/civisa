const filterUniqueEvents = (eventsArray) => {
    // Sort events by origin time in descending order (latest events first)
    eventsArray.sort(
      (a, b) =>
        new Date(b?.Origin?.[0]?.originTime?.[0] || 0) -
        new Date(a?.Origin?.[0]?.originTime?.[0] || 0)
    );
  
    // Filter out duplicate events based on originTime
    const uniqueEvents = eventsArray.filter((event, index, self) => {
      const eventTime = event?.Origin?.[0]?.originTime?.[0];
      return (
        eventTime &&
        index ===
          self.findIndex(
            (e) => e?.Origin?.[0]?.originTime?.[0] === eventTime
          )
      );
    });
  
    return uniqueEvents;
  };
  
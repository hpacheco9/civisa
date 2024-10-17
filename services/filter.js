export const filterUniqueEvents = (eventsArray) => {
    eventsArray.sort(
      (a, b) =>
        new Date(b.Origin[0].originTime[0]) - new Date(a.Origin[0].originTime[0])
    );

    const uniqueEvents = eventsArray.filter((event, index, self) => {
      const eventTime = event.Origin[0].originTime[0];
      return index === self.findIndex((e) => e.Origin[0].originTime[0] === eventTime);
    });

    return uniqueEvents;
  };
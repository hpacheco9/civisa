import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { parseString } from "react-native-xml2js";
import { filterUniqueEvents } from "../services/filter.js";
export const useLista = () => { 
  const [events, setEvents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchXmlData = async () => {
        try {
          const response = await axios.get(
            "https://www.ivar.azores.gov.pt/seismic/eventgroup.xml?1721035364517"
          );
          parseString(response.data, (err, result) => {
            if (err) {
              console.error("Error parsing XML:", err);
            } else {
              const eventsArray = result.EventGroup?.Event || [];
              
              const uniqueEvents = filterUniqueEvents(eventsArray);
              setEvents(uniqueEvents);
            }
          });
        } catch (error) {
          console.error("Error fetching XML:", error);
        }
      };

      fetchXmlData();
    }, [])
  );




  return { events };
};

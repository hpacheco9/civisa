import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const InfoContainer = ({
  date,
  time,
  region,
  mag,
  intensidade,
  regiao,
  bg,
  latitude,
  longitude,
  cords,
  iswhite,
}) => {
  const textColor = iswhite ? "#FFFFFF" : "#000000";
  const containerBackgroundColor = iswhite
    ? "rgba(0, 0, 0, 0.7)"
    : "rgba(255, 255, 255, 0.5)";

  return (
    <View
      style={[styles.container, { backgroundColor: containerBackgroundColor }]}
    >
      <View style={styles.info}>
        <View style={{ flexDirection: "row", marginBottom: "3%" }}>
          <Image
            source={
              iswhite
                ? require("../assets/cal_white.png")
                : require("../assets/cal.png")
            }
            style={{ width: 15, height: 15, marginRight: "3%" }}
          />
          <Text style={{ fontWeight: "bold", color: textColor }}>{date}</Text>
          <Image
            source={
              iswhite
                ? require("../assets/clock_white.png")
                : require("../assets/clock.png")
            }
            style={{
              width: 15,
              height: 15,
              marginRight: "3%",
              marginLeft: "5%",
            }}
          />
          <Text style={{ fontWeight: "bold", color: textColor }}>
            UTC {time}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "3%",
          }}
        >
          <Image
            source={
              iswhite
                ? require("../assets/marker_white.png")
                : require("../assets/marker.png")
            }
            style={{ width: 15, height: 15, marginRight: "3%" }}
          />
          <Text style={{ color: textColor }}>{region}</Text>
        </View>
        {cords && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "3%",
            }}
          >
            <Text
              style={{ color: textColor }}
            >{`${latitude} N ${longitude} W`}</Text>
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          {cords ? (
            <>
              <Image
                source={
                  iswhite
                    ? require("../assets/shake_white.png")
                    : require("../assets/shake.png")
                }
                style={{ width: 15, height: 15, marginRight: "3%" }}
              />
              <Text style={{ color: textColor }}>
                {intensidade.trim() !== "Não sentido"
                  ? `${intensidade.trim()}  -${regiao}`
                  : intensidade.trim()}
              </Text>
            </>
          ) : (
            intensidade.trim() !== "Não sentido" && (
              <>
                <Image
                  source={require("../assets/shake.png")}
                  style={{ width: 15, height: 15}}
                />
                <Text style={{ marginLeft: '2%',color: textColor, marginBottom: '3%'}}>{intensidade.trim()}</Text>
              </>
            )
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: bg,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "4%",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "black",
        }}
      >
        <Text style={styles.magnitude}>{mag}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '3%',
    borderWidth: 1,
    width: "95%",
    height: 100,
    borderRadius: 5,
  },
  magnitude: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  magContainer: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  info: {
    width: "75%",
    marginTop: "2%",
    marginRight: "5%",
    marginBottom: '2%'
  },
});

export default InfoContainer;

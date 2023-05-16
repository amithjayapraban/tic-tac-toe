import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert, Button } from "react-native";
import tw from "twrnc";
export default function App() {
  let init = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [arr, setArr] = useState(init);
  const [player, setPlayer] = useState(undefined);

  const handleStart = () => {
    setPlayer(true);
  };

  const handleReset = () => {
    setPlayer(undefined);
    setArr(init);
  };

  const handleClick = (e) => {
    if (player !== undefined) {
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      let p;
      player ? (p = "X") : (p = "O");
      let ar = arr;

      //setting values
      ar.map((r, i) => {
        if (i == e.i) {
          r.map((c, j) => {
            if (j == e.j) {
              // console.log(i, j);
              r.splice(j, 1, p);
            }
            return r;
          });
        }
      });
      setArr(ar);

      //checks horizontally
      var c = `Player ${player ? 1 : 2} won`;
      var flag = false;
      ar.map((r, i) => {
        let prev = ar[i][0];
        let won = true;
        r.map((c, j) => {
          if (c != prev || c == "") {
            won = false;
          }
        });

        if (won) {
          setArr(init);
          setPlayer(undefined);
          flag = true;
          Alert.alert(c);
        }
      });

      //checks vertitally
      for (let j = 0; j <= 2; j++) {
        var prev = ar[0][j];
        let won = true;
        for (let i = 0; i <= 2; i++) {
          // console.log(i);
          if (ar[i][j] != prev || ar[i][j] == "") {
            won = false;
          }
        }
        if (won) {
          setArr(init);
          setPlayer(undefined);
          flag = true;
          Alert.alert(c);
        }
      }

      //checks diagonally .ie from top left to bottom right
      {
        let won = true;
        for (let i = 1; i <= 2; i++) {
          let prev = ar[0][0];
          if (ar[i][i] != prev || ar[i][i] == "") {
            won = false;
          }
        }

        if (won) {
          setArr(init);
          setPlayer(undefined);
          flag = true;
          Alert.alert(c);
        }
      }

      //checks diagonally .ie from top right to bottom left
      {
        let won = true;
        let j = 1;
        for (let i = 1; i >= 0; i--) {
          let prev = ar[0][2];
          if (ar[j][i] != prev || ar[j][i] == "") {
            won = false;
          }
          j++;
        }
        if (won) {
          setArr(init);
          setPlayer(undefined);
          flag = true;
          Alert.alert(c);
        }
      }

      //set player only if flag is false
      !flag && setPlayer(!player);
    }
  };

  return (
    <View
      style={tw`App bg-amber-50 flex h-full gap-24 justify-center   items-center   `}
    >
      {player != undefined ? (
        <Text style={tw`text-gray-800 text-xl font-bold   `}>
          Player {player ? 1 : 2}'s turn{" "}
        </Text>
      ) : (
        <Text style={tw`opacity-0 text-xl`}>.</Text>
      )}

      <View style={tw`flex `}>
        {arr.map((r, i) => {
          {
            return (
              <View
                style={[
                  tw`flex flex-row border-gray-700 border-b-4 `,
                  i == 2 && tw`flex flex-row border-gray-700 border-b-0 `,
                ]}
                key={i}
              >
                {r?.map((c, j) => {
                  return (
                    <Pressable
                      style={[
                        tw` font-bold   text-gray-800  border-r-4   border-gray-700   font-bold hover:bg-cyan-200  px-4 w-28 h-28    justify-center flex items-center `,
                        j == 2 && tw`border-r-0 `,
                      ]}
                      data-btn
                      key={j}
                      onPress={() => {
                        handleClick({ i, j });
                      }}
                    >
                      <Text style={tw`text-gray-800 font-bold text-xl  `}>
                        {c}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          }
        })}
      </View>
      <View style={tw`flex items-center justify-center`}>
        {player == undefined ? (
          <Pressable
            style={tw`bg-cyan-200  border-4 text-gray-600  border-gray-800   hover:bg-cyan-200  w-32  rounded-3xl  py-4  inline-flex items-center `}
            onPress={()=>{
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
              handleStart()}}
          >
            <Text style={tw`  text-xl font-bold text-gray-800 `}>Start</Text>
          </Pressable>
        ) : (
          <Pressable
            style={tw`bg-orange-300 border-4 text-gray-600  border-gray-800   hover:bg-cyan-200  w-32 rounded-3xl  py-4  inline-flex items-center `}
            onPress={()=>{
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              )
              handleReset();}}
          >
            <Text style={tw`  text-xl font-bold text-gray-800 `}>Reset</Text>
          </Pressable>
        )}
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

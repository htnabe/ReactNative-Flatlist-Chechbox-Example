import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import d1_Data from "./assets/classData/教育.json";

export default function App() {
  const [data, setdata] = useState([]);
  const [isChecked, setisChecked] = useState(true);

  getListData = async () => {
    await d1_Data.forEach((value) => (value.checked = false));
    console.log("データにfalseを追加");
    setdata(d1_Data);
  };

  useEffect(() => {
    console.log("マウント時のみ実行");
    getListData();
  }, []);

  checkMark = (classId) => {
    const classIdNumber = data.findIndex((id) => id.時間割コード == classId);
    let newData = data;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setdata(newData);
    setisChecked(!isChecked);
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.wrapText}>
        <Text>{item.科目}</Text>
        <CheckBox
          checked={item.checked}
          onPress={() => checkMark(item.時間割コード)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.時間割コード}
            style={styles.list}
            extraData={isChecked}
          />
          <View style={styles.wrapButton}>
            <TouchableOpacity style={styles.button}>
              <Text>Show item you selected</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    padding: 8,
  },
  wrapButton: {
    width: "100 %",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 16,
    backgroundColor: "orange",
  },
  item: {
    flexDirection: "row",
    marginTop: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  wrapText: {
    flex: 1,
    marginTop: 16,
    marginLeft: 8,
  },
});

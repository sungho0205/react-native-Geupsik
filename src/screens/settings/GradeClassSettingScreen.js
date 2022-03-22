import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { KEYS, useAsyncStorage } from "../../hooks/asyncStorage";

function GradeClassSettingScreen(props) {
  const [classN, setClassN] = useState("1");
  const [grade, setGrade] = useState("1");
  const [classCount, setClassCount] = useState("");
  const [data, setData] = useState();
  const [classArray, setClassArray] = useState(new Array());
  const colors = useTheme();

  const gradeAS = useAsyncStorage(KEYS.GRADE);
  const classAS = useAsyncStorage(KEYS.CLASS);

  function setGradeClass(classN, grade) {
    gradeAS.setValue(grade);
    classAS.setValue(classN);
  }

  const styles = StyleSheet.create({
    container: { flex: 1 },
    text: {
      textAlign: "center",
      fontSize: 20,
      marginTop: 10,
      color: colors.colors.text
    }
  });

  useEffect(() => {
    fetch(
      `https://open.neis.go.kr/hub/classInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${
        props.route.params.schoolCode
      }&AY=${new Date().getFullYear()}&GRADE=${grade * 1}&type=json`
    )
      .then((response) => response.json())
      .then((json) => {
        setClassCount(json.classInfo[0].head[0].list_total_count);
        setData(json.classInfo[1].row);
        let n = 1;
        let classArray = new Array();
        while (n <= json.classInfo[0].head[0].list_total_count * 1) {
          classArray = classArray.concat(n);
          n++;
        }
        setClassArray(classArray);
      })
      .catch((error) => {
        console.warn(error);
        setGradeClass("undefined", "undefined");
      });
  }, [grade]);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>학년</Text>
        {(props.route.params.schoolForm === "초등학교" && (
          <Picker
            style={{}}
            selectedValue={grade}
            onValueChange={(itemValue, itemIndex) => {
              setGrade(itemValue);
            }}
            dropdownIconColor={colors.colors.text}
            itemStyle={{ color: colors.colors.text }}
          >
            <Picker.Item
              value="1"
              label={"1"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="2"
              label={"2"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="3"
              label={"3"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="4"
              label={"4"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="5"
              label={"5"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="6"
              label={"6"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
          </Picker>
        )) || (
          <Picker
            selectedValue={grade}
            onValueChange={(itemValue, itemIndex) => {
              setGrade(itemValue);
            }}
            dropdownIconColor={colors.colors.text}
            itemStyle={{ color: colors.colors.text }}
          >
            <Picker.Item
              value="1"
              label={"1"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="2"
              label={"2"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
            <Picker.Item
              value="3"
              label={"3"}
              style={{
                color: colors.colors.text,
                backgroundColor: colors.colors.background
              }}
            />
          </Picker>
        )}
        <Divider />
        <Text style={styles.text}>반</Text>
        <Picker
          dropdownIconColor={colors.colors.text}
          itemStyle={{ color: colors.colors.text }}
          selectedValue={classN}
          onValueChange={(itemValue, itemIndex) => {
            setClassN(itemValue);
            setGradeClass(itemValue, grade);
          }}
        >
          {classArray.map((className) => {
            return (
              <Picker.Item
                value={`${className}`}
                label={`${className}`}
                style={{
                  color: colors.colors.text,
                  backgroundColor: colors.colors.background
                }}
              />
            );
          })}
        </Picker>
      </View>
      <Button
        title={"설정 완료"}
        onPress={() => {
          props.navigation.goBack();
          props.navigation.goBack();
        }}
      />
    </ScrollView>
  );
}

export default GradeClassSettingScreen;

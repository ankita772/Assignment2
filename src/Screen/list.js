import React, { useEffect, useState, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../Utill/metrics";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  WHITE,
  PRIMARY_COLOR,
  BLACK,
  randomKeyGenarator,
} from "../Utill/common";
import AntdIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { getAllComments, getFirstHundredComments } from "../Request";

const List = () => {
  const [dropdownList, setDropdownList] = useState({
    comments: [],
    postId: [],
  });

  const [filterStatus, setFilterStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCommentList, setAllCommentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (!filterStatus) {
      getComments();
      getHundredComments();
    }
  }, [filterStatus]);

  useEffect(() => {
    setFilteredList(allCommentList);
  }, [allCommentList]);

  //get 500 comments
  const getComments = async () => {
    try {
      setLoading(true);
      const response = await getAllComments();
      if (response.status == 200) {
        setAllCommentList(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get 100 comments
  const getHundredComments = async () => {
    try {
      const response = await getFirstHundredComments();
      if (response.status == 200) {
        getFirstCommentOfEachPost(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //store first comment of each post
  const getFirstCommentOfEachPost = (response) => {
    response.map((item) => {
      if (!dropdownList.postId.includes(item.postId)) {
        dropdownList.postId.push(item.postId);
        dropdownList.comments.push(item.name);
      }
    });
  };

  //filter
  const handleFilter = (postId) => {
    setFilterStatus(true);
    const list = allCommentList.filter((item) => {
      if (item?.postId == postId) {
        return item;
      }
    });
    setFilteredList(list);
  };

  return (
    <>
      <View style={styles.container}>
        {filterStatus ? (
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => {
              setFilterStatus(false);
              //   setFilteredList(allCommentList);
            }}
          >
            <EntypoIcon name="cross" color={WHITE} size={20} />
            <Text style={{ color: WHITE }}>Remove Filter</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <SelectDropdown
          defaultButtonText={"Select Post..."}
          data={dropdownList.comments}
          onSelect={(selectedItem, index) => {
            handleFilter(dropdownList.postId[index]);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          renderDropdownIcon={() => (
            <AntdIcon name="down" color={"#666"} size={moderateScale(18)} />
          )}
          buttonStyle={styles.inputBox}
          buttonTextStyle={styles.inputBoxText}
          dropdownStyle={styles.dropdown}
          rowStyle={{ width: "100%" }}
          rowTextStyle={{ textAlign: "left" }}
          selectedRowTextStyle={{ color: PRIMARY_COLOR }}
        />

        <View>
          <Text style={styles.heading}>All Comments :</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <ActivityIndicator
                animating={loading}
                size={"large"}
                color={PRIMARY_COLOR}
                style={styles.loader}
              />
            ) : (
              filteredList?.map((item) => (
                <View style={styles.commentView} key={randomKeyGenarator()}>
                  <Avatar.Image
                    source={require("../../assets/comment.jpeg")}
                    size={45}
                  />

                  <Text style={styles.comment}>{item.name}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: verticalScale(50),
    paddingHorizontal: horizontalScale(15),
  },
  inputBox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BLACK,
    marginVertical: verticalScale(10),
  },
  inputBoxText: {
    textAlign: "left",
    fontSize: moderateScale(14),
    color: BLACK,
  },
  dropdown: {
    height: verticalScale(500),
    borderRadius: 25,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    marginVertical: verticalScale(20),
    color: BLACK,
  },
  commentView: {
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    marginVertical: verticalScale(5),
  },
  comment: {
    width: "80%",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(18),
    color: "#666",
    textAlign: "left",
  },
  loader: { marginTop: verticalScale(200) },
  removeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 25,
    flexDirection: "row",
  },
});

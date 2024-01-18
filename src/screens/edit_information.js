import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/header';
import {Brush2, Image} from 'iconsax-react-native';
import styles from '../styles/screen/edit_information_style';
import colors from '../styles/colors';
import font from '../styles/font';
const EditInformationScreen = ({navigation, route}) => {
  const {userInfor} = route.params;
  const [name, setName] = useState(userInfor.name);
  const [date, setDate] = useState(userInfor.date);
  const [sex, setSex] = useState(userInfor.sex);
  const [editName, setEditName] = useState(false);
  const [editDate, setEditDate] = useState(false);
  return (
    <View>
      <Header
        goBack={() => navigation.goBack()}
        title={'Chỉnh sửa thông tin'}
        isBack={true}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {/* Image box */}
        <View style={styles.imageBox}>
          {userInfor.imageUrl === null ? (
            <View style={styles.nullAvatar} />
          ) : (
            <Image
              style={styles.image}
              source={userInfor.imageUrl}
              resizeMode="stretch"
            />
          )}
        </View>
        {/* User information */}
        <View style={{width: '60%'}}>
          {/* User name */}
          <View style={styles.inputFlex}>
            <TextInput
              style={styles.input}
              editable={editName}
              onChangeText={text => setName(text)}
              value={name}
            />
            <Pressable onPress={() => setEditName(!editName)}>
              <Brush2 color={colors.arrow} />
            </Pressable>
          </View>
          {/* Date */}
          <View style={styles.inputFlex}>
            <TextInput
              style={styles.input}
              editable={editDate}
              onChangeText={text => setDate(text)}
              value={date}
            />
            <Pressable onPress={() => setEditDate(!editDate)}>
              <Brush2 color={colors.arrow} />
            </Pressable>
          </View>
          {/* Sex */}
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => setSex(true)}
                style={sex === true ? styles.sexButtonActive : styles.sexButton}
              />
              <Text style={font.sencond}>Nam</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => setSex(false)}
                style={
                  sex === false ? styles.sexButtonActive : styles.sexButton
                }
              />
              <Text style={font.sencond}>Nữ</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() =>
          navigation.goBack({
            userInfor: {
              name: name,
              date: date,
              sex: sex,
            },
          })
        }
        style={styles.button}>
        <Text style={font.primary}>LƯU</Text>
      </Pressable>
    </View>
  );
};

export default EditInformationScreen;

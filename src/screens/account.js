/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import React, { useState } from "react";
import PersonInfor from "./bottomInfo/PersonInfor";
import { Brush2 } from 'iconsax-react-native';
const Accoumt = () => {
  const [gioiTinh, setGioiTinh] = useState('Name')
  const [ngaySinh, setNgaySinh] = useState('06/10/2002');
  const [soDienthoai, setSoDienThoai] = useState('0966345012');
  const [image, setImage] = useState(require('../assets/hinhnen.jpeg'));
  const [isModelVisit, setIsModelVisit] = useState('false');
  const handleModel = () => {
    setIsModelVisit(!isModelVisit);//so sanh voi cái ban đầu
  }


  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column ",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          flexDirection: "column ",
          alignItems: 'center'

        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            borderWidth: 1,
            position: "relative",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", resizeMode: 'stretch' }}
            source={require("../assets/avata.jpg")}
          />
          <View style={{
            position: 'absolute', bottom: 40,
            left: 20, flexDirection: 'row', justifyContent: "center", alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: 'yellow',

              }}
            >
              <Image
                style={{ width: 62, height: 62, borderRadius: 100 }}

                source={image}
              />

            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: 'white', marginLeft: 15, fontWeight: '900', color: 'white' }}>Thanh Luu</Text>
          </View>
        </View>
        <Modal
          visible={isModelVisit}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              {/* Form chỉnh sửa thông tin cá nhân */}
              <TextInput onChangeText={(text) => setGioiTinh(text)} placeholder="Name" style={{ marginBottom: 10, borderBottomWidth: 1 }} />
              <TextInput onChangeText={(text) => setNgaySinh(text)} placeholder="Birthday" style={{ marginBottom: 10, borderBottomWidth: 1 }} />
              <TextInput onChangeText={(text) => setSoDienThoai(text)} placeholder="Gender" style={{ marginBottom: 10, borderBottomWidth: 1 }} />

              <Button title="Lưu thông tin" onPress={handleModel} />
            </View>
          </View>
        </Modal>


        {/* Thong tin ca nha */}

        <View style={{ width: '90%', }}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: '700', marginTop: 10 }}>Thông tin cá nhân</Text>
          <PersonInfor infor="Giới tính" infor2={gioiTinh} />
          <PersonInfor infor="Ngày sinh" infor2={ngaySinh} />
          <PersonInfor infor="Điện thoại" infor2={soDienthoai} style={{ borderBottomColor: 'white' }} />

          <TouchableOpacity onPress={handleModel} style={{ flexDirection: 'row', width: '100%', height: 40, backgroundColor: '#C0C0C0', borderRadius: 15, marginTop: 30, justifyContent: 'center', alignItems: 'center', }}>
            <Brush2 size="32" color="#000000" />
            <Text style={{ color: 'black', fontWeight: '800', marginLeft: 6 }}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>







      </View>
    </View>
  );
};

export default Accoumt;

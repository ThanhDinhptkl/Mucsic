import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginWithPhone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại.');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP ngẫu nhiên (6 chữ số)

    Alert.alert(
      'Thông báo',
      `Mã OTP đã được gửi đến số ${phoneNumber}. Mã giả lập: ${otp}`, // Hiển thị mã OTP giả lập
    );

    // Điều hướng tới màn hình OTP, truyền mã OTP và số điện thoại
    navigation.navigate('OTPVerification', { phone: phoneNumber, otp });
  };

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Đăng nhập bằng số điện thoại</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
        <Ionicons name="call-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    fontSize: 18,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
    width: '90%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default LoginWithPhone;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input, Button } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from '@firebase/auth';
import { TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Theme from '../../shared/themes/theme';

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const auth = getAuth();
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Correo y contraseña obligatorios.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      await sendEmailVerification(auth.currentUser!);
      navigation.navigate('sign-in');
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  let emailInput: TextInput | null;
  let passwordInput: TextInput | null;
  let confirmPasswordInput: TextInput | null;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <View style={[styles.container, { backgroundColor: Theme.theme.backgroundPrimary }]}>
      <Text style={[styles.titleSection, { color: Theme.theme.colorPrimary }]}>Registrarse</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
      <View style={styles.iconBgContainer}>
        <Image source={Theme.theme.imgBackground} />
      </View>

      <View style={styles.controls}>
        <TouchableWithoutFeedback onPress={() => { emailInput?.focus() }}>
          <View style={[styles.control, { backgroundColor: Theme.theme.cardPrimary }]}>
          <Icon name="mail-outline" size={30} style={[styles.icon, {color:Theme.theme.colorPrimary}]} />
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: Theme.theme.colorPrimary }]}>Correo</Text>
              <TextInput
                ref={input => { emailInput = input }}
                style={[styles.input, { color: Theme.theme.colorPrimary }]}
                autoComplete="email"
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { passwordInput?.focus() }}>
          <View style={[styles.control, { backgroundColor: Theme.theme.cardPrimary }]}>
          <Icon name="key-outline" size={30} style={[styles.icon, {color:Theme.theme.colorPrimary}]} />
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: Theme.theme.colorPrimary }]}>Contraseña</Text>
              <TextInput
                ref={input => { passwordInput = input }}
                style={[styles.input, { color: Theme.theme.colorPrimary }]}
                value={value.password}
                secureTextEntry={!showPassword}
                onChangeText={(text) => setValue({ ...value, password: text })}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={30} style={{ ...styles.icon, ...styles.eyeIcon }} />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback onPress={() => { confirmPasswordInput?.focus() }}>
            <View style={styles.control}>
              <Icon name="key-outline" size={30} style={styles.icon} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar contraseña</Text>
                <TextInput
                  ref={input => { confirmPasswordInput = input }}
                  style={styles.input}
                  value={value.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
                />
              </View>
              <TouchableWithoutFeedback onPress={() => setShowPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={30} style={{ ...styles.icon, ...styles.eyeIcon }} />
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback> */}
        <View style={styles.options}>
          <Button buttonStyle={styles.googleButton}
            icon={<Icon name="logo-google" size={30} color="#EBEBEB" />}>
          </Button>
          <Button title="Registrarme" iconRight={true} icon={<Icon name="arrow-forward-sharp" size={30} color="#EBEBEB" style={styles.signinIcon} />}
            buttonStyle={styles.signinButton} onPress={signUp} />
        </View>
        <View style={styles.footer}>
          <Text style={[styles.infoText, { color: Theme.theme.colorPrimary }]}>¿Ya tienens una cuenta?</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('sign-in')}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableWithoutFeedback>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  icon: {
    marginRight: 10,
  },
  signinIcon: {
    marginLeft: 20,
  },
  eyeIcon: {
    color: '#0BA66E',
    marginLeft: 'auto',
  },
  controls: {
    marginTop: 20
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 20,
  },
  inputContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
  },
  input: {
    fontSize: 18,
    marginBottom: 5,
  },
  googleButton: {
    backgroundColor: '#EA4335',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  signinButton: {
    backgroundColor: '#0085FF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 10
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0085FF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    marginTop: '60%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 20,
  },
  iconBgContainer: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  error: {
    backgroundColor: '#f00',
    padding: 10,
    marginBottom: 10
  }
});

export default SignUpScreen;
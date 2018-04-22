import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  StatusBar
} from 'react-native';
import { H1, H2, H3, H4 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './Capture'
import { LogoTitle } from '../Comments/Comment'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import { getOwnerID } from '../../store/auth'
import uploadImageFiles from '../../api/upload'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
import { sendCreatePost } from '../../api/post'
const { height, width } = Dimensions.get('window')

const DoUpload = async (imgs) => {
  let fileInfo = await uploadImageFiles(imgs)
  return fileInfo
}

class ModalInside extends PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    text: '',
    isVisibleModal: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle text={"Create New".toUpperCase()}
        style={{ color: "#aaa" }} />,
      headerLeft: (
        <Button onPress={() => navigation.goBack()}>
          <MaterialIcons name="label" size={45}
            style={{ transform: [{ rotate: '180deg' }] }}
            color="#ddd" />
        </Button>
      )
    }
  }
  async CreatePost() {
    Keyboard.dismiss()
    await this.setState({ isVisibleModal: true })
    let { sender } = this.props.navigation.state.params
    let imagesInfo = await DoUpload(sender)
    let tagDefault = ['test', 'auto']
    let uid = this.props.uid
    let formOk = await sendCreatePost({
      tags: tagDefault,
      medias: imagesInfo,
      uid: uid,
      content: this.state.text
    })
    this.props.navigation.navigate('Feeds')
    this.setState({ isVisibleModal: false })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={[{ height: 0.27 * height, borderColor: '#ccc', borderWidth: 1 }]}>
          <TextInput
            style={{
              height: 0.27 * height, width: '98%',
              marginHorizontal: 0.02 * width, fontSize: 14
            }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            multiline={true}
            returnKeyType={'done'}
            enablesReturnKeyAutomatically={true}
            placeholder={"Enter your caption"}>
          </TextInput>
        </View>
        <View style={[flexCenter, {
          height: 0.1 * height,
          borderTopColor: '#eee',
          borderTopWidth: 1,
          flexDirection: 'row'
        }]}>
          <Button style={[flexCenter, {
            flexBasis: '50%', height: 0.08 * height,
            borderRightWidth: 1,
            borderRightColor: '#eee',
            backgroundColor: '#aaa'
          }]}  >
            <Text style={{ fontSize: 15, color: '#5b5b5b' }}>Cancel</Text>
          </Button>
          <Button style={[flexCenter, {
            flexBasis: '50%',
            height: 0.08 * height,
            backgroundColor: '#42b9f4'
          }]}
            onPress={this.CreatePost.bind(this)}>
            <Text style={{ fontSize: 15, color: '#5b5b5b' }} >Publish</Text>
          </Button>
        </View>
        <Modal isVisible={this.state.isVisibleModal}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Loading type="ChasingDots" />
          </View>
        </Modal>
      </View>
    );
  }
}
let mapStateToProps = state => {
  return {
    uid: getOwnerID(state)
  }
}
export default connect(mapStateToProps)(ModalInside)
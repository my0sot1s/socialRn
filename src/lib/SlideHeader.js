import React, { PureComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { flexCenter } from './commons/themes'
import ButtonZ from './commons/Button'
import { H2, H3, H4 } from './commons/H'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CircleImage from './commons/CircleImage'
import { getOwnerID } from '../store/auth'
import { connect } from 'react-redux'
const objectPath = require('object-path')

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: 54,
    width: '100%',
    justifyContent: 'flex-start'
  },
  imageWrap: {
    flexBasis: '15%'
  },
  imageMode: {
    height: 38,
    width: 38,
    borderRadius: 19
  },
  headerText: {
    flexBasis: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  titleName: {
    height: 25,
    padding: 0,
    justifyContent: 'flex-start'
  },
  date: {
    height: 15
  },
  icon: {
    flexBasis: '10%',
    alignItems: 'flex-end',
    textAlign: 'center'
  }
})
class CardHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.renderAvatar = this.renderAvatar.bind(this)
  }
  renderAvatar() {
    if (objectPath.get(this.props.data, 'avatar')) {
      return (<CircleImage
        source={{ uri: this.props.data.avatar }}
        size={34}
        resizeMode='cover' />)
    }
    return (
      <Image source={require('../assets/default-avatar.png')}
        style={styles.imageMode} resizeMode='cover' />
    )
  }
  pressToWatchProfile() {
    if (this.props.ownerId !== this.props.data.id) {
      this.props.navigation.navigate('Profile', { uid: this.props.data.id })
    } else {
      this.props.navigation.navigate('Me')
    }
  }
  render() {
    let { isliked } = this.props
    return (
      <View style={[flexCenter, styles.container]}>
        <ButtonZ style={[flexCenter, styles.imageWrap]}
          onPress={this.pressToWatchProfile.bind(this)}>
          {this.renderAvatar()}
        </ButtonZ>
        <View style={[flexCenter, styles.headerText]}>
          <ButtonZ style={[flexCenter, styles.titleName]}>
            <H2 text={objectPath.get(this.props.data, 'fullname', '...')} style={{ fontWeight: 'bold' }} />
          </ButtonZ>
        </View>
        <Ionicons
          name="ios-more"
          size={30}
          color="#444"
          style={styles.icon} />
      </View>
    )
  }
}
let mapStateToProps = state => {
  return {
    ownerId: getOwnerID(state)
  }
}
export default connect(mapStateToProps)(CardHeader)

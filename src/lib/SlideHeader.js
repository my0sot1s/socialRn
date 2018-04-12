import React, { PureComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { flexCenter } from './commons/themes'
import ButtonZ from './commons/Button'
import { H2, H3, H4 } from './commons/H'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
  constructor (props) {
    super(props)
    this.renderAvatar = this.renderAvatar.bind(this)
  }
  renderAvatar () {
    if (objectPath.get(this.props.data, 'avatar')) {
      return (<Image source={{ uri: this.props.data.avatar }} style={styles.imageMode} resizeMode='cover' />)
    }
    return (
      <Image source={require('../assets/default-avatar.png')} style={styles.imageMode} resizeMode='cover' />
    )
  }
  render () {
    return (
      <View style={[flexCenter, styles.container]}>
        <ButtonZ style={[flexCenter, styles.imageWrap]}>
          {this.renderAvatar()}
        </ButtonZ>
        <View style={[flexCenter, styles.headerText]}>
          <ButtonZ style={[flexCenter, styles.titleName]}>
            <H2 text={objectPath.get(this.props.data, 'username', '...')} style={{ fontWeight: 'bold' }} />
          </ButtonZ>
        </View>
        <Ionicons
          name='ios-heart-outline'
          size={25}
          color='#696969'
          style={styles.icon} />
      </View>
    )
  }
}

export default CardHeader

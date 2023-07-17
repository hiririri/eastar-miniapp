import PropTypes from 'prop-types'
import React from 'react'
import { View } from '@tarojs/components'
import './DocsHeader.scss'

const DocsHeader = ({ title = '标题' }) => {
  return (
    <View className='doc-header'>
      <View className='doc-header__title'>{title}</View>
    </View>
  )
}

DocsHeader.propTypes = {
  title: PropTypes.string
}

export default DocsHeader
